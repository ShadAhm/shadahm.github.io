import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { GithubRepository } from 'src/app/models/github';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  data: any;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getRepoInfo();
  }

  getRepoInfo() {
    this.projectsService.getGitHubRepoInfo('angularJs.keruC').subscribe((res: GithubRepository) => {
      this.data = res; console.log(this.data);
    });
  }
}
