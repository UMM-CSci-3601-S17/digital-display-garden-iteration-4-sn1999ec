/**
 * Created by saliy002 on 4/9/17.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from './plant';
import { Observable } from "rxjs";

@Injectable()
export class PlantService {
    private plantUrl: string = API_URL + "plants";

    constructor(private http:Http) { }

    getFlowerById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }


}