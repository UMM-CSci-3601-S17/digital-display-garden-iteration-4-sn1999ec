import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from './admin.service';
import {Router} from "@angular/router";


@Component({
    selector: 'import-component',
    templateUrl: 'import.component.html',
})

export class ImportComponent implements OnInit {

    private hasCookie: boolean;

    constructor(private adminService: AdminService, private router: Router) {

    }

    @ViewChild('fu') fu;
    @ViewChild('fubar') fubar;


    authorized: boolean;
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
        this.adminService.checkHasCookie()
            .subscribe(result => {
                this.hasCookie = result;
                if (this.hasCookie == false) {
                    this.router.navigateByUrl("/admin")
                }
            }, err => console.log(err));
    }
}
