/**
 * Created by saliy002 on 4/9/17.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from './plant';
import { Observable } from "rxjs";
import {PlantFeedback} from "./plant.feedback";

@Injectable()
export class PlantService {
    public plantUrl: string = API_URL + "plants";

    constructor(public http:Http) { }

    getFlowerById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }

    ratePlant(id: string, like: boolean): Observable<boolean> {
       console.log(id);
        let returnObject = {
            id: id,
            like: like
        };
        return this.http.post(this.plantUrl + "/" + "rate", JSON.stringify(returnObject)).map(res => res.json());
    }

    commentPlant(id: string, comment: string): Observable<Boolean> {
        let returnObject = {
            plantId: id,
            comment: comment
        };
        return this.http.post(this.plantUrl + "/" + "leaveComment", JSON.stringify(returnObject)).map(res => res.json());
    }

    getFeedbackForPlantByPlantID(id: string): Observable<PlantFeedback> {
        //console.log(this.plantUrl + "/" + id + "/counts");
        return this.http.request(this.plantUrl + "/" + id + "/counts").map(res => res.json());
    }

    getPlantById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }

}