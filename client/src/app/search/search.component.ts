import { Component, OnInit} from '@angular/core';
import { SearchService } from "./search.service";
import { FilterBy } from "./filter.pipe";
import { Plant } from "../garden/plants/plant";
import {Router} from "@angular/router";


@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
    providers: [ FilterBy ]
})

export class SearchComponent implements OnInit {
    public plants: Plant[];

    constructor(private searchService: SearchService, private router: Router) {
    }

    public pickFlower(plant: Plant){
        var bedID: string = plant.gardenLocation;
        var plantID: string =  plant.id;
        this.router.navigateByUrl("/" + bedID + "/" + plantID);
    }


    ngOnInit(): void {
        this.searchService.getPlants().subscribe(
            plants => this.plants = plants,
            err => {
                console.log(err);
            }
        );
    }

}


