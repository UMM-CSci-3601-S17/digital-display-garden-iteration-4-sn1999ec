import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class SheetListService   {
    constructor(private http:Http)  { }
    private ImportUrl: string = API_URL + "importData";

}