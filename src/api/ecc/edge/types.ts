export interface EdgeForm {
    from:string,
    to:string
    key:string,
    text:string,
    priority:string;
    event_condition:{ id: string; name: string };
    guard_condition:string,
    comment:string
}

export interface EdgeQuery extends PageQuery {
    name: string;
}
export interface EdgeVO extends BaseEntity {
    from:string,
    to:string
    key:string,
    text:string,
    priority:string;
    event_condition:{ id: string; name: string };
    guard_condition:string,
    comment:string
    relateEveName:string
}
