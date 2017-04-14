/**
 * Created by saliy002 on 4/9/17.
 */

import {Component} from "@angular/core";
import {Plant} from "../plants/plant";
import {PlantService} from "../plants/plant.service";
import {PlantComponent} from "../plants/plant.component";


@Component({
    selector: 'plant-list',
    templateUrl: 'plant-list.component.html',
    providers: [PlantService, PlantComponent]
})

export class PlantListComponent{
    public currentPlant: Plant;
    public plantNames: Plant[];
    public plant: Plant;
    private static plantListComponent: PlantListComponent;
    private plantSelect: boolean = false;

    constructor() {
        // Keep track of 'this' for static factory method
        PlantListComponent.plantListComponent = this;
    }

    public static getInstance(): PlantListComponent{
        return PlantListComponent.plantListComponent;
    }


    onClickedPlant(flower: Plant): void{
        this.currentPlant = flower;
        this.plantSelect = true;
        var plantComponent = PlantComponent.getInstance();
        plantComponent.onSelectFlower(flower)

    }


    public parseFlowers(flowers: Plant[]) {
        //console.log("HELO");
        var tempNames: Plant[] = [];
        for (let each of flowers) {
            tempNames.push(each);
        }
        console.log(tempNames);
        return tempNames;
    }
}