export interface EdgeForm {
    key:string,
    text:string,
    priority:string;
    relatedEvents:{ id: string; name: string };
    condition:string,
    comment:string
}

export interface EdgeQuery extends PageQuery {
    name: string;
}
export interface EdgeVO extends BaseEntity {
    key:string,
    text:string,
    priority:string;
    relatedEvents:{ id: string; name: string };
    condition:string,
    comment:string
    relateEveName:string
}
