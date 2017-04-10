import { FlowerService } from "./flower.service";
import { Flower } from "./flower";
import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Feedback } from './feedback';
import { Router, NavigationStart, RouterModule, RouterLink } from '@angular/router';
import {Observable} from "rxjs";


@Component({
    templateUrl: 'flower.component.html',
    /*styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
     'span.glyphicon {font-size: 40px;}', 'input.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
     'button.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
     ' display: block; margin: auto;}', 'div.fullComment {width: 99%; margin: auto;}', 'hr.flowerPageHR {border: 1px solid #4CAF50;}',
     'li.active {font-size: 30px; padding-bottom: 15px; border-bottom: solid green;}'],*/
    selector: 'my-app',
})

// Component class
export class FlowerComponent implements OnInit{
    public bedNames: string[];
    public flowerNames: Flower[];
    public currentBed: string;
    public currentFlower: Flower;
    public flower: Flower;
    public text: string;
    public myForm: FormGroup; // our model driven form
    public submitted: boolean = false; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    private commentSucceed: Boolean = false;
    private incrementSucceed: Boolean = false;
    private visitSucceed: Boolean = false;
    private url: string = this.router.url;
    private bedSelect: boolean = false;
    private plantSelect:boolean = false;

    constructor(private flowerService: FlowerService, private _fb: FormBuilder, private router: Router) {
    }

    private parseFlowers(flowers: Flower[]) {


        var tempNames: Flower[] = [];
        for (let each of flowers) {
            tempNames.push(each);
        }


        return tempNames;

    }


    ngOnInit(): void {
        this.flowerService.getBedNames().subscribe(
            beds => this.bedNames = beds,
            err => {
                console.log(err);
            }
        );

        this.myForm = this._fb.group({
            plantID: ['', [<any>Validators.required]],
            comment: ['', [<any>Validators.required]]
        });

        if (this.url.length > 1) {
            this.currentBed = this.url.substr(1);
            this.onSelectBed(this.currentBed);
        }
    }

    onSelectBed(currentBed: any ): void {

        this.currentBed = currentBed;
        this.bedSelect = true;
        this.flowerService.getFlowerNames(currentBed).subscribe(
            flowers => this.flowerNames = this.parseFlowers(flowers),

            err => {
                console.log(err);
            }
        );

    }

    onSelectFlower(currentFlower: Flower): void {
        this.plantSelect = true;
        this.currentFlower = currentFlower;
        this.flowerService.getFlowerById(this.currentFlower.id).subscribe(
            flower => this.flower = flower,
            err => {
                console.log(err);
            }
        );

        console.log(this.flower);
        // this.incrementVisits(this.flower.id);
        // this.submitted=false;
        // this.incrementSucceed=false;
    }

    comment(model: Feedback, isValid: boolean) {
        this.submitted = true; // set form submit to true
        this.flowerService.postComment(this.flower.id, model.comment)
            .subscribe(succeed => this.commentSucceed = succeed);
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

    incrementLikes(): void {
        this.flowerService.incrementLikes(this.flower.id)
            .subscribe(succeed => this.incrementSucceed = succeed);

    }

    incrementVisits(plantID: string): void {
        this.flowerService.incrementVisits(plantID)
            .subscribe(succeed => this.visitSucceed = succeed);
    }
}


