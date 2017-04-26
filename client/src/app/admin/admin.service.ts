import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import {Plant} from "../garden/plants/plant";

@Injectable()
export class AdminService {
    private url: string = API_URL;
    constructor(private http:Http) { }

    getUploadIds(): Observable<string[]> {
        return this.http.request(this.url + "uploadIds", {withCredentials: true}).map(res => res.json());
    }

    getLiveUploadId(): Observable<string> {
        return this.http.request(this.url + "liveUploadId", {withCredentials: true}).map(res => res.json());
    }
    getGraphData(): Observable<any[][]> {
        return this.http.request(this.url + "getData", {withCredentials: true}).map(res => res.json());
    }

    postGraphData(): Observable<any> {
        return this.http.request(this.url + "postData", {withCredentials: true}).map(res => res.json());
    }

    getGardenLocations(): Observable<Plant[]> {
        console.log(API_URL + "gardenLocations");
        return this.http.request(API_URL + "gardenLocations", {withCredentials: true}).map(res => res.json());
    }

    getInfoForOneBed(bed: string): Observable<any[][]> {
        return this.http.request(API_URL + "getBedData/" + bed, {withCredentials: true}).map(res => res.json());
    }

    authenticate(pw: string): Observable<boolean> {
        return this.http.post(this.url + "logIn", pw, {withCredentials: true}).map(res => res.json());
    }
    checkHasCookie(): Observable<boolean> {
        return this.http.request(this.url + "checkCookie", {withCredentials: true}).map(res => res.json());
    }

    deleteCookie(): Observable<boolean> {
        return this.http.request(this.url + "deleteCookie", {withCredentials: true}).map(res => res.json());
    }
}