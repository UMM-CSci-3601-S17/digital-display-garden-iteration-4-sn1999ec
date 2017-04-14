/**
 * Created by saliy002 on 4/9/17.
 */

import {OnInit, Component} from "@angular/core";
import {BedListService} from "./bed-list.service";
import {Router} from "@angular/router";
import {PlantListComponent} from "../plant-list/plant-list.component";
import {Bed} from "./bed";


@Component({
    selector: 'bed-list',
    templateUrl: 'bed-list.component.html',
    providers: [PlantListComponent]
})

export class BedListComponent implements OnInit {

    private bedNames: Bed[];
    public currentBed: string;
    private url: string = this.router.url;
    private bedSelect: boolean = false;
    constructor(public bedListService: BedListService, public router: Router) {
    }

    /**
     * was made for tests, but didn't work as expected.
     * @returns {Bed[]}
     */
    public getBedNames(): Bed[]{
        return this.bedNames;
    }

    /**
     * Once a user selects a bed, the plants from this bed will be populated in plant-list.component
     * @param currentBed
     */
    onSelectBed(currentBed: any ): void {
        this.bedSelect = true;
        var plantListComponent: PlantListComponent = PlantListComponent.getInstance();
        this.currentBed = currentBed;
        this.bedListService.getFlowerNames(currentBed).subscribe(
            flowers => {
                plantListComponent.plantNames = plantListComponent.parseFlowers(flowers);
                },
            err => {
                console.log(err);
                }
        );
    }

    ngOnInit(): void {
        this.bedListService.getBedNames().subscribe(
            bedNames => this.bedNames = bedNames,
            err => {
                console.log(err);
            }
        );

        if (this.url.length > 1) {
            this.onSelectBed(new Bed(this.url.substr(1)));
        }
    }
}