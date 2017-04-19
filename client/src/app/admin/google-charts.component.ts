import {Component, OnInit} from '@angular/core';
import {AdminService} from "./admin.service";
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
            .subscribe(result => {
                    this.locations = result;
                }
                , err => console.log(err));

    }

    public line_ChartData = {
        chartType: `ColumnChart`,
        dataTable: [
            ['Year', 'Total Likes', 'Total Visits'],
            ['13', 0, 0],
            ['7', 0, 0],
            ['10', 0, 0],
            ['2S', 0, 0],
            ['6', 0, 0],
            ['5', 0, 0],
            ['2N', 0, 0],
            ['1S', 0, 0],
            ['1N', 0, 0],
            ['LG', 0, 0],
            ['11', 0, 0],
            ['9', 0, 0]],
        options: {
            'title': 'Bed Information',
            width: 1500,
            height: 1000
        }
    };

    public updateGraph(bed: string) {
        this.line_ChartData = Object.create(this.line_ChartData);
        console.log(bed);
        this.adminService.getInfoForOneBed(bed)
            .subscribe(result => this.line_ChartData.dataTable = result, err => console.log(err));
    }

    public getAllBedsInfo(){
        this.line_ChartData = Object.create(this.line_ChartData);
        this.adminService.getGraphData()
            .subscribe(result => this.line_ChartData.dataTable = result, err => console.log(err));
    }
}