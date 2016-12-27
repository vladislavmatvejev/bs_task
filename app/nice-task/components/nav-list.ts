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
    templateUrl: 'app/nice-task/views/nav-list.component.html',
    styleUrls : ['app/shared/shared.component.css', 'app/nice-task/views/style/nav-list.component.css']
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