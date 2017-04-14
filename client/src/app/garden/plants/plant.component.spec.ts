import {ComponentFixture, TestBed, async, inject} from "@angular/core/testing";
import { Plant } from "./plant";
import { PlantComponent } from "./plant.component";
import { PlantListService } from "../plant-list/plant-list.service";
import { Observable } from "rxjs";
import {PlantFeedback} from "./plant.feedback";
import { ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";


describe("Plant component", () => {

    let plantComponent: PlantComponent;
    let fixture: ComponentFixture<PlantComponent>;
    let plantListServiceStub: {
        getFlowerById: (id: string) => Observable<Plant>
        getFeedbackForPlantByPlantID: (id: string) => Observable<PlantFeedback>
        //ratePlant: (id: string, like: boolean) => Observable<boolean>
        commentPlant: (id: string, comment: string) => Observable<boolean>
    };

    let mockRouter = {
        params: {
            switchMap: (predicate) => predicate( {id: "16001"})
        }
    };

    let originalMockFeedBackData = {commentCount: 0};


    beforeEach(() => {

        // (re)set the fake database before every test
        this.mockFeedBackData = {};
        var key;
        for (key in originalMockFeedBackData) {
            this.mockFeedBackData[key] = originalMockFeedBackData[key];
        }

        // stub plantService for test purposes
        plantListServiceStub = {
            getFlowerById: (id: string) => {
                return Observable.of(
                    [{
                        _id: "6432",
                        id: "16001",
                        plantType: "",
                        commonName: "",
                        cultivar: "",
                        source: "",
                        gardenLocation: "",
                        year: 0,
                        pageURL: "",
                        plantImageURLs: [""],
                        recognitions: [""]
                    }].find(plant => plant.id === id));
            },
            getFeedbackForPlantByPlantID: (id: string) => {
                return Observable.of(this.mockFeedBackData)
            },
            // ratePlant: (id: string, like: boolean) => {
            //     this.mockFeedBackData.likeCount += 1;
            //     return Observable.of(true);
            // },
            commentPlant: (id: string, comment: string) => {
                this.mockFeedBackData.commentCount += 1;
                return Observable.of(true);
            }
        };


        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [ PlantComponent ],
            providers:    [
                {provide: PlantListService, useValue: plantListServiceStub} ,
                {provide: ActivatedRoute, useValue: mockRouter }]
        });



    });

    beforeEach(
        async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(PlantComponent);
                plantComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));


    it("can be initialized", () => {
        expect(plantComponent).toBeDefined();
    });

    it("fetches plant feedback", () => {
        //expect(plantComponent.plantFeedback.likeCount).toBe(0);
        expect(plantComponent.plantFeedback.commentCount).toBe(0);
    });

    // it("updates plant feedback", () => {
    //     expect(plantComponent.plantFeedback.likeCount).toBe(0);
    //     plantComponent.ratePlant(true);
    //     expect(plantComponent.plantFeedback.likeCount).toBe(1);
    // });

    it("can accept comments", () => {
        expect(plantComponent.plantFeedback.commentCount).toBe(0);
        plantComponent.comment("This flower is quite pretty");
        expect(plantComponent.commented).toBe(true);
        expect(plantComponent.plantFeedback.commentCount).toBe(1)
    });



    // it("returns undefined for Santa", () => {
    //     plantComponent.setId("Santa");
    //     expect(plantComponent.plant).not.toBeDefined();
    // });

});