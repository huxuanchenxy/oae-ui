// import {info} from './deployment_card'
const info = {
    "Name": "FBSRT_ARMHF_LUNIX",//AB_COMPACTLOGIX
    "Namespace": "RockwellAutomation",
    "Icon": "AB_COMPACTLOGIX.png",
    "Color": "#4CAF50",
    "Type": "device",//target_device
    "User": "admin",
    "ID": "fd1586cf-6126-4938-a681-3dfbdfb2727d",
    "Category": "1",
    "Origin": "true",
    "Comment": "",
    "Identification": "",
    "VersionInfo": {
        "Organization": "YYAUTO",
        "Version": "1",
        "Author": "WD",
        "Date": "2008-01-01",
        "Remarks": ""
    },
    "VarDeclaration": [{
        "Name": "Address",
        "DisplayName": '字符串',
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "",
        "Option": "",
        "Enabled": "1",
        "VarType": "",
        "Comment": "Address"
    },
    {
        "Name": "Path",
        "DisplayName": '数字',
        "Type": "DINT",//"WSTRING"
        "ArraySize": "1",
        "InitialValue": "",
        "Option": "",
        "Enabled": "1",
        "VarType": "",
        "Comment": ""
    },
    {
        "Name": "Slot",
        "DisplayName": '下拉',//'槽号'
        "Type": "DINT",
        "ArraySize": "1",
        "InitialValue": "",
        "Option": "1200:1200,2400:2400,4800:4800",//,9600,14400,19200,38400,57600,115200,230400,460800,921600
        "Enabled": "1",
        "VarType": "",
        "Comment": ""
    },
    {
        "Name": "TargetDeviceType",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "",
        "Option": "",
        "Enabled": "0",
        "VarType": "",
        "Comment": ""
    }],
    "ResourceTypeName": {
        "Name": "DataTable",
        "VarDeclaration": [{
            "Name": "Address",
            "DisplayName": "地址",
            "Type": "STRING",
            "ArraySize": "",
            "InitialValue": "",
            "Option": "1:1,2:2",
            "Enabled": "1",
            "VarType": "",
            "Comment": ""
        },
        {
            "Name": "Type",
            "DisplayName": "类型",
            "Type": "STRING",
            "ArraySize": "",
            "InitialValue": "",
            "Option": "",
            "Enabled": "1",
            "VarType": "",
            "Comment": "Input/Output/InOut"
        },
        {
            "Name": "DataType",
            "DisplayName": "数据类型",
            "Type": "STRING",
            "ArraySize": "",
            "InitialValue": "",
            "Option": "",
            "Enabled": "1",
            "VarType": "",
            "Comment": "SINT/INT/DINT/LINT/USINT/UINT/UDINT/ULINT/BOOL/REAL/LREAL/WSTRING/UDT"
        },
        {
            "Name": "Arraysize",
            "DisplayName": "数组长度",
            "Type": "DINT",
            "ArraySize": "",
            "InitialValue": "",
            "Option": "",
            "Enabled": "1",
            "VarType": "",
            "Comment": ""
        },
        {
            "Name": "VariableName",
            "DisplayName": "变量名",
            "Type": "STRING",
            "ArraySize": "1",
            "InitialValue": "",
            "Option": "",
            "Enabled": "1",
            "VarType": "",
            "Comment": ""
        },
        {
            "Name": "Comment",
            "DisplayName": "描述",
            "Type": "STRING",
            "ArraySize": "1",
            "InitialValue": "",
            "Option": "",
            "Enabled": "1",
            "VarType": "",
            "Comment": ""
        }]
    },
    "ModuleTypeName": ""
}
const devices = [
    {
        label: '网络段',
        icon: '',
        children: [
            {
                label: 'Fieldbus',
                icon: '',
                children: [
                    {label: 'CAN_IO', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'CANBUS', cardType: 'net_canbus',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'ETHERCAT', cardType: 'net_ethercat',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'MODBUS_RTU', cardType: 'net_normal',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'MODBUS_TCP', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'UART', cardType: 'net_uart',icon: '',type:'Seg',info: info,children:[]},
                ]
            },{
                label: 'PLCComm',
                icon: '',
                children: [
                    {label: 'CIP', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'S7COMM', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]}
                ]
            },{
                label: 'Generic',
                icon: '',
                children: [
                    {label: 'ETHERNET', cardType: 'net_easy',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'TSN', cardType: 'net_easy',icon: '',type:'Seg',info: info,children:[]}
                ]
            },{
                label: 'WebProtocol',
                icon: '',
                children: [
                    {label: 'HTTP_GET', cardType: 'net_http',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'HTTP_POST', cardType: 'net_http',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'HTTP_REST', cardType: 'net_http',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'MQTT_CLIENT', cardType: 'net_mqtt',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'TCP_CLIENT', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'UDP_CLIENT', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'WS_CLIENT', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]}
                ]
            },{
                label: 'OPC',
                icon: '',
                children: [
                    {label: 'OPC_DA_CLIENT', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]},
                    {label: 'OPC_UA_CLIENT', cardType: 'net_easy1',icon: '',type:'Seg',info: info,children:[]}
                ]
            }
        ]
    },{
        label: '控制器',
        icon: '',
        children: [
            {
                label: 'MatriBox',
                icon: '',
                children: [
                    {label: 'MATRIBOX', cardType: 'controller_normal',icon: 'MATRIBOX.png',type:'Dev',info: info,children:[]}
                ]
            },
            {
                label: 'SoftRuntime',
                icon: '',
                children: [
                    {label: 'FBSRT_AARCH64_LINUX', cardType: 'controller_easy',icon: 'ipc_linux.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_ARMHF_LINUX', cardType: 'controller_easy',icon: 'ipc_linux.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_ARMSF_LINUX', cardType: 'controller_easy',icon: 'ipc_linux.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_WIN32', cardType: 'controller_easy',icon: 'ipc_win.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_X64_LINUX', cardType: 'controller_easy',icon: 'ipc_linux.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_X86_LINUX', cardType: 'controller_easy',icon: 'ipc_linux.png',type:'Dev',info: info,children:[]},
                    {label: 'FBSRT_X86_QNX650', cardType: 'controller_easy',icon: 'ipc_qnx.png',type:'Dev',info: info,children:[]}
                ]
            },{
                label: 'Huawei',
                icon: '',
                children: [
                    {label: 'FUSIONCUBE_500', cardType: 'controller_easy',icon: 'FUSIONCUBE_500.png',type:'Dev',info: info,children:[]}
                ]
            },{
                label: 'RasberryPi',
                icon: '',
                children: [
                    {label: 'RASPBERRY_PI3', cardType: 'controller_easy',icon: 'RASPBERRY_PI3.png',type:'Dev',info: info,children:[]},
                    {label: 'RASPBERRY_PI4', cardType: 'controller_easy',icon: 'RASPBERRY_PI4.png',type:'Dev',info: info,children:[]}
                ]
            },{
                label: 'Npc',
                icon: '',
                children: [
                    {label: 'NPC', cardType: 'controller_normal',icon: 'NPC.png',type:'Dev',info: info,children:[]}
                ]
            },{
                label: 'ODOT',
                icon: '',
                children: [
                    {label: 'ODOT_EVOLINK', cardType: 'controller_normal',icon: 'EVOLINK.jpg',type:'Dev',info: info,children:[]}
                ]
            }
        ]
    },{
        label: '现场设备',
        icon: '',
        children: [
            {
                label: 'RockwellAutomation',
                icon: '',
                children: [
                    {label: 'AB_COMPACTLOGIX', cardType: 'device_rockwell1',icon: 'AB_COMPACTLOGIX.png',type:'Tar',info: info,children:[]},
                    {label: 'AB_CONTROLLOGIX', cardType: 'device_rockwell1',icon: 'AB_CONTROLLOGIX.png',type:'Tar',info: info,children:[]},
                    {label: 'AB_MICROLOGIX', cardType: 'device_rockwell2',icon: 'AB_MICROLOGIX.png',type:'Tar',info: info,children:[]}
                ]
            },{
                label: 'GenericDevice',
                icon: '',
                children: [
                    {label: 'CLOUD_DEVICE', cardType: 'device_easy',icon: 'CLOUD_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'ETHERCAT_IO', cardType: 'device_ethercat',icon: 'ETHERCAT_IO.png',type:'Tar',info: info,children:[]},
                    {label: 'HTTPSERVER_DEVICE', cardType: 'device_http',icon: 'SOCKSERVER_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'MODBUSRTU_IO', cardType: 'device_modbus_rtu',icon: 'MODBUSRTU_IO.png',type:'Tar',info: info,children:[]},
                    {label: 'MODBUSTCP_IO', cardType: 'device_modbus_tcp',icon: 'MODBUSTCP_IO.png',type:'Tar',info: info,children:[]},
                    {label: 'MQTTSERVER_DEVICE', cardType: 'device_mqtt',icon: 'SOCKSERVER_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'OPC_DA_SERVER', cardType: 'device_opc',icon: 'OPCDAServer.png',type:'Tar',info: info,children:[]},
                    {label: 'OPC_UA_SERVER', cardType: 'device_opc',icon: 'OPCUAServer.png',type:'Tar',info: info,children:[]},
                    {label: 'REMOTE_DEVICE', cardType: 'device_easy',icon: 'REMOTE_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'SOCKSERVER_DEVICE', cardType: 'device_socket',icon: 'SOCKSERVER_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'WEBSOCKSERVER_DEVICE', cardType: 'device_websocket',icon: 'SOCKSERVER_DEVICE.png',type:'Tar',info: info,children:[]},
                    {label: 'SERIAL_DEVICE', cardType: 'device_easy1',icon: 'MODBUSRTU_IO.png',type:'Tar',info: info,children:[]},
                    {label: 'CANBUS_IO', cardType: 'device_easy1',icon: 'MODBUSRTU_IO.png',type:'Tar',info: info,children:[]}
                ]
            },{
                label: 'Siemens',
                icon: '',
                children: [
                    {label: 'SIEMENS_S71200', cardType: 'device_siemens',icon: 'SIEMENS_S71200.png',type:'Tar',info: info,children:[]},
                    {label: 'SIEMENS_S71500', cardType: 'device_siemens',icon: 'SIEMENS_S71500.png',type:'Tar',info: info,children:[]},
                    {label: 'SIEMENS_S7200', cardType: 'device_siemens',icon: 'SIEMENS_S7200.png',type:'Tar',info: info,children:[]},
                    {label: 'SIEMENS_S7300', cardType: 'device_siemens',icon: 'SIEMENS_S7300.png',type:'Tar',info: info,children:[]},
                    {label: 'SIEMENS_S7400', cardType: 'device_siemens',icon: 'SIEMENS_S7400.png',type:'Tar',info: info,children:[]}
                ]
            },{
                label: 'MatriBox',
                icon: '',
                children: [
                    {label: 'MATRIBOX_IO', cardType: 'device_matriBox',icon: 'MATRIBOX_IO.png',type:'Tar',info: info,children:[]}
                ]
            },{
                label: 'HUAWEI',
                icon: '',
                children: [
                    {label: 'S5735I-H TSN', cardType: 'device_huawei',icon: 'TSN.png',type:'Tar',info: info,children:[]},
                ]
            }
        ]
    }
]
const emsRes = {
    "Name": "EMB_RES",
    "User": "admin",
    "Limit": "0",
    "ID": "4dce59a169d548bbb67b7a20db29e059",
    "VersionInfo": {
    "Organization": "YYAUTO",
    "Version": "1",
    "Author": "WD",
    "Date": "20080101"
    },
    "VarDeclaration": [
    // {
    //     "Name": "Name",
    //     "Type": "WSTRING",
    //     "ArraySize": "1",
    //     "Enabled": "1",
    //     "Comment": "resource name"
    // },
    // {
    //     "Name": "Type",
    //     "Type": "WSTRING",
    //     "ArraySize": "1",
    //     "Enabled": "1",
    //     "Comment": "resource type"
    // },
    {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "number of threads"
    },
    {
        "Name": "Color",
        "DisplayName": "颜色",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "#009688",
        "Enabled": "1",
        "Comment": "resource color"
    }
    ],
    "ResourceTypeName": {}
}
const modbusRTU = {
  "Name": "MODBUSRTU_RES",
  "User": "admin",
  "Limit": "1",
  "ID": "a2fde9da41114267b0edc54d73b2c2b4",
  "VersionInfo": {
    "Organization": "YYAUTO",
    "Version": "1",
    "Author": "WD",
    "Date": "20080101"
  },
  "VarDeclaration": [
    {
      "Name": "StartBit",
      "DisplayName": "起始位",
      "Type": "UINT",
      "ArraySize": "1",
      "InitialValue": "0",
      "Option": "0:0,1:1",
      "Enabled": "1",
      "Comment": "starting position"
    },
    {
      "Name": "SlaveID",
      "DisplayName": "从站号",
      "Type": "WSTRING",
      "ArraySize": "1",
      "InitialValue": "1",
      "Enabled": "1",
      "Comment": "slave station"
    },
    {
      "Name": "Baudrate",
      "DisplayName": "波特率",
      "Type": "UINT",
      "ArraySize": "1",
      "Option": "1200:1200,2400:2400,4800:4800,9600:9600,14400:14400,19200:19200,38400:38400,57600:57600,115200:115200,230400:230400,460800:460800,921600:921600",
      "Enabled": "1"
    },
    {
      "Name": "Parity",
      "DisplayName": "校验位",
      "Type": "WSTRING",
      "ArraySize": "1",
      "Option": "O:O,N:N,E:E",
      "Enabled": "1"
    },
    {
      "Name": "Databit",
      "DisplayName": "数据位长度",
      "Type": "UINT",
      "ArraySize": "1",
      "Option": "5:5,6:6,7:7,8:8",
      "Enabled": "1"
    },
    {
      "Name": "Stopbit",
      "DisplayName": "停止位长度",
      "Type": "UINT",
      "ArraySize": "1",
      "Option": "0:0,1:1",
      "Enabled": "1",
      "Comment": "resource name"
    },
    {
      "Name": "AI",
      "DisplayName": "AI范围(1~9999)",
      "Type": "UINT",
      "ArraySize": "1",
      "InitialValue": "10",
      "Enabled": "1",
      "Comment": "ranges(1~9999)"
    },
    {
      "Name": "AO",
      "DisplayName": "AO范围(1~9999)",
      "Type": "UINT",
      "ArraySize": "1",
      "InitialValue": "10",
      "Enabled": "1",
      "Comment": "ranges(1~9999)"
    },
    {
      "Name": "DI",
      "DisplayName": "DI范围(1~9999)",
      "Type": "UINT",
      "ArraySize": "1",
      "InitialValue": "10",
      "Enabled": "1",
      "Comment": "ranges(1~9999)"
    },
    {
      "Name": "DO",
      "DisplayName": "DO范围(1~9999)",
      "Type": "UINT",
      "ArraySize": "1",
      "InitialValue": "10",
      "Enabled": "1",
      "Comment": "ranges(1~9999)"
    }
  ],
  "ResourceTypeName": {
    "Name": "DataTable",
    "DisplayName": "配置变量",
    "VarDeclaration": [
      {
        "Name": "MapName",
        "Type": "WSTRING",
        "ArraySize": "1",
        "Enabled": "1",
        "Comment": "name"
      },
      {
        "Name": "Type",
        "Type": "WSTRING",
        "ArraySize": "1",
        "Option": "DI:DI,DO:DO,AI:AI,AO:AO",
        "Enabled": "1",
        "Comment": "type"
      },
      {
        "Name": "MapVariable",
        "Type": "WSTRING",
        "ArraySize": "1",
        "Enabled": "1",
        "Comment": "var"
      },
      {
        "Name": "Address",
        "Type": "WSTRING",
        "ArraySize": "1",
        "Enabled": "1",
        "Comment": "adress"
      }
    ]
  }
}
const backRes = {
    "Name": "BACK_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "722de0901ae044aeaff9741750f3ab7a",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "备份设置",
      "VarDeclaration": [
        {
          "Name": "Host",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "host resource name"
        },
        {
          "Name": "Back",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "backup resource name"
        },
        {
          "Name": "HeartBeat",
          "Type": "UDINT",
          "ArraySize": "1",
          "InitialValue": "100",
          "Enabled": "1",
          "Comment": "heartbeat time(ms)"
        }
      ]
    }
  }
const batchRes = {
    "Name": "BATCH_RES",
    "User": "admin",
    "ID": "59e63bbb8ebb44db96c15548981d6950",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Timeout",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable"
    }
  }
