/**
 * Created by saliy002 on 4/9/17.
 */
export class Plant {
    _id: string;
    id: string;
    plantType: string;
    commonName: string;
    cultivar: string;
     source: string;
    gardenLocation: string;
    year: number;
    pageURL: string;
    plantImageURLs: string[];
    recognitions: string[];

    constructor () {
        this._id="";
        this.id="x";
        this.plantType="";
        this.commonName="";
        this.cultivar="";
        this.source="";
        this.gardenLocation="";
        this.year=1987;
        this.pageURL="";
        this.plantImageURLs=[];
        this.recognitions=[];
    }
}



