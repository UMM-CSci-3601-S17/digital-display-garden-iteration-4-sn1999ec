import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";
import {AdminComponent} from "./admin.component";

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
})

export class LoginComponent {

    constructor (private adminService: AdminService, private adminComp : AdminComponent){

    }

    checkPassword(pw: string){
        var response: boolean;
        this.adminService.authenticate(pw).subscribe(
            result => {response = result;
                console.log(response);},
            err => console.log(err));

        this.adminComp.ngOnInit();
    }
}