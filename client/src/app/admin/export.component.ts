import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';


@Component({
    selector: 'export-component',
    templateUrl: 'export.component.html',
})

export class ExportComponent implements OnInit {

    private url: string = API_URL + "export?uploadId=";

    private exportFeedbackUrl: string = API_URL + "exportFeedback?uploadId="

    uploadIds: string[];
    liveUploadId: string;

    constructor(public adminService: AdminService) {

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
    }
}

