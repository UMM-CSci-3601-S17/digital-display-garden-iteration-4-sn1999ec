/**
 * Created by saliy002 on 4/10/17.
 */

export class PlantFeedback{
    commentCount:number;
     likeCount:number;
     dislikeCount:number;
    plantrefresh: string;

    constructor(){
        this.commentCount = 0;
        this.likeCount = 0;
        this.dislikeCount = 0;
        this.plantrefresh = "";
    }
}