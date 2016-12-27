import { Injectable } from '@angular/core';
import {TextFileReader} from "./textfilereader";

let List: TextFileReader[] = [];

@Injectable()
export class TextFileReaderService {

    setLine(id:number, start:string, end:string) {
        return List.push(new TextFileReader(id, start, end));
    }

    getList():Promise<TextFileReader[]> {
        return Promise.resolve(List);
    }

    emptyList():void{
        List = [];
    }
}