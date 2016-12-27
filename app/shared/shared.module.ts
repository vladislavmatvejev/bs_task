import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import {ChartsModule} from "ng2-charts/ng2-charts";


@NgModule({
    imports:      [ CommonModule ],
    declarations: [  ],
    exports:      [ CommonModule, FormsModule, ChartsModule]
})
export class SharedModule { }
