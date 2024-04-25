export interface EdgeForm {
    key:string,
    text:string,
    algorithm:{ id: string; name: string };
    output_event:{ id: string; name: string };
    comment:string
}

export interface EdgeQuery extends PageQuery {
    name: string;
}
export interface EdgeVO extends BaseEntity {
    key:string,
    text:string,
    algorithm:{ id: string; name: string };
    output_event:{ id: string; name: string };
    comment:string
    eventName:string
    algName:string
}
