import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {BasicComponent} from "./basic/basic.component";
import {SpecialComponent} from "./nice-task/components/index";

const routes: Routes = [
    {path: '', redirectTo: 'basic', pathMatch: 'full'},
    {path: 'basic', component: BasicComponent},
    {path: 'nice-task', component: SpecialComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}