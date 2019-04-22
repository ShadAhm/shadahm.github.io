import { Component, OnInit } from '@angular/core';
import { ResumeContent } from 'src/app/models/resume';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.sass']
})
export class ResumeComponent implements OnInit {
  contents: ResumeContent[]; 

  constructor() { }

  ngOnInit() {
    this.getResumeContents();
  }

  scrollIntoView(elementId : string) : void {
    document.getElementById(elementId).scrollIntoView({behavior: 'smooth'}); 
  }

  getResumeContents() : void {
    this.contents = [
      {
        displayText : 'Introduction',
        elementId : 'h2Introduction'
      },      
      {
        displayText : 'Technical Skills',
        elementId : 'h2Skills'
      },      
      {
        displayText : 'Employment History',
        elementId : 'h2Employment'
      },
      {
        displayText : 'Education and Certifications',
        elementId : 'h2Education'
      }];
  }
}
