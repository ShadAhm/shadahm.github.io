import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getGitHubRepoInfo(repoName: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/repos/shadahm/${repoName}`)
      .pipe(map(res => res));
  }
}
