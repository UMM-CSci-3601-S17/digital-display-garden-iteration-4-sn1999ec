/**
 * Created by saliy002 on 4/9/17.
 */
/**
 * Created by holma198 on 3/7/17.
 */
// if having issues running this push, click on terminal and type in these commands
// $ npm install @angular/forms --save
// and the dependencies required
// more at https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol


export class plantFeedback {
    comment: string;

    likeCount:number;
    dislikeCount:number;

    constructor(){
        this.likeCount  = 0;
        this.dislikeCount = 0;
    }


}