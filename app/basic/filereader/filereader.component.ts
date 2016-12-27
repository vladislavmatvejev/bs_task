import {Component} from '@angular/core'
import {TextFileReaderService} from './filereader.service'

@Component({
    selector: 'file-reader',
    templateUrl: 'app/basic/filereader/filereader.component.html',
    providers: [TextFileReaderService]
})
export class TextFileReaderComponent {
    constructor(private fileReaderService: TextFileReaderService){
    }
    getValue($event) : void{
        this.readFile($event.target);
    }
    readFile(input: any) : void {
        let file:File = input.files[0];
        let myReader:FileReader = new FileReader();
        this.fileReaderService.emptyList();
        myReader.onloadend = () => {
            let result = myReader.result;
            let lines1 = result.split('\n');
            lines1.forEach((value, index)=>{
                let new_line = value.split(',');
                if(typeof value !== 'undefined'){
                    this.fileReaderService.setLine(index, new_line[0], new_line[1]);
                }
            });
        }

        myReader.readAsText(file);
    }
}
