import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }         from './app/app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { BedComponent } from './app/plants/bed.component';
import { PlantListComponent } from './app/plants/plant-list.component';
import { PlantComponent } from './app/plants/plant.component';
import { PlantListService } from './app/plants/plant-list.service';
import { routing } from './app/app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PipeModule } from './pipe.module';
import {AdminComponent} from "./app/admin/admin.component";
import {ExportComponent} from "./app/admin/export.component";
import {AdminService} from "./app/admin/admin.service";
import {ImportComponent} from "./app/admin/import.component";
import {FileUploadComponent} from "./app/admin/file-upload.component";
import {RouterModule} from "@angular/router";
import {FlowerComponent} from "./app/flowers/flower.component";
import {FlowerService} from "./app/flowers/flower.service";




@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule,
        PipeModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        PlantListComponent,
        PlantComponent,
        AdminComponent,
        ExportComponent,
        ImportComponent,
        FileUploadComponent,
        BedComponent,
        FlowerComponent,

    ],
    providers: [ PlantListService, AdminService,  FlowerService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}