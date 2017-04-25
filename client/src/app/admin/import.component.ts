import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from './admin.service';


@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html',
})

export class ImportComponent implements OnInit {

    private hasCookie: boolean;

    constructor(private adminService: AdminService){

    }

    @ViewChild('fu') fu;
    @ViewChild('fubar') fubar;

    filename: string;
    uploadAttempted: boolean = false;
    updateFile: string;
    updateAttempted

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
        this.adminService.checkHasCookie()
            .subscribe(result => this.hasCookie = result, err => console.log(err));
    }
}
