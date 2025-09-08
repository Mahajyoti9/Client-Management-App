import { Time } from "@angular/common";

export class scheduleMeeting{
    id:string;
    cid:string;
    cname:string;
    date:Date;
    time:Time;
    purpose:string;
    status: "active" | "inactive" ;
}