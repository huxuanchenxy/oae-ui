export interface AlgAndEventForm {
    key:string,
    comment:string
}

export interface AlgAndEventQuery extends PageQuery {
    comment: string;
}
export interface AlgAndEventVO extends BaseEntity {
    key:string,
    comment:string
}
