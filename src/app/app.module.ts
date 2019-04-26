import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';
import { BlogComponent } from './components/blog/blog.component';

// services
import { ResumeService } from './services/resume.service';
import { ContentHeaderComponent } from './components/content-header/content-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ResumeComponent,
    BlogComponent,
    ContentHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ResumeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
