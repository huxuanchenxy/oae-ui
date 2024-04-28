import {Alg} from "@/api/ecc/algandevent/types";


export interface AlgAndEventQuery extends PageQuery {
    name: string;
}
export interface AlgAndEventForm {
    key:string,
    algorithm:{ id: string; name: string };
    output_event:{ id: string; name: string };
}
export interface AlgAndEventVO extends BaseEntity {
    key:string,
    algorithm:{ id: string; name: string };
    output_event:{ id: string; name: string };
}
