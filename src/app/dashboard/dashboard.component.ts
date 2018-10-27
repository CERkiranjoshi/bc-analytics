import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs'
import { ContentService } from "./content.service";
declare let Chart: any;
// https://stackoverflow.com/questions/44426939/how-to-use-canvas-in-angular2/44429328
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('twitterSentimentAnalysis') twitterSentimentAnalysis: ElementRef;
    @ViewChild('newsSentimentAnalysis') newsSentimentAnalysis: ElementRef;
    public twitterContext: CanvasRenderingContext2D;
    public newsContext: CanvasRenderingContext2D;

    contentFilters: any = {};
    filterParam: any = {}
    tempContent: any = {};
    panelOpenState = true;
    twitterData: any = {};
    instagramData: any = {};
    newsData: any = {};

    constructor(private contentService: ContentService) {
        this.initFilter();
        this.twitterData.items = [];
        this.newsData.items = [];
        this.instagramData.items = [];
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.twitterContext = (<HTMLCanvasElement>this.twitterSentimentAnalysis.nativeElement).getContext('2d');
        this.newsContext = (<HTMLCanvasElement>this.newsSentimentAnalysis.nativeElement).getContext('2d');
    }

    initFilter() {
        this.contentFilters.allOfThese = [];
        this.contentFilters.atLeastOnce = [];
        this.contentFilters.noneOfThese = [];
        this.tempContent.allOfThese = '';
        this.tempContent.atLeastOnce = '';
        this.tempContent.noneOfThese = '';
        this.filterParam.channelType = ''
        this.filterParam.resultType = 'popular';
        this.filterParam.exclude = '';
        this.filterParam.searchParam = {};
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
    }

    applyFilter() {
        if (this.contentFilters.allOfThese.length === 0 && this.contentFilters.atLeastOnce.length === 0 && this.contentFilters.noneOfThese.length === 0) {
            alert('Please add search conetnt.')
            return false;
        }
        this.getTwitterData();
        this.getNewsData();
        this.getInstagramData();
    }

    getTwitterData() {
        console.log(this.contentFilters)
        this.filterParam.channelType = 'twitter';
        this.contentService.getFilteredContentsTwitter(this.filterParam, this.contentFilters)
            .subscribe(
                (response: any) => {
                    this.twitterData = response.results;
                    this.twitterData.wordcloud_path = 'https://secure-hollows-83816.herokuapp.com/static/img/wc.png?rand=' + Math.random();
                    this.drawTwitterGraph();
                },
                (error) => {
                    this.twitterData = [];
                }
            );
    }

    getNewsData() {
        this.filterParam.channelType = 'news';
        this.contentService.getFilteredContentsNews(this.filterParam, this.contentFilters)
            .subscribe(
                (response: any) => {
                    this.newsData = response.results;
                    this.drawNewsGraph();
                },
                (error) => {
                    this.newsData = [];
                }
            );
    }
    getInstagramData() {
        this.filterParam.channelType = 'instagram';
        this.contentService.getFilteredContentsInstagram(this.filterParam, this.contentFilters)
            .subscribe(
                (response: any) => {
                    this.instagramData = response.results;
                },
                (error) => {
                    this.newsData = [];
                }
            );
    }

    drawTwitterGraph() {
        var myPieChart = new Chart(this.twitterContext, {
            type: 'pie',
            data: {
                labels: ["Positive", "Negative", "Neutral"],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
    }

    drawNewsGraph() {
        var myPieChart = new Chart(this.newsContext, {
            type: 'pie',
            data: {
                labels: ["Positive", "Negative", "Neutral"],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
    }

}
