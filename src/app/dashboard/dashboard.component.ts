import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs'
import { ContentService } from "./content.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    contentFilters: any = {};
    tempContent: any = {};
    panelOpenState = true;
    twitterData: any = {};
    newsData: any = {};

    constructor(private contentService: ContentService) {
        this.initFilter();
        this.twitterData.items = [];
        this.newsData.items = [];
    }

    ngOnInit() {
        this.getTwitterData();
        this.getNewsData();
    }

    initFilter() {
        this.contentFilters.allOfThese = [];
        this.contentFilters.atLeastOnce = [];
        this.contentFilters.noneOfThese = [];
        this.tempContent.allOfThese = '';
        this.tempContent.atLeastOnce = '';
        this.tempContent.noneOfThese = '';
    }

    onEnter(val: string) {
        let searchIndex = _.indexOf(this.contentFilters[val], this.tempContent[val].trim());
        if (this.tempContent[val].trim() != '' && this.tempContent[val].trim().length > 2 && searchIndex === -1) {
            this.contentFilters[val].push(this.tempContent[val].trim());
            this.tempContent[val] = '';
        }
    }


    removeText(val, i) {
        this.contentFilters[val].splice(i, 1);
        console.log(this.contentFilters);
    }

    applyFilter() {
        // if (this.contentFilters.allOfThese.length === 0 && this.contentFilters.atLeastOnce.length === 0 && this.contentFilters.noneOfThese.length === 0) {
        //     return false;
        // }
        this.getTwitterData();
    }

    getTwitterData() {
        this.contentService.getFilteredContentsTwitter(this.contentFilters)
            .subscribe(
                (response: any) => {
                    this.twitterData = response.results;
                },
                (error) => {
                    this.twitterData = [];
                }
            );
    }

    getNewsData() {
        this.contentService.getFilteredContentsNews(this.contentFilters)
            .subscribe(
                (response: any) => {
                    this.newsData = response.results;
                },
                (error) => {
                    this.newsData = [];
                }
            );
    }

}
