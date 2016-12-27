import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import {NiceService} from "./services/nice.service";
import {SpecialComponent} from "./components/index";
import {TimeTableListComponent} from "./components/nav-list";
import {NiceChartComponent} from "./components/nicechart.component";
import {SharedModule} from "../shared/shared.module";
import {NiceChartService} from "./services/nicechart.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SharedModule
    ],
    declarations: [
        SpecialComponent,
        TimeTableListComponent,
        NiceChartComponent
    ],

    providers: [
        NiceService,
        NiceChartService
    ],

    exports:[]

})
export class NiceModule {
}
