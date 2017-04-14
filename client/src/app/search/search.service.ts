import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from '../garden/plants/plant';
import { Observable } from "rxjs";

@Injectable()
export class SearchService {
    private searchURL: string = API_URL + "flowers";
    constructor(private http:Http) { }

    getPlants(): Observable<Plant[]> {
        return this.http.request(this.searchURL).map(res => res.json());
    }
}