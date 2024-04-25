import { v4 as uuidv4 } from 'uuid';
const input_events_key=uuidv4();
const output_events_key=uuidv4();
const inputs_key=uuidv4();
const outputs_key=uuidv4();
const internals_key=uuidv4();
const temp_key=uuidv4();
const project="project1";
let rlt=
  {
    project: project,
    namespace: "Light",
    folder: "",
    type: "BasicFunctionBlock",
    properties: {
      comment: "Basic Function Block Type",
      auth: {
        standard: "61499-2",
        classification: "",
        application_area: "",
        function: "",
        type: "",
        describe: "",
      },
      compile_information: [],
      version_information: [
        {
          organization: "YY Automation",
          version: "0.1",
          author: "WD",
          date: "2017-03-03",
          note: "",
        },
      ],
    },
    interface: {
      input_events: [
        {
          key: input_events_key,
          no:1,
          raw_key: "",
          text: "inputeve1",
          comment: "",
          type: 1
        },
      ],
      output_events: [
        {
          key: output_events_key,
          no:1,
          raw_key: "",
          text: "outeve1",
          comment: "",
          type: "EVENT",
        },
      ],
      inputs: [
        {
          key: inputs_key,
          no:1,
          text: "inputvari1",
          comment: "",
          type: "DINT",
          initVals: "",
          max: "",
          min: "",
          step: "",
          arrayLength: "1",
        }
      ],
      outputs: [
        {
          key: outputs_key,
          no:1,
          text: "outputvari1",
          comment: "",
          type: "DINT",
          initVals: "",
          max: "",
          min: "",
          step: "",
          arrayLength: "1",
        }
      ],
      internals: [
        {
          key: internals_key,
          no:1,
          text: "internal1",
          comment: "",
          type: "DINT",
          initVals: "",
          max: "",
          min: "",
          step: "",
          arrayLength: "1",
        }
      ],
      temps: [
        {
          key: temp_key,
          no:1,
          text: "temp1",
          comment: "",
          type: "DINT",
          initVals: "",
          max: "",
          min: "",
          step: "",
          arrayLength: "1",
        },
      ],
    },
    ecc: {
      linkDataArray: [
        {
          from: "3",
          to: "1",
          event_condition: "1",
          priority: 1,
          guard_condition: "",
          comment: "",
        },
        {
          from: "1",
          to: "3",
          event_condition: "12e4d89f-1711-4ba6-a21d-c5a2cebb2547",
          priority: 1,
          guard_condition: "",
          comment: "",
        },
      ],
      nodeDataArray: [
        {
          key: "1",
          text: "START",
          comment: "",
          loc: "-184 -33.999969482421875",
        },
        {
          key: "3",
          text: "INIT",
          comment: "",
          table: [
            {
              algorithm: "cafe10f0-951a-4c24-b5bf-15d7b78cf4a2",
              output_event: "cd5a4d2e-d47b-44f4-996c-5f66dfe5d508",
            },
          ],
          loc: "-219 205.99996948242188",
        },
      ],
    },
    panel: {
      children: null,
      data: {
        graph: null,
        paper: null,
      },
    },
    html: {
      data: "",
      children: null,
    },
    algorithms: [
      {
        key: "cafe10f0-951a-4c24-b5bf-15d7b78cf4a2",
        text: "INIT",
        comment: "",
        content:
            "Mode_O := SF4_ALM;\r\nSF4_ALM := 0;\r\nTUNE_O := TUNE_OPCUA;\r\nTUNE_OPCUA := 0;",
        type: "ST",
        lines: [
          {
            branches: [
              {
                comps: [],
              },
            ],
            comment: "",
          },
        ],
      },
    ],
    dynamic: false,
    lock: false,
    updated_time: 1710213247000,
    id:''
  };
let rltArr=new Array();
export const getInitData=(project:string,module:string)=>{
    rlt.id=module;
    return rlt;
}
export const getInitArr=(project:string,module:string)=>{
  rlt.id=module;
  rltArr.push(rlt)
  return rltArr;
}