const dataRes = {
    "Name": "DATA_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "1cdc004c934d4462a357b69f4f0f3a03",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新周期(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "250",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "HoldValue",
        "DisplayName": "断电保护数据",
        "Type": "BOOL",
        "ArraySize": "1",
        "InitialValue": "false",
        "Option": "true:true,false:false",
        "Enabled": "1",
        "Comment": "whether to keep data when power is off"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "数据表",
      "VarDeclaration": [
        {
          "Name": "Name",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "datatable field name"
        },
        {
          "Name": "Type",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Option": "INTEGER:INTEGER,TEXT:TEXT,BLOB:BLOB,REAL:REAL,NUMERIC:NUMERIC",
          "Enabled": "1",
          "Comment": "datatable field datatype"
        },
        {
          "Name": "NN",
          "Type": "BOOL",
          "ArraySize": "1",
          "Option": "true:true,false:false",
          "Enabled": "1",
          "Comment": "NOT NULL"
        },
        {
          "Name": "PK",
          "Type": "BOOL",
          "ArraySize": "1",
          "Option": "true:true,false:false",
          "Enabled": "1",
          "Comment": "PRIMARY KEY"
        },
        {
          "Name": "AI",
          "Type": "BOOL",
          "ArraySize": "1",
          "Option": "true:true,false:false",
          "Enabled": "1",
          "Comment": "AUTO_INCREMENT"
        },
        {
          "Name": "U",
          "Type": "BOOL",
          "ArraySize": "1",
          "Option": "true:true,false:false",
          "Enabled": "1",
          "Comment": "UNIQUE"
        }
      ]
    }
  }
