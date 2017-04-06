import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { Flower } from "./flower";

@Injectable()
export class FlowerService {
    private bedUrl: string = API_URL + "gardenLocations";
    private plantUrl: string = API_URL + "plants";
    constructor(private http:Http) { }

    getFlower(garden: string, cultivar:string): Observable<any> {
        return this.http.request(this.plantUrl + "?gardenLocation=" + garden + "&cultivar=" + cultivar).map(res => res.json());
    }

    getFlowerNames(garden: any): Observable<Flower[]> {
        return this.http.request(this.plantUrl + "?gardenLocation=" + garden._id).map(res => res.json());
    }

    getBedNames(): Observable<any> {
        return this.http.request(this.bedUrl).map(res => res.json());
    }

    postComment(plantID: string, comment: string): Observable<Boolean> {
        let toInsert = {
            plantID: plantID,
            comment: comment
        };

        return this.http.post(this.plantUrl + "/postComment", JSON.stringify(toInsert)).map(res => res.json());
    }

    incrementLikes(plantID: string): Observable<Boolean> {
        let toUpdate = {
            plantID: plantID
        };

        return this.http.put(this.plantUrl + "/thumbsUp", JSON.stringify(toUpdate)).map(res => res.json());
    }

    incrementVisits(plantID: string): Observable<Boolean> {
        let toUpdate = {
            plantID: plantID
        };

        return this.http.put(this.plantUrl + "/flowerVisits", JSON.stringify(toUpdate)).map(res => res.json());
    }
}