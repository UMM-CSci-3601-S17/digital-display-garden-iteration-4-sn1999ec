import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";
import {AdminComponent} from "./admin.component";
import {Router} from "@angular/router";

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
})

export class LoginComponent {

    private passwordCorrect: string = "";
    constructor(private adminService: AdminService) {

    }

    checkPassword(pw: string){
        var response: boolean;
        var adminComponent: AdminComponent = AdminComponent.getInstance();
        this.adminService.authenticate(pw).subscribe(
            result => {response = result;
                adminComponent.ngOnInit();
                console.log(response);
                if(!response){
                    this.passwordCorrect = "Incorrect password"
                }},
            err => console.log(err));



    }
}