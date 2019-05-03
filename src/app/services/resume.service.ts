import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { EmploymentHistory } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private httpClient: HttpClient) { }

  getTechnicalSkills(): Observable<any> {
    return this.httpClient.get('assets/data/technical-skills.json')
      .pipe(map(res => res));
  }

  getEmploymentHistories(): Observable<any> {
    return this.httpClient.get('assets/data/employment-history.json')
      .pipe(map(res => res));
  }

  getKeyProjectAchievements(): Observable<any> {
    return this.httpClient.get('assets/data/key-project-achievements.json')
      .pipe(map(res => res));
  }
}
