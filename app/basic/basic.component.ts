import { Component } from '@angular/core';
import {ChartDataService} from "./chart/chartdata.service";
import {TextFileReaderService} from "./filereader/filereader.service";

@Component({
    templateUrl: 'app/basic/basic.component.html',
    styleUrls : ['app/shared/shared.component.css', 'app/basic/basic.component.css'],
    providers : [ChartDataService, TextFileReaderService]
})
export class BasicComponent {
    constructor(private chartDataService: ChartDataService){}
    public pageTitle: string = 'Basic';
    start_range: string;
    end_range: string;
    isEndValid: boolean = false;
    isStartValid: boolean = false;
    carCount: {count: number, time: string} = this.chartDataService.getCarsCount();

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



    numberValidator(str: string) :boolean{
        if(parseInt(str) > 0 && parseInt(str) < 25){
            return false
        }else if(str == ''){
            return true;
        }
        else{
            return true;
        }
    }
    setStartValid(bool: boolean):void{
        this.isStartValid = bool;
    }
    setEndValid(bool: boolean):void{
        this.isEndValid = bool;
    }
    setValidation(){
        this.setStartValid(this.numberValidator(this.start_range));
        this.setEndValid(this.numberValidator(this.end_range));
        if(this.end_range && this.start_range){
            if(this.chartDataService.toMinutes(this.start_range) > this.chartDataService.toMinutes(this.end_range)){
                this.isEndValid = true;
            }
        }
    }
    sendValues(){
        this.setValidation();
        if(!this.numberValidator(this.start_range) && !this.numberValidator(this.end_range) && this.chartDataService.toMinutes(this.start_range) <= this.chartDataService.toMinutes(this.end_range)){
            this.chartDataService.setTimeRange([this.start_range, this.end_range]);
            this.getGraphData();
        }

    }
    getGraphData(): void{
        this.chartDataService.emptyDataArrays();
        this.chartDataService.getGraphData();
        this.carCount = this.chartDataService.getCarsCount();
        this.lineChartData = this.chartDataService.getData();
        this.lineChartLabels = this.chartDataService.getLabels();
    }
}