const hmiRes = {
    "Name": "HMI_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "46eb0b5daa86468c9b5a6dd67a811479",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新时间(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "权限表",
      "VarDeclaration": [
        {
          "Name": "Username",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1"
        },
        {
          "Name": "Password",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1"
        },
        {
          "Name": "Role",
          "Type": "UINT",
          "ArraySize": "1",
          "Option": "1:系统管理员,2:工艺管理,3:操作员",
          "Enabled": "1",
          "Comment": "1:系统管理员; 2: 工艺管理; 3:操作员"
        }
      ]
    }
  }
const httpRes = {
    "Name": "HTTP_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "2b3e41dd0b72404496b6029349e85a0b",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "DisplayName": "名称",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "DisplayName": "类型",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新周期(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "接口表",
      "VarDeclaration": [
        {
          "Name": "Name",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "api name"
        },
        {
          "Name": "Type",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Option": "GET:GET,POST:POST",
          "Enabled": "1",
          "Comment": "api type"
        },
        {
          "Name": "Request",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "request"
        },
        {
          "Name": "Response",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "response"
        }
      ]
    }
  }
const mgtRes = {
    "Name": "MGT_RES",
    "User": "admin",
    "ID": "3409878eea104b698e9596a62fd3f413",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable"
    }
  }
