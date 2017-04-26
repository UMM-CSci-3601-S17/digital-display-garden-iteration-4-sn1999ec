import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import {AdminComponent} from "./admin.component";
import {Router} from "@angular/router";


@Component({
    selector: 'passworChange-component',
    templateUrl: 'passwordChange.component.html',
})

export class PasswordChangeComponent implements OnInit {

    private url: string = API_URL + "export?uploadId=";

    private exportFeedbackUrl: string = API_URL + "exportFeedback?uploadId="

    private hasCookie: boolean;
    private changedPass: boolean = false;

    constructor(private adminService: AdminService, private router : Router) {

    }

    ngOnInit(): void {
        this.adminService.checkHasCookie()
            .subscribe(result => {this.hasCookie = result;
                if(this.changedPass ==  true){this.router.navigateByUrl("/admin")}
            }, err => console.log(err));
    }

    changePassword(pass1: string, pass2: string): void {
        if(pass1 === pass2) {
            this.changedPass = true;
            this.adminService.changePassword(pass1)
                .subscribe(result => {
                this.ngOnInit()},
                err => console.log(err));
        }}
}