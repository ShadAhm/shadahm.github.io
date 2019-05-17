import { Component, OnInit, Input } from '@angular/core';
import { GithubRepository, SelectRepository } from 'src/app/models/github';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./../projects.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() data: SelectRepository;
  repo: GithubRepository;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getGitHubRepoInfo(this.data.name).subscribe((res: GithubRepository) => {
      this.repo = res;

      if (this.data.descriptionOverride != null && this.data.descriptionOverride.trim() != '')
        this.repo.description = this.data.descriptionOverride;
    });
  }
}
