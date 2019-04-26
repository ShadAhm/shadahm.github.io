import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data:{ title:'Home' }
  },
  {
    path: 'resume',
    component: ResumeComponent,
    data:{ title:'Resume' }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data:{ title:'Blog' }
  }];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
