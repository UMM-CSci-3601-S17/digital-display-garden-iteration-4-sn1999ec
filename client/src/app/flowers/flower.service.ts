// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { Observable } from "rxjs";
// import { Flower } from "./flower";
// import {Feedback} from "./feedback";
//
// @Injectable()
// export class FlowerService {
//     private bedUrl: string = API_URL + "gardenLocations";
//     private plantUrl: string = API_URL + "plants";
//     constructor(private http:Http) { }
//
//     getFlowerById(id: string): Observable<Flower> {
//         return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
//     }
//
//     getFlower(garden: any, cultivar:string): Observable<any> {
//         console.log(this.plantUrl + "?gardenLocation=" + garden._id + "&cultivar=" + cultivar);
//         return this.http.request(this.plantUrl + "?gardenLocation=" + garden._id + "&cultivar=" + cultivar).map(res => res.json());
//     }
//
//     getFlowerNames(garden: any): Observable<Flower[]> {
//         return this.http.request(this.plantUrl + "?gardenLocation=" + garden._id).map(res => res.json());
//     }
//
//     getBedNames(): Observable<any> {
//         return this.http.request(this.bedUrl).map(res => res.json());
//     }
//
//     postComment(plantID: string, comment: string): Observable<Boolean> {
//         let toInsert = {
//             plantID: plantID,
//             comment: comment
//         };
//
//         return this.http.post(this.plantUrl + "/postComment", JSON.stringify(toInsert)).map(res => res.json());
//     }
//
//     incrementLikes(plantID: string): Observable<Boolean> {
//         let toUpdate = {
//             plantID: plantID
//         };
//
//         return this.http.put(this.plantUrl + "/thumbsUp", JSON.stringify(toUpdate)).map(res => res.json());
//     }
//
//     incrementVisits(plantID: string): Observable<Boolean> {
//         let toUpdate = {
//             plantID: plantID
//         };
//
//         return this.http.put(this.plantUrl + "/flowerVisits", JSON.stringify(toUpdate)).map(res => res.json());
//     }
//
//
//     ratePlant(id: string, like: boolean): Observable<boolean> {
//         let returnObject = {
//             id: id,
//             like: like
//         };
//         return this.http.post(this.plantUrl + "/" + "rate", JSON.stringify(returnObject)).map(res => res.json());
//     }
//
//
//     getFeedbackForPlantByPlantID(id: string): Observable<Feedback> {
//         return this.http.request(this.plantUrl + "/" + id + "/counts").map(res => res.json());
//     }
//
//
//
// }