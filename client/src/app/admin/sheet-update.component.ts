//Credit to http://stackoverflow.com/questions/36352405/file-upload-with-angular2-to-rest-api/39862337#39862337
//Thanks Brother Woodrow!
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { SheetListService } from "./sheet-update.service"

@Component({
    selector: 'sheet-update',
    template: '<input type="file" [multiple]="multiple" #fileInput>'
})
export class SheetUpdateComponent {
    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    updated: boolean = false;

    constructor(private http: Http) {}

    update() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file[]', inputEl.files.item(i));
            }

            this.updated = true;
            return this.http.post(API_URL + "updateData", formData);
        }
    }
}