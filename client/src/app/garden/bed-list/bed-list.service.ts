/**
 * Created by saliy002 on 4/9/17.
 */

import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Plant} from "../plants/plant";
import {Bed} from "./bed";

@Injectable()
export class BedListService {
    constructor(private http:Http) { }
    private plantUrl: string = API_URL + "plants";
    private bedUrl: string = API_URL + "gardenLocations";

    /**
     * This method is used to populate the bed-list component
     * @returns {Observable<Bed[]>}
     */
    getBedNames(): Observable<Bed[]> {
        return this.http.request(this.bedUrl).map(res => res.json());
    }

    /**
     * This method is used to populate plant-list component but called from bed-list component
     * @param garden
     * @returns {Observable<Plant[]>}
     */
    getFlowerNames(garden: any): Observable<Plant[]> {
        return this.http.request(this.plantUrl + "?gardenLocation=" + garden._id).map(res => res.json());
    }

}