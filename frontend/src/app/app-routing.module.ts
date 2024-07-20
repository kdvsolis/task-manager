import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { PlannerComponent } from './pages/planner/planner.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planning', component: PlannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
