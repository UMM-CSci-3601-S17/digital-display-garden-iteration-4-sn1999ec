import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from './plant';
import {Observable} from "rxjs";

@Injectable()
export class SearchService {
    //private baseUrl: string = API_URL ;
    private searchURL: string = API_URL + "flowers";
    constructor(private http:Http) { }

    getPlants(): Observable<Plant[]> {
        //let body = this.http.request(this.baseUrl + 'todos').map(res => res.json());
        return this.http.request(this.searchURL).map(res => res.json());
    }
}