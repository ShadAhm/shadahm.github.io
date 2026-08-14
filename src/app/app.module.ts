import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { IconComponent } from './components/icon/icon.component';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumePoComponent } from './components/resume-po/resume-po.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectCardComponent } from './components/projects/project-card/project-card.component';
import { SkillsComponentComponent } from './components/resume/skills/skills-component.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsLandingComponent } from './components/projects-landing/projects-landing.component';
import { ProjectsProComponent } from './components/projects-pro/projects-pro.component';

@Injectable()
export class DevErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log to console as normal
    console.error(error);
    try {
      const msg = error && (error.stack || error.message || String(error));
      let pre = document.getElementById('angular-error') as HTMLPreElement | null;
      if (!pre) {
        pre = document.createElement('pre');
        pre.id = 'angular-error';
        pre.style.position = 'fixed';
        pre.style.bottom = '0';
        pre.style.left = '0';
        pre.style.right = '0';
        pre.style.maxHeight = '40vh';
        pre.style.overflow = 'auto';
        pre.style.background = 'rgba(0,0,0,0.85)';
        pre.style.color = 'white';
        pre.style.zIndex = '99999';
        pre.style.padding = '12px';
        pre.style.fontSize = '12px';
        document.body.appendChild(pre);
      }
      pre.textContent = msg;
    } catch (e) {
      // ignore DOM errors
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    HeaderComponent,
    ContentHeaderComponent,
    ResumeComponent,
    ResumePoComponent,
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
    { provide: ErrorHandler, useClass: DevErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
