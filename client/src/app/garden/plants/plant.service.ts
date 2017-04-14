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

    /**
     * Sends a request to the server, and gets a Observable<Plant>
     * @param id
     * @returns {Observable<Plant>}
     */
    getFlowerById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }

    /**
     * Sends a request to the server, which adds a like/dislike to the particular flower(specified by id) in Mongo database.
     * @param id
     * @param like
     * @returns {Observable<boolean>}
     */
    ratePlant(id: string, like: boolean): Observable<boolean> {
       console.log(id);
        let returnObject = {
            id: id,
            like: like
        };
        return this.http.post(this.plantUrl + "/" + "rate", JSON.stringify(returnObject)).map(res => res.json());
    }

    /**
     * Sends a request to the server, which adds a comment to the CommentCollection which is assigned to the flower by id.
     * @param id
     * @param comment
     * @returns {Observable<R>}
     */
    commentPlant(id: string, comment: string): Observable<Boolean> {
        let returnObject = {
            plantId: id,
            comment: comment
        };
        return this.http.post(this.plantUrl + "/" + "leaveComment", JSON.stringify(returnObject)).map(res => res.json());
    }

    /**
     * Sends a request to the server, to get plant's feedback data
     * @param id
     * @returns {Observable<R>}
     */
    getFeedbackForPlantByPlantID(id: string): Observable<PlantFeedback> {
        //console.log(this.plantUrl + "/" + id + "/counts");
        return this.http.request(this.plantUrl + "/" + id + "/counts").map(res => res.json());
    }
}