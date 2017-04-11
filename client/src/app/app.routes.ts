// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { ExportComponent } from "./admin/export.component";
import { ImportComponent } from "./admin/import.component";
import { GardenComponent } from "./garden/garden-component";
import { SearchComponent } from "./search/search.component";

// Route Configuration
export const routes: Routes = [
    { path: '', component: GardenComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'admin/exportData', component: ExportComponent},
    { path: 'admin/importData', component: ImportComponent},
    { path: 'search', component: SearchComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);