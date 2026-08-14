import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumePoComponent } from './components/resume-po/resume-po.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsProComponent } from './components/projects-pro/projects-pro.component';

const routes: Routes = [
  { path: '', redirectTo: 'resume-po', pathMatch: 'full' },
  {
    path: 'resume',
    component: ResumeComponent,
    title: 'Resume — Shad Ahmad',
    data: { title: 'Resume' }
  },
  {
    path: 'resume-po',
    component: ResumePoComponent,
    title: 'Product Owner Resume — Shad Ahmad',
    data: { title: 'Resume' }
  },
  {
    path: 'experiments',
    component: ExperimentsComponent,
    title: 'Experiments — Shad Ahmad',
    data: { title: 'Experiments' }
  },
  { path: 'projects', redirectTo: 'experiments', pathMatch: 'full' },
  { path: 'pet-projects', redirectTo: 'experiments', pathMatch: 'full' },
  {
    path: 'pro-projects',
    component: ProjectsProComponent,
    title: 'Professional Projects — Shad Ahmad',
    data: { title: 'Projects' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact — Shad Ahmad',
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
