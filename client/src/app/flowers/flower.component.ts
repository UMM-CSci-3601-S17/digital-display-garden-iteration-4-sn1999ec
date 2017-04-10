// import { FlowerService } from "./flower.service";
// import { Flower } from "./flower";
// import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { Feedback } from './feedback';
// import {Router, Params, ActivatedRoute} from '@angular/router';
//
//
// @Component({
//     templateUrl: 'flower.component.html',
//     /*styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
//      'span.glyphicon {font-size: 40px;}', 'input.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
//      'button.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
//      ' display: block; margin: auto;}', 'div.fullComment {width: 99%; margin: auto;}', 'hr.flowerPageHR {border: 1px solid #4CAF50;}',
//      'li.active {font-size: 30px; padding-bottom: 15px; border-bottom: solid green;}'],*/
//     selector: 'my-app',
// })
//
// // Component class
// export class FlowerComponent implements OnInit{
//     public bedNames: string[];
//     public flowerNames: Flower[];
//     public currentBed: string;
//     public currentFlower: Flower;
//     public flower: Flower;
//     public text: string;
//     public myForm: FormGroup; // our model driven form
//     public submitted: boolean = false; // keep track on whether form is submitted
//     public events: any[] = []; // use later to display form changes
//     private commentSucceed: Boolean = false;
//     private incrementSucceed: Boolean = false;
//     private visitSucceed: Boolean = false;
//     private url: string = this.router.url;
//     private rating: boolean = null;
//     flowerFeedback: Feedback = new Feedback();
//
//
//     constructor(private flowerService: FlowerService, private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
//     }
//
//     private parseFlowers(flowers: Flower[]) {
//
//
//         var tempNames: Flower[] = [];
//         for (let each of flowers) {
//             tempNames.push(each);
//         }
//
//
//         return tempNames;
//
//     }
//
//
//     ngOnInit(): void {
//         this.flowerService.getBedNames().subscribe(
//             beds => this.bedNames = beds,
//             err => {
//                 console.log(err);
//             }
//         );
//
//         this.myForm = this._fb.group({
//             plantID: ['', [<any>Validators.required]],
//             comment: ['', [<any>Validators.required]]
//         });
//
//         if (this.url.length > 1) {
//             this.currentBed = this.url.substr(1);
//             this.onSelectBed(this.currentBed);
//         }
//     }
//
//     onSelectBed(currentBed: any ): void {
//
//
//         this.currentBed = currentBed;
//         this.flowerService.getFlowerNames(currentBed).subscribe(
//             flowers => this.flowerNames = this.parseFlowers(flowers),
//
//             err => {
//                 console.log(err);
//             }
//         );
//
//     }
//
//
//     private ratePlant(like: boolean): void {
//         if(this.rating === null && like !== null) {
//             this.flowerService.ratePlant(this.flower["_id"]["$oid"], like)
//                 .subscribe(succeeded => {
//                     this.rating = like;
//                     this.refreshFeedback();
//                 });
//         }
//     }
//
//
//     private refreshFeedback(): void {
//         //Update flower feedback numbers
//         this.route.params
//             .switchMap((params: Params) => this.flowerService.getFeedbackForPlantByPlantID(params['plantID']))
//             .subscribe((flowerFeedback: Feedback) => this.flowerFeedback = flowerFeedback);
//     }
//
//     onSelectFlower(currentFlower: Flower): void {
//         this.currentFlower = currentFlower;
//         console.log(this.currentFlower + "this Current flower");
//         this.flowerService.getFlowerById(this.currentFlower.id).subscribe(
//             flower => this.flower = flower,
//             err => {
//                 console.log(err);
//             }
//         );
//
//        // console.log(this.flower + " THIS FLOWER");
//        //  if(isUndefined(this.flower)){
//        //    // console.log("YEP ");
//        //      this.flowerService.getFlowerById(this.currentFlower.id).subscribe(
//        //          flower => this.flower = flower,
//        //          err => {
//        //              console.log(err);
//        //          }
//        //      );
//        //
//        //      this.incrementVisits(this.currentFlower.id);
//        //      this.submitted=false;
//        //      this.incrementSucceed=false;
//        //  }
//        //  this.incrementVisits(this.currentFlower.id);
//        //  this.submitted=false;
//        //  this.incrementSucceed=false;
//
//     }
//
//     save(model: Feedback, isValid: boolean) {
//         this.submitted = true; // set form submit to true
//         this.flowerService.postComment(this.flower.id, model.comment)
//             .subscribe(succeed => this.commentSucceed = succeed);
//         // check if model is valid
//         // if valid, call API to save customer
//         console.log(model, isValid);
//     }
//
//     incrementLikes(): void {
//         this.flowerService.incrementLikes(this.flower.id)
//             .subscribe(succeed => this.incrementSucceed = succeed);
//
//     }
//
//     incrementVisits(plantID: string): void {
//         this.flowerService.incrementVisits(plantID)
//             .subscribe(succeed => this.visitSucceed = succeed);
//     }
// }
//
//
