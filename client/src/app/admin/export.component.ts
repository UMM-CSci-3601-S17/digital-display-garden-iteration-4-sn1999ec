import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import {Router} from "@angular/router";


@Component({
    selector: 'export-component',
    templateUrl: 'export.component.html',
})

export class ExportComponent implements OnInit {

    private url: string = API_URL + "export?uploadId=";

    private exportFeedbackUrl: string = API_URL + "exportFeedback?uploadId="

    uploadIds: string[];
    liveUploadId: string;
    private hasCookie: boolean;


    constructor(public adminService: AdminService, private router: Router) {

    }

    ngOnInit(): void {
        this.adminService.getUploadIds()
            .subscribe(result => {
                this.uploadIds = result;
            }, err => console.log(err));

        this.adminService.getLiveUploadId()
            .subscribe(result => {
                this.liveUploadId = result;
            }, err => console.log(err));
        this.adminService.checkHasCookie()
            .subscribe(result => {
                this.hasCookie = result;
                if (this.hasCookie == false) {
                    this.router.navigateByUrl("/admin")
                }
            }, err => console.log(err));
    }

}

