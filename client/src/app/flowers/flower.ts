export class Flower {
    id: string;
    // plantID: string;
    // plantType: string;
    commonName: string;
    cultivar: string;
    // source: string;
    gardenLocation: string;
    // year: number;
    // pageURL: string;
    // plantImageURLs: string[];
    // recognitions: string[];

    constructor (id: string, commonName: string, cultivar: string, gardenLocation: string) {
        this.id=id;
        // this.plantID="";
        // this.plantType="";
        this.commonName= commonName;
        this.cultivar=cultivar;
        // this.source="";
        this.gardenLocation=gardenLocation;
        // this.year=1987;
        // this.pageURL="";
        // this.plantImageURLs=[];
        // this.recognitions=[];
    }
}



