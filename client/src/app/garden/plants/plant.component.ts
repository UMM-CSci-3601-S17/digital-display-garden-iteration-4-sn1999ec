/**
 * Created by saliy002 on 4/9/17.
 */


import {Component} from "@angular/core";
import {Plant} from "./plant";
import {PlantService} from "./plant.service";




@Component({
    selector: 'plant-component',
    templateUrl: 'plant.component.html'
})

export class PlantComponent{
    public plant : Plant;
    public currentPlant : Plant;
    private static plantComponent: PlantComponent;

    constructor(private plantService: PlantService){
        PlantComponent.plantComponent = this;
}

    public static getInstance(): PlantComponent{
        return PlantComponent.plantComponent;
    }

    onSelectFlower(currentFlower: Plant): void {
        this.currentPlant = currentFlower;
        console.log(this.currentPlant + "this Current flower");
        this.plantService.getFlowerById(this.currentPlant.id).subscribe(
            plant => this.plant = plant,
            err => {
                console.log(err);
            }
        );
        console.log(this.plant);
    }

}