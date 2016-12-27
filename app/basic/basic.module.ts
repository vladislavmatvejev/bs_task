import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';
import { TextFileReaderComponent} from "./filereader/filereader.component";
import {BasicComponent} from "./basic.component";


@NgModule({
    imports:      [ SharedModule ],
    declarations: [ TextFileReaderComponent, BasicComponent ],
    providers:    [  ]
})
export class BasicModule {}