import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }         from './app/app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { routing } from './app/app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PipeModule } from './pipe.module';
import {AdminComponent} from "./app/admin/admin.component";
import {ExportComponent} from "./app/admin/export.component";
import {AdminService} from "./app/admin/admin.service";
import {ImportComponent} from "./app/admin/import.component";
import {FileUploadComponent} from "./app/admin/file-upload.component";
import {RouterModule} from "@angular/router";
import {SheetUpdateComponent} from "./app/admin/sheet-update.component";
import {SearchComponent} from "./app/search/search.component";
import {LoginComponent} from "./app/admin/login.component"

import { GardenComponent} from "./app/garden/garden-component"
import { PlantListComponent } from './app/garden/plant-list/plant-list.component';
import { PlantComponent } from './app/garden/plants/plant.component';
import { BedListComponent } from './app/garden/bed-list/bed-list.component';
import { BedListService} from "./app/garden/bed-list/bed-list.service";
import { PlantService} from "./app/garden/plants/plant.service";
import {SearchService} from "./app/search/search.service";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {GraphComponent} from "./app/admin/google-charts.component";
import {PasswordChangeComponent} from "./app/admin/passwordChange.component";







@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule,
        PipeModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2GoogleChartsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        PlantListComponent,
        AdminComponent,
        ExportComponent,
        ImportComponent,
        FileUploadComponent,
        BedListComponent,
        GardenComponent,
        PlantComponent,
        SheetUpdateComponent,
        SearchComponent,
        GraphComponent,
        LoginComponent,
        PasswordChangeComponent
    ],
    providers: [ AdminService, BedListService, PlantService, SearchService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}