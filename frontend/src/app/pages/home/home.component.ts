import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExternalSystemSetupService } from '../../../services/external-system-setup.service'; // Make sure the path is correct
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Element {
  id?: number; // Added for API integration
  title: string;
  baseUrl: string;
  authMethod: string;
  key: string;
  value: string;
  authPlace: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'actions'];
  columnsToDisplay: string[] = ['title'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'actions'];

  dataSource = new MatTableDataSource<Element>([]);
  expandedElement: Element | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private externalSystemSetupService: ExternalSystemSetupService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadExternalSystems());
    this.loadExternalSystems(); // Initial data load
  }

  async loadExternalSystems(searchTerm: string = '') {
    try {
      const response: any = await this.externalSystemSetupService.search(
        searchTerm,
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
      this.dataSource.data = response.content; // Adjust based on actual API response
      this.paginator.length = response.totalElements; // Update total elements count
      this.changeDetectorRefs.detectChanges();
    } catch (error) {
      console.error('Error loading external systems:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.loadExternalSystems(filterValue);
  }

  expand(element: Element) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.changeDetectorRefs.detectChanges();
  }

  copy(element: Element) {
    const copiedElement: Element = { ...element, id: undefined, title: `${element.title} - Copy` };
    this.dataSource.data = [...this.dataSource.data, copiedElement];
    this.changeDetectorRefs.detectChanges();
  }

  async delete(element: Element) {
    if (element.id) {
      try {
        await this.externalSystemSetupService.delete(element.id);
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
        await this.externalSystemSetupService.update(element.id, element);
        console.log('Element updated:', element);
      } catch (error) {
        console.error('Error updating element:', error);
      }
    } else {
      try {
        await this.externalSystemSetupService.create(element);
        this.loadExternalSystems();
        console.log('Element created:', element);
      } catch (error) {
        console.error('Error creating element:', error);
      }
    }
  }

  addNewElement() {
    const newElement: Element = {
      title: '',
      baseUrl: '',
      authMethod: '',
      key: '',
      value: '',
      authPlace: 'Header'
    };
    this.dataSource.data = [...this.dataSource.data, newElement];
    this.expand(newElement);
  }

  refresh() {
    this.loadExternalSystems();
  }
}
