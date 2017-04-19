import {Component, OnInit} from '@angular/core';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {AdminService} from "./admin.service";
import {Observable} from "rxjs";
import {Plant} from "../garden/plants/plant";

@Component({
    selector: 'google-charts.component',
    templateUrl: 'google-charts.component.html'
})

// Component class
export class GraphComponent {

    public bed: string;
    private uploadIds: string[];
    public locations: Plant[];

    constructor(private adminService: AdminService) {
    }


    ngOnInit(): void {
        this.line_ChartData = Object.create(this.line_ChartData);
        this.adminService.getUploadIds()
            .subscribe(result => this.uploadIds = result, err => console.log(err));
        this.adminService.getGraphData()
            .subscribe(result => this.line_ChartData.dataTable = result, err => console.log(err));
        this.adminService.getGardenLocations()
            .subscribe(result => this.locations = result, err => console.log(err));

    }

    public line_ChartData = {
        chartType: `ColumnChart`,
        dataTable: [
            ['Year', 'Total Likes', 'Total Visits'],
            ['13', 0, 0]],
        options: {
            'title': 'Bed Information',
            width: 1500,
            height: 1000
        }
    };

    public setBed(bed: string) {
        this.bed = bed;
        this.adminService.getInfoForOneBed(bed)
            .subscribe(result => this.line_ChartData.dataTable = result, err => console.log(err));
    }

    public updateGraph(bed: string) {
        this.line_ChartData = Object.create(this.line_ChartData);

        this.adminService.getInfoForOneBed(bed)
            .subscribe(result => this.line_ChartData.dataTable = result, err => console.log(err));
    }
}