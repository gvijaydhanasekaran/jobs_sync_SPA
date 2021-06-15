import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobViewComponent } from './job-view/job-view.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  {path: '', component: JobsComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'job/:id', component: JobViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
