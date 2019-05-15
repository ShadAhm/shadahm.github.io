import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GithubRepository } from '../models/github';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getGitHubRepoInfo(repoName: string): Observable<any> {
    return this.httpClient.get<GithubRepository>(`https://api.github.com/repos/ShadAhm/${repoName}`)
      .pipe(map(res => res));
  }
}
