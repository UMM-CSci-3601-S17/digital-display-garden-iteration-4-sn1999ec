/**
 * Created by saliy002 on 4/9/17.
 */

import {Component, OnInit} from "@angular/core";
import {Plant} from "./plant";
import {PlantService} from "./plant.service";
import {Params, ActivatedRoute} from "@angular/router";
import {PlantFeedback} from "./plant.feedback";

@Component({
    selector: 'plant-component',
    templateUrl: 'plant.component.html'
})

export class PlantComponent {
    public plant : Plant = new Plant();
    public currentPlant : Plant;
    private static plantComponent: PlantComponent;
    private commented: Boolean = false;
    plantFeedback: PlantFeedback = new PlantFeedback();



    //Grimaldi's way of managing liking system
    // The rating field can have 3 values:
    // null - means that the plant hasn't been rated
    // true - means that the plant was liked
    // false - means the the plant was disliked
    private rating: boolean = null;


    constructor(private plantService: PlantService, private route: ActivatedRoute){
        PlantComponent.plantComponent = this;
    }

    public static getInstance(): PlantComponent{
        return PlantComponent.plantComponent;
    }

    onSelectFlower(currentFlower: Plant): void {
        this.rating = null;
        this.commented = false;
        this.currentPlant = currentFlower;
        console.log(this.currentPlant + "this Current flower");
        this.plantService.getFlowerById(this.currentPlant.id).subscribe(
            plant => {
                this.plant = plant;
                this.getFeedBack(this.plant.id);
              //  console.log("THIS"+this.plant.id);
            },
                    err => {
                        console.log(err);
                    }
        );
    }

    private comment(comment: string): void {
        if(!this.commented){
            if(comment != null) {
                this.plantService.commentPlant(this.plant["_id"]["$oid"], comment)
                    .subscribe(succeeded => {
                        this.commented = succeeded;
                        this.refreshFeedback();
                        this.getFeedBack(this.plant.id);
                    });
            }
        }
    }

    private ratePlant(like: boolean): void {
        if(this.rating === null && like !== null) {
            this.plantService.ratePlant(this.plant["_id"]["$oid"], like)
                .subscribe(succeeded => {
                    this.rating = like;
                    this.refreshFeedback();
                    this.getFeedBack(this.plant.id);
                });
        }
    }

    private refreshFeedback(): void {
        //Update flower feedback numbers
        this.route.params
            .switchMap((params: Params) => this.plantService.getFeedbackForPlantByPlantID(this.plant.id))
            .subscribe((plantFeedback: PlantFeedback) => this.plantFeedback = plantFeedback);
    }

    private getFeedBack(qq: string): void{
        this.route.params
            .switchMap((params: Params) => this.plantService.getFeedbackForPlantByPlantID(qq))
            .subscribe((plantFeedback: PlantFeedback) => this.plantFeedback = plantFeedback);
    }


    // ngOnInit(): void {
    //
    //     //This gets the ID from the URL params and sets and asks the server for the Plant with that ID
    //     this.route.params
    //         .switchMap((params: Params) => this.plantService.getPlantById(this.plant.id))
    //         .subscribe((plant: Plant) => this.plant = plant);
    //
    //     //Asks the server for a PlantFeedback object corresponding
    //     // this.route.params
    //     //     .switchMap((params: Params) => this.plantService.getFeedbackForPlantByPlantID(this.plant.id))
    //     //     .subscribe((plantFeedback: PlantFeedback) => this.plantFeedback = plantFeedback);
    //
    // }

}