// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { TimeTable }           from '../model/timetable';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NiceService {
    constructor (private _jsonp: Jsonp) {}
    private apiUrl = 'http://parkingapi.gear.host/v1/parking?callback=JSONP_CALLBACK';

    getApiURL() :string{
        return this.apiUrl;
    }
    setApiURL(str: string):void{
        this.apiUrl = str + (str.indexOf('?') > -1 ? '&' : '?' ) + 'callback=JSONP_CALLBACK';
    }
    // Fetch all existing comments
    getTimes() : Observable<TimeTable[]>{
        // ...using get request
        return this._jsonp.get(this.apiUrl)
        // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

}
