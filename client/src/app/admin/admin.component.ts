import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";
import {Router} from "@angular/router";




@Component({
    selector: 'admin-component',
    templateUrl: 'admin-component.html',
})

export class AdminComponent implements OnInit {
    url : String = API_URL;
    private post : string;
    private hasCookie: boolean;
    private deletedCookie: boolean;
    private static adminComponent: AdminComponent;

    constructor(private adminService: AdminService, private router: Router) {
        AdminComponent.adminComponent = this;
    }

    public static getInstance() {
        return AdminComponent.adminComponent;
    }

    public deleteCookie() {
        this.adminService.deleteCookie()
            .subscribe(result => {
                this.deletedCookie = result;
                if (this.deletedCookie == true) {
                    this.ngOnInit();
                }
            }, err => console.log(err));
    }

    ngOnInit(): void {
        this.adminService.postGraphData()
            .subscribe(result => this.post = result, err => console.log(err));

        this.adminService.checkHasCookie()
            .subscribe(result => this.hasCookie = result, err => console.log(err));
    }
}