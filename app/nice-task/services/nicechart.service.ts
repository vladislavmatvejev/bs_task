import { Injectable }     from '@angular/core';
import { TimeTable }           from '../model/timetable';
import {NiceService} from "./nice.service";

@Injectable()

export class NiceChartService{

    constructor(private specialService: NiceService){};
    // Local properties
    times: TimeTable[];
    dataArray:Array<any> = [];
    labelArray: string[] = [];
    daysSortedData: any[][] = [];
    dateRange: string[] = ['', ''];
    mostCars: {count: number, time: any} = {count: 0, time:"00:00"};
    mostCarsDay: {count: number, day: any} = {count: 0, day:""};

    /*CHART DATA AND CARS AMOUNT DATA*/
    getCarsCount(): any{
        return this.mostCars;
    }

    getDateRange(): any[] {
        return this.dateRange;
    }
    setDateRange(arr: any[]){
        this.dateRange = [arr[0], arr[1]];
    }
    setCarsCount(arr: any[]){
        this.mostCars.count = arr[0];
        this.mostCars.time = arr[1];
    }
    setCarsCountToZero(){
        this.mostCars.count = 0;
        this.mostCars.time = 0;
        this.mostCarsDay.count = 0;
        this.mostCarsDay.day = 0;
    }
    setCarsDayCount(arr: any[]){
        this.mostCarsDay.count = arr[0];
        this.mostCarsDay.day = arr[1];
    }
    getDataForChart():void{
        let count = 0;
        let rangeDays = this.getRangeDays(this.dateRange);
        this.sortDataByDays();
        rangeDays.forEach((value, index)=>{
            count = this.daysSortedData[value].length;
            if(count > 0){
                this.labelArray.push(value);
                this.dataArray.push(count);
            }
            if(this.mostCarsDay.count < count){
                this.setCarsDayCount([count, value]);
            }
        });
    }
    sortDataByDays():void{
        this.times.forEach((value, index) => {
            if(this.tsToDate(value.ArrivalTime) in this.daysSortedData){
                this.daysSortedData[this.tsToDate(value.ArrivalTime)].push(value);
            }
        });
    }
    getMostCarsAndTime():void{
        for(let i= this.dateToMinutes(this.mostCarsDay.day+'T00:00:00'); i <= this.dateToMinutes(this.mostCarsDay.day+'T24:00:00');i++){
            let count = 0;
            this.daysSortedData[this.mostCarsDay.day].forEach((value, index) => {
                if(this.tsToDate(value.ArrivalTime) == this.mostCarsDay.day){
                    if(this.dateToMinutes(value.ArrivalTime) <= i && this.dateToMinutes(value.LeaveTime) >= i){
                        count++;
                    }
                    if(count > 0){
                        if(this.mostCars.count < count){
                            this.setCarsCount([count, this.msToDate(i)]);
                        }
                    }
                }
            })
        }
    }



    /*DATE MODIFYING*/
    dateToMinutes(str: string) :number{
        let dateString = str,
            dateTimeParts = dateString.split('T'),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split('-'),
            date;
        date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
        return parseInt(date.getTime())/60000;
    }
    tsToDate(str: string) :string{
        let split = str.split('T');
        return split[0];
    }
    getRangeDays(arr){
        let rangeDays = [];
        let start = arr[0].split('-');
        let end = arr[1].split('-');
        for (let d = new Date(start[0], start[1], start[2]); d <= new Date(end[0], end[1], end[2]); d.setDate(d.getDate() + 1)) {
            rangeDays.push(this.dateBeaty(d));
            this.daysSortedData[this.dateBeaty(d)] = [];
        }
        return rangeDays;
    }
    dateBeaty(str): string{
        let day = str.getDate();
        let month = str.getMonth();
        let year = str.getFullYear();
        return year+'-'+(month < 10 ? '0'+month : month)+'-'+(day < 10 ? '0'+day : day);
    }
    msToDate(n: number): string{
        let date = new Date(n*60000);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        return (day < 10 ? '0'+day : day)+'.'+(month < 10 ? '0'+month : month)+'.'+year+' at '+(hour < 10 ? '0'+hour : hour)+':'+(minute < 10 ? '0'+minute : minute);
    }
}