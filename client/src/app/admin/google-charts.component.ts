import {Component, OnInit} from '@angular/core';
import {AdminService} from "./admin.service";
import {Plant} from "../garden/plants/plant";

@Component({
    selector: 'google-charts.component',
    templateUrl: 'google-charts.component.html'
})

// Component class
export class GraphComponent {
    private post: string;
    public bed: string;
    private uploadIds: string[];
    public locations: Plant[];
    private hasCookie: boolean;

    constructor(private adminService: AdminService) {
    }


    ngOnInit(): void {
        this.adminService.postGraphData()
            .subscribe(result => this.post = result, err => console.log(err));
        this.Bar_ChartData = Object.create(this.Bar_ChartData);
        this.adminService.getUploadIds()
            .subscribe(result => this.uploadIds = result, err => console.log(err));
        this.adminService.getGraphData()
            .subscribe(result => this.Bar_ChartData.dataTable = result, err => console.log(err));
        this.adminService.checkHasCookie()
            .subscribe(result => this.hasCookie = result, err => console.log(err));
        this.adminService.getGardenLocations()
            .subscribe(result => {
                    this.locations = result;

                }
                , err => console.log(err));

    }

    public Bar_ChartData: any = {
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
            title: 'Bed Information',
            width: 1200,
            height: 800,

        }
    };


    public updateBarChart(): void{

        this.adminService.getGraphData()
            .subscribe(result => {
                this.Bar_ChartData["dataTable"] = result;
                this.Bar_ChartData = Object.create(this.Bar_ChartData);
            }, err => console.log(err));
    }

    public updateGraph(bed: string) {
        this.adminService.getInfoForOneBed(bed)
            .subscribe(result => {
                this.Bar_ChartData["dataTable"] = result;
                this.Bar_ChartData = Object.create(this.Bar_ChartData);
            }, err => console.log(err));
    }


}