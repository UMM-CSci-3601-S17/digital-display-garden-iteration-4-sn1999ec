/**
 * Created by saliy002 on 4/14/17.
 */
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { SearchService } from "./search.service";
import {SearchComponent} from "./search.component";
import {Plant} from "../garden/plants/plant"
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

/**
 * This is a special router testing import,
 * so we don't get error messages like: Can't bind to 'routerLink' since it isn't a known native property
 */
import { RouterTestingModule } from '@angular/router/testing';

// import { SearchListComponent } from "./search.component";
// import { SearchListService } from "./search-list.service";

describe("Search list", () => {

    let searchList: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    let searchServiceStub: {
        getPlants: () => Observable<Plant[]>
    };

    beforeEach(() => {
        searchServiceStub = {
            getPlants: () => Observable.of([
                {
                    _id : "343",
                    id : "565",
                    plantType: "ww",
                    commonName : "Flower01",
                    cultivar : "fancyWord01",
                    source: "",
                    gardenLocation: "",
                    year: 1,
                    pageURL: "",
                    plantImageURLs:["" ],
                    recognitions: [""]
                },
                {
                    _id : "444",
                    id : "222",
                    plantType: "ss",
                    commonName : "Flower02",
                    cultivar : "fancyWord02",
                    source: "",
                    gardenLocation: "",
                    year: 2,
                    pageURL: "",
                    plantImageURLs:[""],
                    recognitions: [""]
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule, RouterTestingModule],
            declarations: [ SearchComponent ],
            providers:    [ { provide: SearchService, useValue: searchServiceStub } ]
        })


    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SearchComponent);
            searchList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the plants", () => {

        expect(searchList.plants.length).toBe(2);
    });


    it("contains a plant with the common name 'Flower01'",()=> {
        expect(searchList.plants.some((plant: Plant) => plant.commonName === "Flower01")).toBe(true);
    });

    it("contains a plant with the cultivar named 'fancyWord02'",()=> {
        expect(searchList.plants.some((plant: Plant) => plant.cultivar === "fancyWord02")).toBe(true);
    });

    /**
     * Testing the filter here.
     */
    it("has 1 flower which's commonName is 'Flower02'", () => {
        expect(searchList.plants.filter((plant: Plant) => plant.commonName === "Flower02").length).toBe(1);
    });

    it("has 1 flower which's cultivar name is 'fancyWord1'", () => {
        expect(searchList.plants.filter((plant: Plant) => plant.cultivar === "fancyWord01").length).toBe(1);
    });

})


