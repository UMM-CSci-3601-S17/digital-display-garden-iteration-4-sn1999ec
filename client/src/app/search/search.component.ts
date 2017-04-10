import { Component, OnInit} from '@angular/core';
import { SearchService } from "./search.service";
import { FilterBy } from "./filter.pipe";
import { Plant } from "./plant";

@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
    providers: [ FilterBy ]
})

export class SearchComponent implements OnInit {
    public plants: Plant[];

    constructor(private searchService: SearchService) {
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