const modbusTCP = {
    "Name": "MODBUSTCP_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "86f6c7aad0c34c42aeefffef5bda2837",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "StartBit",
        "DisplayName": "起始位",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "0",
        "Option": "0:0,1:1",
        "Enabled": "1",
        "Comment": "starting position"
      },
      {
        "Name": "SlaveID",
        "DisplayName": "从站号",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "slave station"
      },
      {
        "Name": "AI",
        "DisplayName": "AI范围(1~9999)",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "10",
        "Enabled": "1",
        "Comment": "ranges(1~9999)"
      },
      {
        "Name": "AO",
        "DisplayName": "AO范围(1~9999)",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "10",
        "Enabled": "1",
        "Comment": "ranges(1~9999)"
      },
      {
        "Name": "DI",
        "DisplayName": "DI范围(1~9999)",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "10",
        "Enabled": "1",
        "Comment": "ranges(1~9999)"
      },
      {
        "Name": "DO",
        "DisplayName": "DO范围(1~9999)",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "10",
        "Enabled": "1",
        "Comment": "ranges(1~9999)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "配置变量",
      "VarDeclaration": [
        {
          "Name": "MapName",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "name"
        },
        {
          "Name": "Type",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Option": "DI:DI,DO:DO,AI:AI,AO:AO",
          "Enabled": "1",
          "Comment": "type"
        },
        {
          "Name": "MapVariable",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "var"
        },
        {
          "Name": "Address",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "adress"
        }
      ]
    }
  }
