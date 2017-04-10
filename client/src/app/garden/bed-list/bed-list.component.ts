/**
 * Created by saliy002 on 4/9/17.
 */

import {OnInit, Component} from "@angular/core";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {BedListService} from "./bed-list.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Plant} from "../plants/plant";
import {PlantListService} from "../plant-list/plant-list.service";
import {PlantListComponent} from "../plant-list/plant-list.component";


@Component({
    selector: 'bed-list',
    templateUrl: 'bed-list.component.html',
    providers: [PlantListComponent]
})

export class BedListComponent implements OnInit {
    public bedNames: string[];
    public currentBed: string;
    public myForm: FormGroup;
    private url: string = this.router.url;
    private bedSelect: boolean = false;

    constructor(private bedListService: BedListService,private plantListService: PlantListService, private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    }
    ngOnInit(): void {
        this.bedListService.getBedNames().subscribe(
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
        this.bedSelect = true;
        var plantListComponent: PlantListComponent = PlantListComponent.getInstance();
        this.currentBed = currentBed;
        this.plantListService.getFlowerNames(currentBed).subscribe(
            flowers => plantListComponent.plantNames = plantListComponent.parseFlowers(flowers),
            err => {
                console.log(err);
            }
        );
    }
}