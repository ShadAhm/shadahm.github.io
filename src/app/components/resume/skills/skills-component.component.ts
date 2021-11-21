import { Component, Input, OnInit } from '@angular/core';
import { TechnicalSkill, TechnicalSkillGridDto, TechnicalSkillsGridDto } from 'src/app/models/resume';
import { DurationService } from 'src/app/services/duration.service';

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  styleUrls: ['./skills-component.component.scss']
})
export class SkillsComponentComponent implements OnInit {
  @Input() technicalSkills: TechnicalSkill[]; 
  
  gridModels: TechnicalSkillsGridDto;

  constructor(private _durationService: DurationService) { }

  ngOnInit() {
    this.toGridDto(this.technicalSkills);
  }

  toGridDto(technicalSkills: TechnicalSkill[]) {
    let categories = [...new Set(technicalSkills.map(item => item.category))].map(o => new TechnicalSkillGridDto());


  }

  calculateExperience(technicalSkill: TechnicalSkill): string {
    let yearsExp = this._durationService.calculateTotalDuration(technicalSkill.useHistory);
    let yearsExpFloored = Math.floor(yearsExp);

    if(yearsExpFloored < 1) {
      return '<1 year exp';
    }
    else if(yearsExpFloored == 1) {
      return '1 year exp';
    }
    else {
      return `${yearsExpFloored} years exp`;
    }
  }

  isCurrentlyUsing(technicalSkill: TechnicalSkill): boolean {
    const lastIndex = technicalSkill.useHistory.length - 1;
    return technicalSkill.useHistory[lastIndex].toDate == null;
  }
}