const mqttRes = {
    "Name": "MQTT_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "134831f72b944ea39383b59745099bf1",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新周期(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable"
    }
  }
const opcUARes = {
    "Name": "OPCUA_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "aa10ee1ab2374918987681b57bcfdd4c",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新周期(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable",
      "DisplayName": "数据接口设置",
      "VarDeclaration": [
        {
          "Name": "Name",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "node name"
        },
        {
          "Name": "Resource",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "resource name"
        },
        {
          "Name": "Application",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "application name"
        },
        {
          "Name": "FB",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "fb name"
        },
        {
          "Name": "Variable",
          "Type": "WSTRING",
          "ArraySize": "1",
          "Enabled": "1",
          "Comment": "var name"
        },
        {
          "Name": "Access",
          "Type": "UINT",
          "ArraySize": "1",
          "InitialValue": "0",
          "Option": "0:关闭,1:只读,2:可读可写",
          "Enabled": "1",
          "Comment": "0:close; 1:read;2:read/write"
        }
      ]
    }
  }
const tcpRes = {
    "Name": "TCP_RES",
    "User": "admin",
    "Limit": "1",
    "ID": "4266497bd6d44b6fabb334b9bc81d256",
    "VersionInfo": {
      "Organization": "YYAUTO",
      "Version": "1",
      "Author": "WD",
      "Date": "20080101"
    },
    "VarDeclaration": [
      // {
      //   "Name": "Name",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource name"
      // },
      // {
      //   "Name": "Type",
      //   "Type": "WSTRING",
      //   "ArraySize": "1",
      //   "Enabled": "1",
      //   "Comment": "resource type"
      // },
      {
        "Name": "Port",
        "DisplayName": "端口号",
        "Type": "UINT",
        "ArraySize": "1",
        "InitialValue": "1",
        "Enabled": "1",
        "Comment": "resource port"
      },
      {
        "Name": "Timeout",
        "DisplayName": "刷新周期(ms)",
        "Type": "UDINT",
        "ArraySize": "1",
        "InitialValue": "500",
        "Enabled": "1",
        "Comment": "refresh cycle(ms)"
      },
      {
        "Name": "Address",
        "DisplayName": "IP地址",
        "Type": "WSTRING",
        "ArraySize": "1",
        "InitialValue": "127.0.0.1",
        "Enabled": "1"
      }
    ],
    "ResourceTypeName": {
      "Name": "DataTable"
    }
  }
const resourceList = [
    backRes,
    dataRes,
    emsRes,
    hmiRes,
    opcUARes,
    // batchRes,
    modbusTCP,
    modbusRTU,
    httpRes,
    // mgtRes,
    mqttRes,
    tcpRes
];

export {
    devices,
    resourceList
}