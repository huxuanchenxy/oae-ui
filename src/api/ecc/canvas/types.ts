export interface CanvasForm {
    key:string,
    comment:string
}

export interface CanvasQuery extends PageQuery {
    comment: string;
}
export interface CanvasVO extends BaseEntity {
    key:string,
    comment:string
}
