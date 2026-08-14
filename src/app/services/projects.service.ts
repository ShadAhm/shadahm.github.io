import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GithubRepository, SelectRepository } from '../models/github';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getGitHubRepoInfo(repoName: string): Observable<GithubRepository> {
    return this.httpClient.get<GithubRepository>(`https://api.github.com/repos/ShadAhm/${repoName}`)
      .pipe(map(res => res));
  }

  getSelectedRepositories(): Observable<SelectRepository[]> {
    return this.httpClient.get<SelectRepository[]>('assets/data/select-github-repos.json')
    .pipe(map(res => res));
  }

  /** Dynamically-generated screenshot of a page via WordPress's free mshots service. */
  getScreenshotUrl(pageUrl: string, width = 640): string {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=${width}`;
  }
}
