/**
 * Created by saliy002 on 4/9/17.
 */

import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Plant} from "../plants/plant";

@Injectable()
export class PlantListService {
    private plantUrl: string = API_URL + "plants";

    constructor(private http: Http) {}

    getFlowerNames(garden: any): Observable<Plant[]> {
        //console.log("HELLO");
        return this.http.request(this.plantUrl + "?gardenLocation=" + garden._id).map(res => res.json());
    }

    getFlowerById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }


}