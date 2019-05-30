import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeComponent } from './components/resume/resume.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

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
    path: 'blog',
    component: BlogComponent,
    data: { title: 'Blog' }
  },
  {
    path: 'blog/:name',
    component: BlogPostComponent,
    data: { title: 'Blog' }
  }];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
