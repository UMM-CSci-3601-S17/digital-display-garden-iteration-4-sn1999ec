// /**
//  * Created by saliy002 on 4/12/17.
//  */
// import { ComponentFixture, TestBed, async } from "@angular/core/testing";
// import { Observable } from "rxjs";
// import {BedListComponent} from "./bed-list.component";
// import {Bed} from "./bed";
// import {BedListService} from "./bed-list.service";
//
//
// describe("Bed list", () => {
//
//     let bedList: BedListComponent;
//     let fixture: ComponentFixture<BedListComponent>;
//
//     let bedListServiceStub: {
//         getBedNames: () => Observable<Bed[]>
//     };
//
//     beforeEach(() => {
//         // stub UserService for test purposes
//         bedListServiceStub = {
//             getBedNames: () => Observable.of([
//                 {
//                     _id: "Bed1",
//                 },
//                 {
//                     _id: "Bed2",
//                 },
//                 {
//                     _id: "Bed3",
//                 }
//             ])
//         };
//
//         TestBed.configureTestingModule({
//             declarations: [ BedListComponent ],
//             providers:    [ { provide: BedListService, useValue: bedListServiceStub } ]
//         })
//     });
//
//     beforeEach(async(() => {
//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(BedListComponent);
//             bedList = fixture.componentInstance;
//             fixture.detectChanges();
//         });
//     }));
//
//     it("Get Bed Names", () => {
//         expect(bedList.getBedNames().length).toBe(0);
//     });
//
// });
//
