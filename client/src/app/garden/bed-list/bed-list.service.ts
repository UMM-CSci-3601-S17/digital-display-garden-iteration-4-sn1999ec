/**
 * Created by saliy002 on 4/9/17.
 */

import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class BedListService {
    constructor(private http:Http) { }
    private bedUrl: string = API_URL + "gardenLocations";


    getBedNames(): Observable<any> {
        return this.http.request(this.bedUrl).map(res => res.json());
    }


}