/**
 * Created by saliy002 on 4/9/17.
 */

import {Component} from "@angular/core";
import {Plant} from "./plant";
import {PlantService} from "./plant.service";
import {Params, ActivatedRoute} from "@angular/router";
import {PlantFeedback} from "./plant.feedback";
import {PlantListComponent} from "../plant-list/plant-list.component";

@Component({
    selector: 'plant-component',
    templateUrl: 'plant.component.html'
})

export class PlantComponent {
    public plant : Plant = new Plant();
    public currentPlant : Plant;
    public static plantComponent: PlantComponent;
    public commented: Boolean = false;
    plantFeedback: PlantFeedback = new PlantFeedback();



    //Grimaldi's way of managing liking system
    // The rating field can have 3 values:
    // null - means that the plant hasn't been rated
    // true - means that the plant was liked
    // false - means the the plant was disliked
    public rating: boolean = null;


    constructor(public plantService: PlantService, public route: ActivatedRoute){
        PlantComponent.plantComponent = this;
    }

    /**
     * The static factory method which returns currently instantiated PlantComponent.
     * @returns {PlantComponent}
     */
    public static getInstance(): PlantComponent{
        return PlantComponent.plantComponent;
    }

    searchedFlower(id : string){
        this.rating = null;
        this.commented = false;
        var plantListComponent: PlantListComponent = PlantListComponent.getInstance();
        this.plantService.getFlowerById(id).subscribe(
            plant => {
                this.plant = plant;
                plantListComponent.plantSelect = true;
                plantListComponent.currentPlant = plant;
                this.getFeedBack(this.plant.id);
            },
            err => {
                console.log(err);
            }
        );
    }

    /**
     * Once a user selects a flower the Plant.component will be populated.
     * @param currentFlower
     */
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

    /**
     * User can leave a comment.
     * The feedback will refreshed after he submits a comments.
     * @param comment
     */
    public comment(comment: string): void {
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

    /**
     * User can rate a plant.
     * The feedback will refreshed after he rates a plant.
     * @param like
     */
    public ratePlant(like: boolean): void {
        if(this.rating === null && like !== null) {
            this.plantService.ratePlant(this.plant["_id"]["$oid"], like)
                .subscribe(succeeded => {
                    this.rating = like;
                    this.refreshFeedback();
                    this.getFeedBack(this.plant.id);
                });
        }
    }
    public refreshFeedback(): void {
        //Update flower feedback numbers
        this.route.params
            .switchMap((params: Params) => this.plantService.getFeedbackForPlantByPlantID(this.plant.id))
            .subscribe((plantFeedback: PlantFeedback) => this.plantFeedback = plantFeedback);
    }

    public getFeedBack(qq: string): void{
        this.route.params
            .switchMap((params: Params) => this.plantService.getFeedbackForPlantByPlantID(qq))
            .subscribe((plantFeedback: PlantFeedback) => this.plantFeedback = plantFeedback);
    }
}