import { Injectable } from '@angular/core';
import {TextFileReaderService} from "../filereader/filereader.service";
import {TextFileReader} from "../filereader/textfilereader";

@Injectable()
export class ChartDataService {
    constructor(private textReaderService: TextFileReaderService){
        
    }
    data: Promise<TextFileReader[]>;
    dataArray:Array<any> = [];
    labelArray: string[] = [];
    timeRange: string[] = ['00:00', '24:00'];
    mostCars: {count: number, time: string} = {count: 0, time:"00:00"};


    getGraphData(): void{
        this.setCarsCountToZero();
        for(let i=this.toMinutes(this.timeRange[0]); i <= this.toMinutes(this.timeRange[1]);i++){
            let count = 0;
            this.textReaderService.getList().then(data=> {
                data.forEach((value, index)=>{
                    if(this.toMinutes(value.start) <= i && this.toMinutes(value.end) >= i){
                        count++;
                    }
                });
                if(count > 0){
                    let b_time =  this.minToHours(i);
                    this.labelArray.push(b_time);
                    this.dataArray.push(count);
                    if(this.mostCars.count < count){
                        this.setCarsCount([count, b_time]);
                    }
                }
            });
        }
    }
    setCarsCountToZero(){
        this.mostCars.count = 0;
        this.mostCars.time = '';
    }
    setCarsCount(arr){
        this.mostCars.count = arr[0];
        this.mostCars.time = arr[1];
    }
    getCarsCount(){
        return this.mostCars;
    }
    setTimeRange(arr){
        this.timeRange[0] = arr[0];
        this.timeRange[1] = arr[1];
    }
    getTimeRange(){
        return this.timeRange;
    }
    minToHours(n: number) :string{
        let minutes = n % 60;
        let hours = Math.floor(n/60);
        return  hours+':'+(minutes < 10 ? '0'+minutes : minutes);
    }
    getData(){
        return [{data: this.dataArray}];
    }
    getLabels(){
        return this.labelArray;
    }
    emptyDataArrays(): void{
        this.dataArray = [];
        this.labelArray = [];
    }
    
    drawGraph(): void{
        this.emptyDataArrays();
        this.getGraphData();
    }
    toMinutes(str:string) : number{
        if(str !== ''){
            let arr = str.split(':');
            if(typeof arr[1] === 'undefined') arr[1] = '0';
            return parseInt(arr[0]) * 60 + parseInt(arr[1]);
        }else{
            return 0;
        }
    }
}
