import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  contentFilters: any = {};
  tempContent: any = {};

  constructor() {
    this.contentFilters.allOfThese = [];
    this.contentFilters.atLeastOnce = [];
    this.contentFilters.noneOfThese = [];
    this.tempContent.allOfThese = '';
    this.tempContent.atLeastOnce = '';
    this.tempContent.noneOfThese = '';
  }

  ngOnInit() {
  }
  onEnter(val: string) {
    let searchIndex = _.indexOf(this.contentFilters[val],this.tempContent[val].trim());
    if (this.tempContent[val].trim()!='' && this.tempContent[val].trim().length > 2 && searchIndex === -1) {
      this.contentFilters[val].push(this.tempContent[val].trim());
      this.tempContent[val] = '';
    }
  }


  removeText(val,i){
      this.contentFilters[val].splice(i, 1);
      console.log(this.contentFilters);
  }

}