  export interface SystemEventInput {
      key:string,
      text:string,
      type:string,
      relatedEventOutput:SystemEventOutput
  }
  export interface SystemEventOutput {
      key:string,
      text:string,
      type:string
  }