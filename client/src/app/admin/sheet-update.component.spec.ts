import {ComponentFixture, TestBed, inject, async} from "@angular/core/testing";
import {SheetUpdateComponent} from "./sheet-update.component";
import {FileUploadComponent} from "./file-upload.component";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "../navbar/navbar.component";
import {ImportComponent} from "./import.component";
import {Http} from "@angular/http";
import {AdminService} from "./admin.service";


describe('Directive: SheetUpdate', () => {

    let updateComponent: SheetUpdateComponent;
    let fixture: ComponentFixture<SheetUpdateComponent>;
    let adminServiceStub: {
        authorized: () => Observable<boolean>
    };
    let mockHttp: {post: (string, any) => Observable<any>};

    beforeEach(() => {
        mockHttp = {
            post: (str: string, a: any) => {
                return Observable.of({json: () => "mockFileName"});
            }
        };

        adminServiceStub = {
            authorized: () => {
                return Observable.of(true);
            }
        };


        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [SheetUpdateComponent, NavbarComponent],
            providers: [{provide: Http, useValue: mockHttp}, {provide: AdminService, useValue: adminServiceStub}]
        });

    });

    beforeEach(
        async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(SheetUpdateComponent);
                updateComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

    it("can be initialized", () => {
        expect(updateComponent).toBeDefined();
    });

    it("can update the database", () => {
        updateComponent.inputEl = {nativeElement: {files: {length: 1, item: (x) => "eh"}}};
        updateComponent.update();
        expect(updateComponent.updated).toEqual(true);
    });

});