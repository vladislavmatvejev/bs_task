import { Component, Input, OnChanges } from '@angular/core';
import {NiceService} from "../services/nice.service";
import {EmitterService} from "../../emitter.service";
import {TimeTable} from "../model/timetable";
import {NiceChartService} from "../services/nicechart.service";

// Component decorator
@Component({
    selector: 'my-chart',
    template: `
        <div class="row">
        <div class="col-xs-6 col-sm-4 col-md-4 .col-lg-4 pull-right" id="timeRange">
            <label class="hidden-xs">Select Date/Time Range</label>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Start" [(ngModel)]="start_range">
                <div [ngClass]="{'start-date': isStartDateValid }" class="hidden-class">Please enter date with following format: YYYY-MM-DD</div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="End" [(ngModel)]="end_range">
                <div [ngClass]="{'end-date': isEndDateValid }" class="hidden-class">Please enter date with following format: YYYY-MM-DD. End date should be bigger than start date.</div>
            </div>
            <div class="hidden-xs">
                <p>Max car count: {{ mostCars.count }}</p>
                <p>On {{ mostCars.time }}</p>
            </div>
        </div>
            <div class="col-xs-12 col-sm-12 col-md-8 .col-lg-8">
                    <div class="col-md-12">
                        <div style="display: block;">
                            <canvas baseChart width="400" height="400"
                                    [datasets]="lineChartData"
                                    [labels]="lineChartLabels"
                                    [options]="lineChartOptions"
                                    [colors]="lineChartColors"
                                    [legend]="lineChartLegend"
                                    [chartType]="lineChartType">
                            </canvas>
                        </div>
                    </div>
            </div>
        </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 hidden-sm hidden-md hidden-lg">
            <p>Max car count: {{ mostCars.count }}</p>
            <p>On {{ mostCars.time }}</p>
        </div>
    </div>
    `,styles: [
        `
  .start-date {
    background-color: red;
    display: block !important;
  }
  .end-date {
    background-color: red;
    display: block !important;
  }
  .hidden-class{
    display: none;
  }
  #myNavbar{
    min-width: 250px;
  }
        @media(max-width:767px){
            #timeRange{
                position: absolute;
                top: 115px;
                right:10px;
            }
            .form-group{
                width: 45%;
                margin-left: 5px;
                float: left;
            }
        }
  `
    ]
})

export class NiceChartComponent implements OnChanges{
    constructor(private specialService: NiceService, private specialChartService: NiceChartService){
    }

    // Local properties
    dataArray:Array<any> = [];
    labelArray: string[] = [];
    start_range: string;
    end_range: string;
    isStartDateValid: boolean = false;
    isEndDateValid: boolean = false;
    mostCars: {count: number, time: any} = {count: 0, time:"00:00"};

    // Input properties
    @Input() time: TimeTable;
    @Input() navId: string;
    @Input() chartId: string;

    public lineChartData:Array<any> = [
        {},
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';

    dateValidator(str: string) :boolean{
        let regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if(str == ''){
            return true;
        }else if(regex.test(str)){
            return false;
        }else{
            return true;
        }
    }
    setStartDateValid(bool: boolean):void{
        this.isStartDateValid = bool;
    }
    setEndDateValid(bool: boolean):void{
        this.isEndDateValid = bool;
    }
    setValidation(){
        this.setStartDateValid(this.dateValidator(this.start_range));
        this.setEndDateValid(this.dateValidator(this.end_range));
        if(this.specialChartService.dateToMinutes(this.start_range+'T00:00:00') >
            this.specialChartService.dateToMinutes(this.end_range+'T00:00:00')){
            this.isEndDateValid = true;
        }
    }
    getChart(): void{
        this.setValidation();
        if(!this.dateValidator(this.start_range) && !this.dateValidator(this.end_range) &&
                        this.specialChartService.dateToMinutes(this.start_range+'T00:00:00') <=
                        this.specialChartService.dateToMinutes(this.end_range+'T00:00:00'))
        {
            this.specialChartService.dataArray = [];
            this.specialChartService.labelArray = [];
            this.specialChartService.setDateRange([this.start_range, this.end_range]);
            this.specialChartService.setCarsCountToZero();
            this.specialService.getTimes()
                .subscribe(
                    times => {
                        this.specialChartService.times = times;
                        this.specialChartService.getDataForChart();
                        this.specialChartService.getMostCarsAndTime();
                        this.mostCars = this.specialChartService.mostCars;
                        this.lineChartData = [{data: this.specialChartService.dataArray}];
                        this.lineChartLabels = this.specialChartService.labelArray;
                    },
                    err => {
                        // Log errors if any
                        console.log(err);
                    });
        }
    }

    ngOnChanges() {
        // Listen to the 'chart'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.chartId).subscribe((time:TimeTable) => {
            this.getChart();
        });
    }

}