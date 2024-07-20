import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlannerService } from '../../../services/planner.service'; // Ensure the path is correct
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Report {
  type: string;
  name: string;
}

export interface Element {
  id?: number; // Added for API integration
  name: string;
  owner: string;
  status: string;
  description: string;
  funds: string;
  fundAlias: string;
  sources: string[];
  runs: string[];
  reports: Report[];
}

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class PlannerComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'owner', 'actions'];
  columnsToDisplay: string[] = ['name', 'owner'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'actions'];

  dataSource = new MatTableDataSource<Element>([]);
  expandedElement: Element | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private subSystemSetupService: PlannerService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadPlanner());
    this.loadPlanner(); // Initial data load
  }

  async loadPlanner(searchTerm: string = '') {
    try {
      const response: any = await this.subSystemSetupService.search(
        searchTerm,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
      this.dataSource.data = response.content; // Adjust based on actual API response
      this.paginator.length = response.totalElements; // Update total elements count
      this.changeDetectorRefs.detectChanges();
    } catch (error) {
      console.error('Error loading sub systems:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.loadPlanner(filterValue);
  }

  expand(element: Element) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.changeDetectorRefs.detectChanges();
  }

  async play(element: Element) {
    console.log('Play action for element:', element);
    let index = this.dataSource.data.findIndex(x => x.id == element.id);
    if(index > -1){
      this.dataSource.data[index].status = `${Date.now().toLocaleString()} - Finished`;
      await this.subSystemSetupService.update(this.dataSource.data[index].id??-1, this.dataSource.data[index]);
    }
    this.changeDetectorRefs.detectChanges();

  }

  copy(element: Element) {
    const copiedElement: Element = { ...element, id: undefined, name: `${element.name} - Copy` };
    this.dataSource.data = [...this.dataSource.data, copiedElement];
    this.changeDetectorRefs.detectChanges();
  }

  async delete(element: Element) {
    if (element.id) {
      try {
        await this.subSystemSetupService.delete(element.id);
        this.dataSource.data = this.dataSource.data.filter(e => e !== element);
        this.changeDetectorRefs.detectChanges();
      } catch (error) {
        console.error('Error deleting element:', error);
      }
    } else {
      this.dataSource.data = this.dataSource.data.filter(e => e !== element);
      this.changeDetectorRefs.detectChanges();
    }
  }

  async save(element: Element) {
    if (element.id) {
      try {
        await this.subSystemSetupService.update(element.id, element);
        console.log('Element updated:', element);
      } catch (error) {
        console.error('Error updating element:', error);
      }
    } else {
      try {
        await this.subSystemSetupService.create(element);
        this.loadPlanner();
        console.log('Element created:', element);
      } catch (error) {
        console.error('Error creating element:', error);
      }
    }
  }

  addNewElement() {
    const newElement: Element = {
      name: '',
      owner: '',
      status: '',
      description: '',
      funds: '',
      fundAlias: '',
      sources: [''],
      runs: [''],
      reports: [{ type: '', name: '' }]
    };
    this.dataSource.data = [...this.dataSource.data, newElement];
    this.expand(newElement);
  }

  refresh() {
    this.loadPlanner();
  }

  addSource(element: Element) {
    element.sources.push('');
    this.changeDetectorRefs.detectChanges();
  }

  removeSource(element: Element, index: number) {
    element.sources.splice(index, 1);
    this.changeDetectorRefs.detectChanges();
  }

  addRun(element: Element) {
    element.runs.push('');
    this.changeDetectorRefs.detectChanges();
  }

  removeRun(element: Element, index: number) {
    element.runs.splice(index, 1);
    this.changeDetectorRefs.detectChanges();
  }

  addReport(element: Element) {
    element.reports.push({ type: '', name: '' });
    this.changeDetectorRefs.detectChanges();
  }

  removeReport(element: Element, index: number) {
    element.reports.splice(index, 1);
    this.changeDetectorRefs.detectChanges();
  }
}
