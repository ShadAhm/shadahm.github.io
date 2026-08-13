import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumePoComponent } from './components/resume-po/resume-po.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsLandingComponent } from './components/projects-landing/projects-landing.component';
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
    path: 'projects',
    component: ProjectsLandingComponent,
    title: 'Projects — Shad Ahmad',
    data: { title: 'Projects' }
  },
  {
    path: 'pet-projects',
    component: ProjectsComponent,
    title: 'Pet Projects — Shad Ahmad',
    data: { title: 'Pet Projects' }
  },
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
