import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GithubRepository, RepositoryGroupView, SelectRepository, SelectRepositoryFile } from '../models/github';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getGitHubRepoInfo(repoName: string): Observable<GithubRepository> {
    return this.httpClient.get<GithubRepository>(`https://api.github.com/repos/ShadAhm/${repoName}`)
      .pipe(map(res => res));
  }

  getSelectedRepositories(): Observable<RepositoryGroupView[]> {
    return this.httpClient.get<SelectRepositoryFile | SelectRepository[]>('assets/data/select-github-repos.json')
      .pipe(map(res => this.toGroups(res)));
  }

  /**
   * Resolves the JSON into renderable groups. A bare array (the pre-grouping shape, which a stale
   * cached file may still have) renders as a single untitled group.
   */
  private toGroups(res: SelectRepositoryFile | SelectRepository[]): RepositoryGroupView[] {
    if (Array.isArray(res))
      return res.length ? [{ id: 'all', title: '', repositories: res }] : [];

    const groups = res.groups ?? [];
    const repositories = res.repositories ?? [];

    if (!groups.length)
      return repositories.length ? [{ id: 'all', title: '', repositories }] : [];

    const knownIds = new Set(groups.map(g => g.id));
    const lastId = groups[groups.length - 1].id;

    return groups
      .map(group => ({
        ...group,
        repositories: repositories.filter(repo => {
          const id = repo.group && knownIds.has(repo.group) ? repo.group : lastId;
          return id === group.id;
        })
      }))
      .filter(group => group.repositories.length > 0);
  }

  /** Dynamically-generated screenshot of a page via WordPress's free mshots service. */
  getScreenshotUrl(pageUrl: string, width = 640): string {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=${width}`;
  }
}
