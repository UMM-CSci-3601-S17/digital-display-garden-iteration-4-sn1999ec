import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";


@Component({
    selector: 'admin-component',
    templateUrl: 'admin-component.html',
})

export class AdminComponent implements OnInit {
    url : String = API_URL;
    private post : string;
    private boole: boolean = false;
    constructor(private adminService: AdminService) {

    }

    checkAuth() {
        console.log(this.adminService.authorized()
            .subscribe(result => this.boole = result,
                err => console.log(err)));
    }

    ngOnInit(): void {
        this.adminService.postGraphData()
            .subscribe(result => this.post = result, err => console.log(err));
    }
}