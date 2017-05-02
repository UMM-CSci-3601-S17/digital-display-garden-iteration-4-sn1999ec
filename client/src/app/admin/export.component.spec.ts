import {ExportComponent} from "./export.component";
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "../navbar/navbar.component";
import {AdminService} from "./admin.service";
describe("Directive: Export", () => {
    let exportComponent: ExportComponent;
    let fixture: ComponentFixture<ExportComponent>;

    let adminServiceStub: {
        getUploadIds: () => Observable<string[]>
        getLiveUploadId: () => Observable<string>
    };

    beforeEach(() => {
        adminServiceStub = {
            getUploadIds: () => {
                return Observable.of([
                    "this is an uploadId",
                    "this is also an upload id",
                    "this is your mom"
                ])},

            getLiveUploadId: () => {
                return Observable.of(
                    "this is a live upload id"
                )
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [ExportComponent, NavbarComponent],
            providers: [{provide: AdminService, useValue: adminServiceStub}]
        });
    });

    beforeEach(
        async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(ExportComponent);
                exportComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));


    it("There is a liveUploadId", () => {
        expect(exportComponent.liveUploadId).toEqual("this is a live upload id");
    });

    it ("There are uploadIds", () => {
        expect(exportComponent.uploadIds[0]).toEqual("this is an uploadId");
    });

});
