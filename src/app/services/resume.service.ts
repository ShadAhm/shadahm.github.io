import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { EmploymentHistory, KeyProjectAchievement, TechnicalSkill } from '../models/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private httpClient: HttpClient) { }

  getTechnicalSkills(): Observable<TechnicalSkill[]> {
    return this.httpClient.get<TechnicalSkill[]>('assets/data/technical-skills.json')
      .pipe(map(res => res));
  } 

  getEmploymentHistories(): Observable<EmploymentHistory[]> {
    return this.httpClient.get<EmploymentHistory[]>('assets/data/employment-history.json')
      .pipe(map(res => res));
  }

  getProProjects(): Observable<KeyProjectAchievement[]> {
    return this.httpClient.get<KeyProjectAchievement[]>('assets/data/pro-projects.json')
      .pipe(map(res => res));
  }
}
