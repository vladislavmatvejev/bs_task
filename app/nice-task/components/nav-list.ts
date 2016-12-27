// Imports
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NiceChartComponent } from './nicechart.component';
import { TimeTable }           from '../model/timetable';
import { EmitterService } from '../../emitter.service';
import {NiceService} from "../services/nice.service";

// Component decorator
@Component({
    selector: 'api-nav',
    template: `
        <nav class="navbar col-xs-6 col-sm-12 col-md-12 col-lg-12 pull-left">

            <div class="navbar-header">
                <button type="button" class="pull-left navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <form class="col-xs-4 col-sm-4 col-md-12 col-lg-12 navbar-form navbar-left" role="search">
                    <div class="form-group">
                        <button type="submit" class="btn btn-default" (click)="getData()">Get Data</button>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="API URL" [(ngModel)]="api_url" name="api_url" style="min-width: 195px;">
                        <div [ngClass]="{'api-validation': isUrlValid }" class="hidden-class">Please enter the API url</div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-default">Clear Filter</button>
                    </div>
                </form>
            </div>

        </nav>
    `,
    styleUrls : ['app/shared/shared.component.css'],
    styles: [
        `
  .api-validation {
    background-color: red;
    display: block !important;
  }
  .hidden-class{
    display: none;
  }
  `
    ]
})
// Component class
export class TimeTableListComponent implements OnChanges{
    // Constructor with injected service
    constructor(
        private specialService: NiceService
    ){}
    // Local properties
    times: TimeTable[];
    api_url: string;
    isUrlValid: boolean = false;
    // Input properties
    @Input() timeTable: TimeTable;
    @Input() navId: string;
    @Input() chartId: string;
    loadTimeTable(){
        this.times = [];
        // Get all comments
        this.specialService.getTimes()
            .subscribe(
                times => {
                    this.times = times;
                    //console.log(times);
                    //EmitterService.get(this.listId).emit(times);
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                });
    }
    getData(){
        if(!this.urlValidator(this.api_url)){
            this.setUrlValid(this.urlValidator(this.api_url));
            this.specialService.setApiURL(this.api_url);
            this.loadTimeTable();
            EmitterService.get(this.chartId).emit(this.timeTable);
        }else{
            this.setUrlValid(this.urlValidator(this.api_url));
        }
    }
    urlValidator(str: string) :boolean{
        if(this.api_url){
            return false;
        }else{
            return true;
        }
    }
    setUrlValid(bool: boolean):void{
        this.isUrlValid = bool;
    }
    ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.navId).subscribe((times:TimeTable[]) => {this.loadTimeTable()});
    }

}