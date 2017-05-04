import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {FileUploadComponent} from "./file-upload.component";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "../navbar/navbar.component";
import {Http} from "@angular/http";
import {AdminService} from "./admin.service";


describe('Directive: Upload', () => {

    let uploadComponent: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
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
            declarations: [FileUploadComponent, NavbarComponent],
            providers: [{provide: Http, useValue: mockHttp}, {provide: AdminService, useValue: adminServiceStub}]
        });

    });

    beforeEach(
        async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(FileUploadComponent);
                uploadComponent = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

    it("can be initialized", () => {
        expect(uploadComponent).toBeDefined();
    });

    it("can upload to the database", () => {
        uploadComponent.inputEl = {nativeElement: {files: {length: 1, item: (x) => "eh"}}};
        uploadComponent.upload();
        expect(uploadComponent.uploaded).toEqual(true);
    });

});