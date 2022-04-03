import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { AboutComponent } from './components/about/about.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectCardComponent } from './components/projects/project-card/project-card.component';
import { SkillsComponentComponent } from './components/resume/skills/skills-component.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsLandingComponent } from './components/projects-landing/projects-landing.component';
import { ProjectsProComponent } from './components/projects-pro/projects-pro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentHeaderComponent,
    AboutComponent,
    ResumeComponent,
    ProjectsComponent,
    ProjectCardComponent,
    SkillsComponentComponent,
    ContactComponent,
    ProjectsLandingComponent,
    ProjectsProComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
