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
    private error: string;
    private correctPass: boolean = false;

    constructor(private adminService: AdminService, private router : Router) {

    }

    ngOnInit(): void {
        this.adminService.checkHasCookie()
            .subscribe(result => {this.hasCookie = result;
                if(this.changedPass ==  true){this.router.navigateByUrl("/admin")}
            }, err => console.log(err));
    }

    changePassword(pass1: string, pass2: string, passOld: string): void {
        if(pass1 != null && pass2 != "" && pass2 != null && pass1 != ""){
            if(passOld != "" && passOld != null){
                // this.adminService.authenticate(passOld).subscribe(bool => this.correctPass = bool, console.log(bool));
                this.adminService.authenticate(passOld).subscribe(bool => {if(pass1 === pass2 ) {
                    if(bool) {
                        this.changedPass = true;
                        this.adminService.changePassword(pass1)
                            .subscribe(result => {
                                    this.ngOnInit()
                                },
                                err => console.log(err));
                    }else{
                        this.error = "Old password is incorrect";
                    }
                } else {
                    this.error = "New passwords do not match";
                }});
                // console.log(passOld);
                // There is an error RIGHT HERE I DON'T KNOW WHAT'S UP. basically the server is
                // returning true and the client is getting false, because it doesn't return fast enough, that's the issue.
                // Now I just need to fix it
                // console.log(this.correctPass);
                // if(pass1 === pass2 ) {
                //     if(this.correctPass) {
                //         this.changedPass = true;
                //         this.adminService.changePassword(pass1)
                //             .subscribe(result => {
                //                     this.ngOnInit()
                //                 },
                //                 err => console.log(err));
                //     }else{
                //         this.error = "Old password is incorrect";
                //     }
                // } else {
                //     this.error = "New passwords do not match";
                // }
            }else{
                this.error = "You must re-type the old password to change the password";
            }
        } else {
            this.error = "You must type a new password";
        }
    }
}