import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { GithubRepository, SelectRepository } from 'src/app/models/github';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  repositories: SelectRepository[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getReposInformation();
  }

  getReposInformation() {
    this.projectsService.getSelectedRepositories().subscribe((res: SelectRepository[]) => {
      this.repositories = res;
    });
  }
}
