export interface CardInfo {
    buttonLabel:string
    buttonText:string,
    items:CardInfo_item[],
    largeType:string,
    name:string,
    nameVal:string,
    nodeId:string,
    typeDisplayVal:string,
    typeName:string,
    typeVal:string,
    dynamic:CardInfo_dynamic[]
}
interface CardInfo_item {
    attrName:string
    displayName:string,
    options:string,
    value:string,
    valueRule:string
}
interface CardInfo_dynamic {
    nodeId:string,
    id:string,
    type:string,
    name:string,
    ioType:string,
    address:string,
    len:number,
    isGroup:number,
    isIndeVari:number,
    comment:string
}