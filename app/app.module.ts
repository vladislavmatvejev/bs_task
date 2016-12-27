import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {BasicModule} from "./basic/basic.module";
import {AppRoutingModule} from "./app-routing.model";
import {NiceModule} from "./nice-task/nice.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BasicModule,
    NiceModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
