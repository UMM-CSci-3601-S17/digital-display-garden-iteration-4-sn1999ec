import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "./admin.service";


@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html',
})

export class ImportComponent implements OnInit {

    @ViewChild('fu') fu;
    @ViewChild('fubar') fubar;


    authorized: boolean;
    filename: string;
    uploadAttempted: boolean = false;
    updateFile: string;
    updateAttempted


    constructor(private adminService: AdminService){
    }

    handleUpload(){
        this.fu.upload().subscribe(
            response => {
                this.filename = response.json();
                this.uploadAttempted = true;
            },
            err => {
                this.uploadAttempted = true;
            }

        );
    }

    handleUpdate(){
        this.uploadAttempted = true;
        this.fubar.update().subscribe(
            response => {
                this.updateFile = response.json();
                this.updateAttempted = true;
            },
            err => {
                this.updateAttempted = true;
            }

        );
    }

    ngOnInit(): void {
        this.adminService.authorized().subscribe(authorized => this.authorized = authorized);
    }
}
