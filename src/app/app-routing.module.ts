import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'resume', pathMatch: 'full' },
  {
    path: 'resume',
    component: ResumeComponent,
    data: { title: 'Resume' }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'Projects' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact Me' }
  }
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
