import {Alg} from "@/api/ecc/algandevent/types";
import {AlgSimple} from "@/api/alg/types";
import {Eve} from "@/api/inter/event/types";


export interface AlgAndEventQuery extends PageQuery {
    name: string;
}
export interface AlgAndEventForm {
    id:string,
    alg:AlgSimple
    event:Eve,
}
export interface AlgAndEventVO extends BaseEntity {
    key:string,
    alg:AlgSimple
    event:Eve
}