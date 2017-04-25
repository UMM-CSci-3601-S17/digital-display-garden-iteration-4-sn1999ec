import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";



@Component({
    selector: 'admin-component',
    templateUrl: 'admin-component.html',
})

export class AdminComponent implements OnInit {
    url : String = API_URL;
    private post : string;
    private hasCookie: boolean;
    constructor(private adminService: AdminService) {

    }

    ngOnInit(): void {
        this.adminService.postGraphData()
            .subscribe(result => this.post = result, err => console.log(err));

        this.adminService.checkHasCookie()
            .subscribe(result => this.hasCookie = result, err => console.log(err));
    }
}