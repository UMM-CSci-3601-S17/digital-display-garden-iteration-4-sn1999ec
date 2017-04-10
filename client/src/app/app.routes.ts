// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ExportComponent} from "./admin/export.component";
import {ImportComponent} from "./admin/import.component";
// import {BedComponent} from "./plants/bed.component";
// import {FlowerComponent} from "./flowers/flower.component";
import {GardenComponent} from "./garden/garden-component";

// Route Configuration
export const routes: Routes = [
    { path: '', component: GardenComponent },
    // { path: 'plants/:plantID', component: PlantComponent },
     { path: 'admin', component: AdminComponent},
     { path: 'admin/exportData', component: ExportComponent},
     { path: 'admin/importData', component: ImportComponent},
    // { path: 'bed/:gardenLocation', component: BedComponent },
    // { path: 'flowers', component: FlowerComponent},
    //{ path: 'garden', component: GardenComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);