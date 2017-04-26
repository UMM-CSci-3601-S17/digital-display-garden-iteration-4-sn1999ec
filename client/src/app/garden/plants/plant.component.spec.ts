import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import { Plant } from "./plant";
import { PlantComponent } from "./plant.component";
import { PlantService } from "./plant.service";
import { Observable } from "rxjs";
import {PlantFeedback} from "./plant.feedback";
import { ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";


describe("Plant component", () => {

    let plantComponent: PlantComponent;
    let fixture: ComponentFixture<PlantComponent>;
    let plantServiceStub: {
        getFlowerById: (id: string) => Observable<Plant>
        getFeedbackForPlantByPlantID: (id: string) => Observable<PlantFeedback>
        ratePlant: (id: string, like: boolean) => Observable<boolean>
        commentPlant: (id: string, comment: string) => Observable<boolean>
    };

    let mockRouter = {
        params: {
            switchMap: (predicate) => predicate( {id: "16001"})
        }
    };

    let originalMockFeedBackData = {commentCount: 0, likeCount: 0, dislikeCount: 0};


    beforeEach(() => {

        // (re)set the fake database before every test
        this.mockFeedBackData = {};
        var key;
        for (key in originalMockFeedBackData) {
            this.mockFeedBackData[key] = originalMockFeedBackData[key];
        }

        // stub plantService for test purposes
        plantServiceStub = {
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
            ratePlant: (id: string, like: boolean) => {
                if(like == true){
                this.mockFeedBackData.likeCount += 1;
                return Observable.of(true);
                }else{
                    this.mockFeedBackData.dislikeCount += 1;
                    return Observable.of(true);
                }

            },
            commentPlant: (id: string, comment: string) => {
                this.mockFeedBackData.commentCount += 1;
                return Observable.of(true);
            }
        };


        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [ PlantComponent ],
            providers:    [
                {provide: PlantService, useValue: plantServiceStub} ,
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

    it("Can be initialized", () => {
        expect(plantComponent).toBeDefined();
    });

    it("Fetches plant feedback", () => {
        expect(plantComponent.plantFeedback.likeCount).toBe(0);
        expect(plantComponent.plantFeedback.dislikeCount).toBe(0);
        expect(plantComponent.plantFeedback.commentCount).toBe(0);
    });

    it("Test: like a plant", () => {
        expect(plantComponent.plantFeedback.likeCount).toBe(0);
        plantComponent.ratePlant(true);
        expect(plantComponent.plantFeedback.likeCount).toBe(1);
    });

    it("Test: dislike a plant ", () => {
        expect(plantComponent.plantFeedback.dislikeCount).toBe(0);
        plantComponent.ratePlant(false);
        expect(plantComponent.plantFeedback.dislikeCount).toBe(1);
    });

    it("Test: leave a comment ", () => {
        expect(plantComponent.plantFeedback.commentCount).toBe(0);
        plantComponent.comment("This flower is quite pretty");
        expect(plantComponent.commented).toBe(true);
        expect(plantComponent.plantFeedback.commentCount).toBe(1)
    });

    it("Test: Refresh Feedback", () => {
       expect(plantComponent.plantFeedback.plantrefresh).toBe("")
    });
});