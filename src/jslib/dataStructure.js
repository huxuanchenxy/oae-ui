// 根据交大提供的数据结构，目前暂时只考虑满足st、cpp语言
const algorithmDS = {
    "key": "",
    "text": "",
    "comment": "",
    "content": "",
    "type": "",
    "lines": [{
        "branches": [{
            "comps": []
        }],
        "comment": ""
    }]
};
const controllerDS = {
    "name": "PROJECT_F5",
    "namespace": "US_TEST",
    "folder": "",
    "type": "SystemConfiguration",
    "properties": {
        "comment": "System Function Block Type",
        "auth": {
            "standard": "61499-2",
            "classification": "",
            "application_area": "",
            "function": "",
            "type": "",
            "describe": ""
        },
        "version_information": [
            {
                "organization": "YY Automation",
                "version": "0.1",
                "author": "WD",
                "date": "2017-03-03",
                "note": ""
            }
        ]
    },
    "panel": {
        "children": null,
        "data": {
            "graph": null,
            "paper": null
        }
    },
    "html": {
        "data": "",
        "children": null
    },
    "deployment": {
        "devices": [
            {
                "src": "devices/ipc_linux.png",
                "dev_type": "FBSRT_ARMHF_LINUX",
                "loc": "-869.4371106441264 -764.4732314491624",
                "key": "c1a734c4-d10f-4092-801e-257cc9c41bd6",
                "text": "5F",
                "ip": "10.89.44.200",
                "stream": "8081",
                "resources": [
                    {
                        "key": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                        "text": "RES1",
                        "type": "EMB_RES",
                        "port": "1",
                        "color": "#009688",
                        "thread": "1",
                        "cycle": "",
                        "priority": 0,
                        "timeout": "",
                        "powerOffHoldData": null,
                        "databases": [],
                        "roles": null,
                        "config": null,
                        "order": null,
                        "slaveID": "",
                        "vars": null
                    },
                    {
                        "key": "4b4b95eb-6707-4037-999e-6277a6431708",
                        "text": "RES2",
                        "type": "HMI_RES",
                        "port": "8080",
                        "color": "#009688",
                        "thread": "",
                        "cycle": "500",
                        "priority": 0,
                        "timeout": "",
                        "powerOffHoldData": null,
                        "databases": [],
                        "roles": null,
                        "config": null,
                        "order": null,
                        "slaveID": "",
                        "vars": null
                    },
                    {
                        "key": "7d4724b2-a360-4f4f-854a-9bdc8676d133",
                        "text": "RES3",
                        "type": "DATA_RES",
                        "port": "8082",
                        "color": "#009688",
                        "thread": "",
                        "cycle": "250",
                        "priority": 0,
                        "timeout": "",
                        "powerOffHoldData": null,
                        "databases": [],
                        "roles": null,
                        "config": null,
                        "order": null,
                        "slaveID": "",
                        "vars": null
                    },
                    {
                        "key": "8bfab1af-5ba2-448f-92e6-b39ecd576c3a",
                        "text": "RES4",
                        "type": "OPCUA_RES",
                        "port": "4840",
                        "color": "#009688",
                        "thread": "",
                        "cycle": "500",
                        "priority": 0,
                        "timeout": "",
                        "powerOffHoldData": null,
                        "databases": [],
                        "roles": null,
                        "config": null,
                        "order": null,
                        "slaveID": "",
                        "vars": null
                    }
                ],
                "adapter": "",
                "device_type": "",
                "rack": "",
                "slot": "",
                "slaveID": "",
                "srcPort": "",
                "mode": "",
                "progID": "",
                "contentType": "",
                "topic": "",
                "username": "",
                "password": "",
                "path": "",
                "startBit": "",
                "dynamic": [],
                "module": [],
                "io_resource": ""
            }
        ],
        "target_devices": [
            {
                "src": "devices/MODBUSRTU_IO.png",
                "loc": "-446.7980057860991 -345.3581191398797",
                "key": "cfebb26b-0100-468b-83c0-ca0b12fd05ae",
                "text": "ENV_1",
                "ip": "",
                "target_dev_type": "MODBUSRTU_IO",
                "adapter": "",
                "device_type": "",
                "rack": "",
                "slot": "",
                "slaveID": "1",
                "srcPort": "",
                "mode": "",
                "progID": "",
                "contentType": "",
                "topic": "",
                "username": "",
                "password": "",
                "path": "",
                "startBit": "1",
                "dynamic": [
                    {
                        "Address": "40001",
                        "Arraysize": "13",
                        "Comment": "",
                        "Group": "",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "ENV_1",
                        "key": "fd671ce1-b0b5-4bba-8f41-28c7374889de"
                    }
                ],
                "module": [],
                "io_resource": ""
            },
            {
                "src": "devices/MODBUSRTU_IO.png",
                "loc": "-226.17516924909955 -332.82880572027284",
                "key": "d0c3594c-f9b5-45c8-ade9-2a1b63dd4596",
                "text": "ENV_2",
                "ip": "",
                "target_dev_type": "MODBUSRTU_IO",
                "adapter": "",
                "device_type": "",
                "rack": "",
                "slot": "",
                "slaveID": "3",
                "srcPort": "",
                "mode": "",
                "progID": "",
                "contentType": "",
                "topic": "",
                "username": "",
                "password": "",
                "path": "",
                "startBit": "1",
                "dynamic": [
                    {
                        "Address": "40001",
                        "Arraysize": "13",
                        "Comment": "",
                        "Group": "",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "ENV_2",
                        "key": "83dd6579-c24f-4310-8a20-449d4fdab0ab"
                    }
                ],
                "module": [],
                "io_resource": ""
            },
            {
                "src": "devices/MODBUSRTU_IO.png",
                "loc": "84.93153847702979 -312.1701539354427",
                "key": "59716556-2822-406e-8880-0ccbb28e98ea",
                "text": "ENV_3",
                "ip": "",
                "target_dev_type": "MODBUSRTU_IO",
                "adapter": "",
                "device_type": "",
                "rack": "",
                "slot": "",
                "slaveID": "12",
                "srcPort": "",
                "mode": "",
                "progID": "",
                "contentType": "",
                "topic": "",
                "username": "",
                "password": "",
                "path": "",
                "startBit": "1",
                "dynamic": [
                    {
                        "Address": "40001",
                        "Arraysize": "13",
                        "Comment": "",
                        "Group": "",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "ENV_3",
                        "key": "0c7f9735-640b-40e3-afe4-1b1dbe68eb14"
                    }
                ],
                "module": [],
                "io_resource": ""
            },
            {
                "src": "devices/MODBUSRTU_IO.png",
                "loc": "-6.8874110700134 -56.550918144439834",
                "key": "bb13b845-f989-4697-a71a-67dde94d089e",
                "text": "EM",
                "ip": "",
                "target_dev_type": "MODBUSRTU_IO",
                "adapter": "",
                "device_type": "",
                "rack": "",
                "slot": "",
                "slaveID": "2",
                "srcPort": "",
                "mode": "",
                "progID": "",
                "contentType": "",
                "topic": "",
                "username": "",
                "password": "",
                "path": "",
                "startBit": "1",
                "dynamic": [
                    {
                        "Address": "40006",
                        "Arraysize": "3",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "V",
                        "key": "6fd28060-65c7-435c-a6c8-9ae845aa19c8"
                    },
                    {
                        "Address": "40009",
                        "Arraysize": "3",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "I",
                        "key": "fd6ac15d-2138-4975-b2ff-de65226953ca"
                    },
                    {
                        "Address": "40015",
                        "Arraysize": "1",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "W",
                        "key": "4118c448-8717-4fa4-a967-0ef4881720e7"
                    },
                    {
                        "Address": "40019",
                        "Arraysize": "1",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "Q",
                        "key": "47b10114-c1a2-44ee-aaa9-841e89d68344"
                    },
                    {
                        "Address": "40024",
                        "Arraysize": "1",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "F",
                        "key": "400a0927-1030-436b-9c7f-11dfbe78057a"
                    },
                    {
                        "Address": "40026",
                        "Arraysize": "4",
                        "Comment": "",
                        "Group": "f",
                        "Operation": "READ",
                        "Type": "AO",
                        "VariableName": "E",
                        "key": "31dfb874-b0e6-4239-b3cb-742d341e0041"
                    }
                ],
                "module": [],
                "io_resource": ""
            }
        ],
        "segments": [
            {
                "category": "segment",
                "color": "#4CAF50",
                "size": "200 6",
                "type": "ETHERNET",
                "loc": "-1200.5981272332974 -737.3135758901752",
                "key": "b9a8ab10-fa23-4bd3-8d77-4ccd184d3bc9",
                "text": "Seg3",
                "timeout": "",
                "path": "",
                "username": "",
                "password": "",
                "topic": "",
                "maxretry": "",
                "ip": "",
                "port": "",
                "scan_time": "",
                "cycleTime": "",
                "serialPort": "",
                "baudrate": "",
                "parity": "",
                "databit": "",
                "stopbit": "",
                "status": "",
                "maxNode": "",
                "auto_start": false,
                "target_resources": "",
                "adapter": "",
                "inSize": "",
                "outSize": "",
                "sendInterval": "",
                "checksum": false,
                "checkReadType": "",
                "checkReadBeginIndex": "",
                "checkReadLastIndex": "",
                "checkReadInsertIndex": "",
                "checkWriteType": "",
                "checkWriteBeginIndex": "",
                "checkWriteLastIndex": "",
                "checkWriteInsertIndex": "",
                "DeviceName": "",
                "CANID": "",
                "RestartTime": "",
                "SetBaudrateMode": "",
                "CANBaudRate": "",
                "CANSamplePoint": "",
                "CANFDBaudRate": "",
                "CANFDSamplePoint": "",
                "Bittiming": "",
                "CanFDMode": "",
                "OnlySend": "",
                "ErrorFrameFilterMode": "",
                "ErrorFrameFilterMask": "",
                "NomalFrameFilterMode": "",
                "NomalFrameFilterIDMask": "",
                "readByteOrder": "",
                "writeByteOrder": ""
            },
            {
                "category": "segment",
                "color": "#4CAF50",
                "size": "200 6",
                "type": "MODBUS_RTU",
                "loc": "-476.1611812206395 -520.8389458874703",
                "key": "47f2b198-70bd-4944-96c3-a38324d99aff",
                "text": "RTU_5F",
                "timeout": "1000",
                "path": "",
                "username": "",
                "password": "",
                "topic": "",
                "maxretry": "",
                "ip": "",
                "port": "",
                "scan_time": "",
                "cycleTime": "",
                "serialPort": "/dev/ttyS3",
                "baudrate": "9600",
                "parity": "N",
                "databit": "8",
                "stopbit": "1",
                "status": "",
                "maxNode": "",
                "auto_start": false,
                "target_resources": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                "adapter": "",
                "inSize": "",
                "outSize": "",
                "sendInterval": "1000",
                "checksum": false,
                "checkReadType": "",
                "checkReadBeginIndex": "",
                "checkReadLastIndex": "",
                "checkReadInsertIndex": "",
                "checkWriteType": "",
                "checkWriteBeginIndex": "",
                "checkWriteLastIndex": "",
                "checkWriteInsertIndex": "",
                "DeviceName": "",
                "CANID": "",
                "RestartTime": "",
                "SetBaudrateMode": "",
                "CANBaudRate": "",
                "CANSamplePoint": "",
                "CANFDBaudRate": "",
                "CANFDSamplePoint": "",
                "Bittiming": "",
                "CanFDMode": "",
                "OnlySend": "",
                "ErrorFrameFilterMode": "",
                "ErrorFrameFilterMask": "",
                "NomalFrameFilterMode": "",
                "NomalFrameFilterIDMask": "",
                "readByteOrder": "",
                "writeByteOrder": ""
            },
            {
                "category": "segment",
                "color": "#4CAF50",
                "size": "200 6",
                "type": "MODBUS_RTU",
                "loc": "-83.50404885991247 -166.0778183004336",
                "key": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                "text": "RTU_5F_EM",
                "timeout": "1000",
                "path": "",
                "username": "",
                "password": "",
                "topic": "",
                "maxretry": "",
                "ip": "",
                "port": "",
                "scan_time": "",
                "cycleTime": "",
                "serialPort": "/dev/ttyS2",
                "baudrate": "9600",
                "parity": "N",
                "databit": "8",
                "stopbit": "1",
                "status": "",
                "maxNode": "",
                "auto_start": false,
                "target_resources": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                "adapter": "",
                "inSize": "",
                "outSize": "",
                "sendInterval": "1000",
                "checksum": false,
                "checkReadType": "",
                "checkReadBeginIndex": "",
                "checkReadLastIndex": "",
                "checkReadInsertIndex": "",
                "checkWriteType": "",
                "checkWriteBeginIndex": "",
                "checkWriteLastIndex": "",
                "checkWriteInsertIndex": "",
                "DeviceName": "",
                "CANID": "",
                "RestartTime": "",
                "SetBaudrateMode": "",
                "CANBaudRate": "",
                "CANSamplePoint": "",
                "CANFDBaudRate": "",
                "CANFDSamplePoint": "",
                "Bittiming": "",
                "CanFDMode": "",
                "OnlySend": "",
                "ErrorFrameFilterMode": "",
                "ErrorFrameFilterMask": "",
                "NomalFrameFilterMode": "",
                "NomalFrameFilterIDMask": "",
                "readByteOrder": "",
                "writeByteOrder": ""
            },
            {
                "category": "segment",
                "color": "#4CAF50",
                "size": "200 6",
                "type": "MODBUS_RTU",
                "loc": "-219.36438354014103 -551.8360832434455",
                "key": "582e4f59-120b-4920-b984-8843f1d3797b",
                "text": "RTU_5F2",
                "timeout": "1000",
                "path": "",
                "username": "",
                "password": "",
                "topic": "",
                "maxretry": "",
                "ip": "",
                "port": "",
                "scan_time": "",
                "cycleTime": "",
                "serialPort": "/dev/ttyS3",
                "baudrate": "9600",
                "parity": "N",
                "databit": "8",
                "stopbit": "1",
                "status": "",
                "maxNode": "",
                "auto_start": false,
                "target_resources": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                "adapter": "",
                "inSize": "",
                "outSize": "",
                "sendInterval": "1000",
                "checksum": false,
                "checkReadType": "",
                "checkReadBeginIndex": "",
                "checkReadLastIndex": "",
                "checkReadInsertIndex": "",
                "checkWriteType": "",
                "checkWriteBeginIndex": "",
                "checkWriteLastIndex": "",
                "checkWriteInsertIndex": "",
                "DeviceName": "",
                "CANID": "",
                "RestartTime": "",
                "SetBaudrateMode": "",
                "CANBaudRate": "",
                "CANSamplePoint": "",
                "CANFDBaudRate": "",
                "CANFDSamplePoint": "",
                "Bittiming": "",
                "CanFDMode": "",
                "OnlySend": "",
                "ErrorFrameFilterMode": "",
                "ErrorFrameFilterMask": "",
                "NomalFrameFilterMode": "",
                "NomalFrameFilterIDMask": "",
                "readByteOrder": "",
                "writeByteOrder": ""
            },
            {
                "category": "segment",
                "color": "#4CAF50",
                "size": "200 6",
                "type": "MODBUS_RTU",
                "loc": "144.69487763435302 -470.23915322499806",
                "key": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                "text": "RTU_5F3",
                "timeout": "1000",
                "path": "",
                "username": "",
                "password": "",
                "topic": "",
                "maxretry": "",
                "ip": "",
                "port": "",
                "scan_time": "",
                "cycleTime": "",
                "serialPort": "/dev/ttyS3",
                "baudrate": "9600",
                "parity": "N",
                "databit": "8",
                "stopbit": "1",
                "status": "",
                "maxNode": "",
                "auto_start": false,
                "target_resources": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                "adapter": "",
                "inSize": "",
                "outSize": "",
                "sendInterval": "1000",
                "checksum": false,
                "checkReadType": "",
                "checkReadBeginIndex": "",
                "checkReadLastIndex": "",
                "checkReadInsertIndex": "",
                "checkWriteType": "",
                "checkWriteBeginIndex": "",
                "checkWriteLastIndex": "",
                "checkWriteInsertIndex": "",
                "DeviceName": "",
                "CANID": "",
                "RestartTime": "",
                "SetBaudrateMode": "",
                "CANBaudRate": "",
                "CANSamplePoint": "",
                "CANFDBaudRate": "",
                "CANFDSamplePoint": "",
                "Bittiming": "",
                "CanFDMode": "",
                "OnlySend": "",
                "ErrorFrameFilterMode": "",
                "ErrorFrameFilterMask": "",
                "NomalFrameFilterMode": "",
                "NomalFrameFilterIDMask": "",
                "readByteOrder": "",
                "writeByteOrder": ""
            }
        ],
        "linkDataArray": [
            {
                "from": "b9a8ab10-fa23-4bd3-8d77-4ccd184d3bc9",
                "to": "c1a734c4-d10f-4092-801e-257cc9c41bd6"
            },
            {
                "from": "47f2b198-70bd-4944-96c3-a38324d99aff",
                "to": "c1a734c4-d10f-4092-801e-257cc9c41bd6"
            },
            {
                "from": "47f2b198-70bd-4944-96c3-a38324d99aff",
                "to": "cfebb26b-0100-468b-83c0-ca0b12fd05ae"
            },
            {
                "from": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                "to": "c1a734c4-d10f-4092-801e-257cc9c41bd6"
            },
            {
                "from": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                "to": "bb13b845-f989-4697-a71a-67dde94d089e"
            },
            {
                "from": "582e4f59-120b-4920-b984-8843f1d3797b",
                "to": "d0c3594c-f9b5-45c8-ade9-2a1b63dd4596"
            },
            {
                "from": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                "to": "59716556-2822-406e-8880-0ccbb28e98ea"
            },
            {
                "from": "582e4f59-120b-4920-b984-8843f1d3797b",
                "to": "c1a734c4-d10f-4092-801e-257cc9c41bd6"
            },
            {
                "from": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                "to": "c1a734c4-d10f-4092-801e-257cc9c41bd6"
            }
        ],
        "comments": [
            {
                "key": -15,
                "text": "1",
                "loc": "1903.6079143651173 -498.56387069549083",
                "category": "comment"
            }
        ],
        // g6图形存储格式 by twg
        "graphData": {}
    },
    "applications": [
        {
            "text": "F5",
            "comment": "",
            "fbbs": [
                {
                    "FBB": "RST",
                    "raw_id": "ad7e6277-461f-4f9e-913d-f8648d929d1b",
                    "interface": {
                        "input_events": [],
                        "output_events": [
                            {
                                "key": "928b9b5e-09a9-4c6c-b7df-c10edbe6b427",
                                "raw_key": "",
                                "text": "COLD",
                                "comment": "Init Event",
                                "type": "EVENT",
                                "__gohashid": 7207
                            },
                            {
                                "key": "10b3721d-27bf-4bd2-b873-ffa803a1cb77",
                                "raw_key": "",
                                "text": "WARM",
                                "comment": "Init Event",
                                "type": "EVENT",
                                "__gohashid": 7212
                            },
                            {
                                "key": "61438fc8-3067-448d-adf3-1045ee85e047",
                                "raw_key": "",
                                "text": "STOP",
                                "comment": "Init Event",
                                "type": "EVENT",
                                "__gohashid": 7217
                            }
                        ],
                        "inputs": [],
                        "outputs": []
                    },
                    "name": "E_RESTART",
                    "namespace": "FBLIB.EVENT",
                    "type": "SimpleFunctionBlock",
                    "loc": "-2625.9876316094305 133.84885915338657",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -2,
                    "version": "1.0",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6969
                },
                {
                    "FBB": "em_dis5f",
                    "raw_id": "9948aee6-b1f6-499b-8106-d8b4ab1a58fe",
                    "interface": {
                        "input_events": [
                            {
                                "key": "336e888b-339b-47ce-b45f-7b949a99f007",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7286
                            }
                        ],
                        "output_events": [
                            {
                                "key": "b1a41b0e-d120-441c-9f15-0058b58d77f8",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7293
                            }
                        ],
                        "inputs": [
                            {
                                "key": "c711d850-73e2-411f-8aa4-d4b61e6c5389",
                                "text": "V",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "3",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7301
                            },
                            {
                                "key": "2d1ce471-dbfc-426a-ac97-aa4ed16089be",
                                "text": "I",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "3",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7306
                            },
                            {
                                "key": "b14ab80d-ea39-4136-b5cf-2b63abc9f993",
                                "text": "W",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7311
                            },
                            {
                                "key": "b016ca70-e110-4db7-8a3c-2b4717e13b2d",
                                "text": "Q",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7316
                            },
                            {
                                "key": "26e950c0-46b0-4102-9657-64cbec70b8ff",
                                "text": "F",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7321
                            },
                            {
                                "key": "502f58d2-cfd7-44c8-ade5-ae1141b2739c",
                                "text": "E",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "4",
                                "relatedEvents": [
                                    "336e888b-339b-47ce-b45f-7b949a99f007"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7326
                            }
                        ],
                        "outputs": [
                            {
                                "key": "a2ec0636-64de-48c2-aec9-29f3fd20cfe8",
                                "text": "VA",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_VA",
                                "__gohashid": 7333
                            },
                            {
                                "key": "57f8a998-09da-4159-8c59-9ed39a6ea5cf",
                                "text": "VB",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_VB",
                                "__gohashid": 7338
                            },
                            {
                                "key": "86a1feb8-ea73-4074-9306-a8ea8a63a34e",
                                "text": "VC",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_VC",
                                "__gohashid": 7343
                            },
                            {
                                "key": "5b008d65-ca87-411a-a912-32624d550e42",
                                "text": "IA",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_IA",
                                "__gohashid": 7348
                            },
                            {
                                "key": "957032ca-626e-41ce-b879-9b95b63bb530",
                                "text": "IB",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_IB",
                                "__gohashid": 7353
                            },
                            {
                                "key": "31db3403-b7eb-4d23-9cd4-ba9e9c915080",
                                "text": "IC",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_IC",
                                "__gohashid": 7358
                            },
                            {
                                "key": "9f0a897e-3d07-429e-a35f-3d0f90752458",
                                "text": "AP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_AP",
                                "__gohashid": 7363
                            },
                            {
                                "key": "f30b643c-9593-4fcc-b124-3084daebb5ed",
                                "text": "RP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_RP",
                                "__gohashid": 7368
                            },
                            {
                                "key": "0f959716-6ebd-4840-9c5f-6be7ed3d27cb",
                                "text": "PF",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_PF",
                                "__gohashid": 7373
                            },
                            {
                                "key": "6f16f204-304a-4e0a-bfc9-34127974e0a7",
                                "text": "AE",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_AE",
                                "__gohashid": 7378
                            },
                            {
                                "key": "0080794c-5f6a-45d3-86ee-aa208cc452ac",
                                "text": "RE",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F6_PM_AC_RE",
                                "__gohashid": 7383
                            },
                            {
                                "key": "0c8df939-88e2-4585-b532-9295d9be0f39",
                                "text": "TEST1",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7388
                            },
                            {
                                "key": "2c32a456-8164-49e4-95e8-bdadc64bfb03",
                                "text": "TEST2",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b1a41b0e-d120-441c-9f15-0058b58d77f8"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7393
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ELETRICMETER",
                    "namespace": "ENV",
                    "type": "BasicFunctionBlock",
                    "loc": "-1027.298345872577 547.516607300906",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -17,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6970
                },
                {
                    "FBB": "CLE",
                    "raw_id": "d422380b-c1dd-4044-9a4c-4023670a732c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                                "raw_key": "",
                                "text": "START",
                                "comment": "Service Initialization",
                                "type": "EVENT",
                                "__gohashid": 7459
                            },
                            {
                                "key": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                                "raw_key": "",
                                "text": "STOP",
                                "comment": "Service Request",
                                "type": "EVENT",
                                "__gohashid": 7464
                            }
                        ],
                        "output_events": [
                            {
                                "key": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                                "raw_key": "",
                                "text": "EO",
                                "comment": "Initialization Confirm",
                                "type": "EVENT",
                                "__gohashid": 7471
                            }
                        ],
                        "inputs": [
                            {
                                "key": "23957b24-6905-437a-9a23-775d225f4598",
                                "text": "DT",
                                "comment": "Event Input Qualifier",
                                "type": "",
                                "initVals": "35",
                                "max": "1000",
                                "min": "0",
                                "step": "1",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7479
                            }
                        ],
                        "outputs": []
                    },
                    "name": "E_CYCLE",
                    "namespace": "FBLIB.EVENT",
                    "type": "SimpleFunctionBlock",
                    "loc": "-1774.0494043508647 620.4814776322196",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -36,
                    "version": "0.2",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6971
                },
                {
                    "FBB": "cycle",
                    "raw_id": "d422380b-c1dd-4044-9a4c-4023670a732c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                                "raw_key": "",
                                "text": "START",
                                "comment": "Service Initialization",
                                "type": "EVENT",
                                "__gohashid": 7546
                            },
                            {
                                "key": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                                "raw_key": "",
                                "text": "STOP",
                                "comment": "Service Request",
                                "type": "EVENT",
                                "__gohashid": 7551
                            }
                        ],
                        "output_events": [
                            {
                                "key": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                                "raw_key": "",
                                "text": "EO",
                                "comment": "Initialization Confirm",
                                "type": "EVENT",
                                "__gohashid": 7558
                            }
                        ],
                        "inputs": [
                            {
                                "key": "23957b24-6905-437a-9a23-775d225f4598",
                                "text": "DT",
                                "comment": "Event Input Qualifier",
                                "type": "",
                                "initVals": "35",
                                "max": "1000",
                                "min": "0",
                                "step": "1",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7566
                            }
                        ],
                        "outputs": []
                    },
                    "name": "E_CYCLE",
                    "namespace": "FBLIB.EVENT",
                    "type": "SimpleFunctionBlock",
                    "loc": "-1877.9547570745224 -306.2622265756895",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -58,
                    "version": "0.2",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6972
                },
                {
                    "FBB": "env",
                    "raw_id": "c847492f-c3b7-4768-fd3f-81096f34936f",
                    "interface": {
                        "input_events": [
                            {
                                "key": "562ba091-385b-4e48-8cde-847289481e7b",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7633
                            }
                        ],
                        "output_events": [
                            {
                                "key": "8324d6a5-0d95-4b4b-be51-ccddade71f12",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7640
                            }
                        ],
                        "inputs": [
                            {
                                "key": "7aceee39-b110-46b6-9857-9611a500c52a",
                                "text": "QI",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7648
                            },
                            {
                                "key": "2b8d0334-a46b-4f1b-b6d3-c52768ea4a8d",
                                "text": "STAUS",
                                "comment": "",
                                "type": "WSTRING",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7653
                            }
                        ],
                        "outputs": [
                            {
                                "key": "404145e1-e60f-413c-b56e-1ed937eeb464",
                                "text": "CO2",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_eCO2",
                                "__gohashid": 7660
                            },
                            {
                                "key": "bd1daef9-7b6a-4d9d-9a5d-4e88aa785460",
                                "text": "TVOC",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_TVOC",
                                "__gohashid": 7665
                            },
                            {
                                "key": "29c535bd-1a1d-4404-8f54-266655f7b07e",
                                "text": "CH2O",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_CH2O",
                                "__gohashid": 7670
                            },
                            {
                                "key": "d36ad56f-7c94-4f2b-808c-b551e8034b94",
                                "text": "PM25",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_PM25",
                                "__gohashid": 7675
                            },
                            {
                                "key": "8e10dc2c-3203-4593-b355-5de4bf33e550",
                                "text": "HUMI",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_HUMIDITY",
                                "__gohashid": 7680
                            },
                            {
                                "key": "7f19fbf0-912b-4665-acf5-67b54ba1d682",
                                "text": "TEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_TEMP",
                                "__gohashid": 7685
                            },
                            {
                                "key": "b19615bd-501b-4470-8a3e-bd79391006a8",
                                "text": "PM10",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_PM10",
                                "__gohashid": 7690
                            },
                            {
                                "key": "bc1753ce-c8d7-43ec-ba90-0a8baab36271",
                                "text": "PM01",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_PM1_1",
                                "__gohashid": 7695
                            },
                            {
                                "key": "c31b0294-5fbc-4b39-a6c3-8d3bd5a99de6",
                                "text": "LUX",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_LUX",
                                "__gohashid": 7700
                            },
                            {
                                "key": "a7b45621-9b41-4d5a-be5f-1e8b7d3a1d20",
                                "text": "MCUTEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_DTEMP",
                                "__gohashid": 7705
                            },
                            {
                                "key": "c4691443-345d-4e8e-81ad-0bc1429b40b5",
                                "text": "dB",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_NOISE",
                                "__gohashid": 7710
                            },
                            {
                                "key": "a86fdcc0-54ab-4363-876e-181320c90835",
                                "text": "Pa",
                                "comment": "",
                                "type": "LREAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_env_PRESSURE",
                                "__gohashid": 7715
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ENV_DISPLAY",
                    "namespace": "ENV",
                    "type": "BasicFunctionBlock",
                    "loc": "-868.5310958081361 -573.2178210646709",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -34,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6973
                },
                {
                    "FBB": "env2",
                    "raw_id": "c847492f-c3b7-4768-fd3f-81096f34936f",
                    "interface": {
                        "input_events": [
                            {
                                "key": "562ba091-385b-4e48-8cde-847289481e7b",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7781
                            }
                        ],
                        "output_events": [
                            {
                                "key": "8324d6a5-0d95-4b4b-be51-ccddade71f12",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7788
                            }
                        ],
                        "inputs": [
                            {
                                "key": "7aceee39-b110-46b6-9857-9611a500c52a",
                                "text": "QI",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7796
                            },
                            {
                                "key": "2b8d0334-a46b-4f1b-b6d3-c52768ea4a8d",
                                "text": "STAUS",
                                "comment": "",
                                "type": "WSTRING",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7801
                            }
                        ],
                        "outputs": [
                            {
                                "key": "404145e1-e60f-413c-b56e-1ed937eeb464",
                                "text": "CO2",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_eCO2",
                                "__gohashid": 7808
                            },
                            {
                                "key": "bd1daef9-7b6a-4d9d-9a5d-4e88aa785460",
                                "text": "TVOC",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_TVOC",
                                "__gohashid": 7813
                            },
                            {
                                "key": "29c535bd-1a1d-4404-8f54-266655f7b07e",
                                "text": "CH2O",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_CH2O",
                                "__gohashid": 7818
                            },
                            {
                                "key": "d36ad56f-7c94-4f2b-808c-b551e8034b94",
                                "text": "PM25",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_PM25",
                                "__gohashid": 7823
                            },
                            {
                                "key": "8e10dc2c-3203-4593-b355-5de4bf33e550",
                                "text": "HUMI",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_HUMIDITY",
                                "__gohashid": 7828
                            },
                            {
                                "key": "7f19fbf0-912b-4665-acf5-67b54ba1d682",
                                "text": "TEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_TEMP",
                                "__gohashid": 7833
                            },
                            {
                                "key": "b19615bd-501b-4470-8a3e-bd79391006a8",
                                "text": "PM10",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_PM10",
                                "__gohashid": 7838
                            },
                            {
                                "key": "bc1753ce-c8d7-43ec-ba90-0a8baab36271",
                                "text": "PM01",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_PM1_1",
                                "__gohashid": 7843
                            },
                            {
                                "key": "c31b0294-5fbc-4b39-a6c3-8d3bd5a99de6",
                                "text": "LUX",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_LUX",
                                "__gohashid": 7848
                            },
                            {
                                "key": "a7b45621-9b41-4d5a-be5f-1e8b7d3a1d20",
                                "text": "MCUTEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_DTEMP",
                                "__gohashid": 7853
                            },
                            {
                                "key": "c4691443-345d-4e8e-81ad-0bc1429b40b5",
                                "text": "dB",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_NOISE",
                                "__gohashid": 7858
                            },
                            {
                                "key": "a86fdcc0-54ab-4363-876e-181320c90835",
                                "text": "Pa",
                                "comment": "",
                                "type": "LREAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F4_env_1_PRESSURE",
                                "__gohashid": 7863
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ENV_DISPLAY",
                    "namespace": "ENV",
                    "type": "BasicFunctionBlock",
                    "loc": "-863.9303475822635 -193.19638297673683",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -41,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6974
                },
                {
                    "FBB": "env3",
                    "raw_id": "c847492f-c3b7-4768-fd3f-81096f34936f",
                    "interface": {
                        "input_events": [
                            {
                                "key": "562ba091-385b-4e48-8cde-847289481e7b",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7929
                            }
                        ],
                        "output_events": [
                            {
                                "key": "8324d6a5-0d95-4b4b-be51-ccddade71f12",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 7936
                            }
                        ],
                        "inputs": [
                            {
                                "key": "7aceee39-b110-46b6-9857-9611a500c52a",
                                "text": "QI",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7944
                            },
                            {
                                "key": "2b8d0334-a46b-4f1b-b6d3-c52768ea4a8d",
                                "text": "STAUS",
                                "comment": "",
                                "type": "WSTRING",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "562ba091-385b-4e48-8cde-847289481e7b"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7949
                            }
                        ],
                        "outputs": [
                            {
                                "key": "404145e1-e60f-413c-b56e-1ed937eeb464",
                                "text": "CO2",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7956
                            },
                            {
                                "key": "bd1daef9-7b6a-4d9d-9a5d-4e88aa785460",
                                "text": "TVOC",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7961
                            },
                            {
                                "key": "29c535bd-1a1d-4404-8f54-266655f7b07e",
                                "text": "CH2O",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7966
                            },
                            {
                                "key": "d36ad56f-7c94-4f2b-808c-b551e8034b94",
                                "text": "PM25",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7971
                            },
                            {
                                "key": "8e10dc2c-3203-4593-b355-5de4bf33e550",
                                "text": "HUMI",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7976
                            },
                            {
                                "key": "7f19fbf0-912b-4665-acf5-67b54ba1d682",
                                "text": "TEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7981
                            },
                            {
                                "key": "b19615bd-501b-4470-8a3e-bd79391006a8",
                                "text": "PM10",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7986
                            },
                            {
                                "key": "bc1753ce-c8d7-43ec-ba90-0a8baab36271",
                                "text": "PM01",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7991
                            },
                            {
                                "key": "c31b0294-5fbc-4b39-a6c3-8d3bd5a99de6",
                                "text": "LUX",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 7996
                            },
                            {
                                "key": "a7b45621-9b41-4d5a-be5f-1e8b7d3a1d20",
                                "text": "MCUTEMP",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8001
                            },
                            {
                                "key": "c4691443-345d-4e8e-81ad-0bc1429b40b5",
                                "text": "dB",
                                "comment": "",
                                "type": "REAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8006
                            },
                            {
                                "key": "a86fdcc0-54ab-4363-876e-181320c90835",
                                "text": "Pa",
                                "comment": "",
                                "type": "LREAL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "8324d6a5-0d95-4b4b-be51-ccddade71f12"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8011
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ENV_DISPLAY",
                    "namespace": "ENV",
                    "type": "BasicFunctionBlock",
                    "loc": "-863.359158274757 219.53497026507114",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -57,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6975
                },
                {
                    "FBB": "c2",
                    "raw_id": "d422380b-c1dd-4044-9a4c-4023670a732c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                                "raw_key": "",
                                "text": "START",
                                "comment": "Service Initialization",
                                "type": "EVENT",
                                "__gohashid": 8077
                            },
                            {
                                "key": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                                "raw_key": "",
                                "text": "STOP",
                                "comment": "Service Request",
                                "type": "EVENT",
                                "__gohashid": 8082
                            }
                        ],
                        "output_events": [
                            {
                                "key": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                                "raw_key": "",
                                "text": "EO",
                                "comment": "Initialization Confirm",
                                "type": "EVENT",
                                "__gohashid": 8089
                            }
                        ],
                        "inputs": [
                            {
                                "key": "23957b24-6905-437a-9a23-775d225f4598",
                                "text": "DT",
                                "comment": "Event Input Qualifier",
                                "type": "",
                                "initVals": "35",
                                "max": "1000",
                                "min": "0",
                                "step": "1",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8097
                            }
                        ],
                        "outputs": []
                    },
                    "name": "E_CYCLE",
                    "namespace": "FBLIB.EVENT",
                    "type": "SimpleFunctionBlock",
                    "loc": "-1844.0582655466353 -14.143800431805857",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -68,
                    "version": "0.2",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6976
                },
                {
                    "FBB": "c3",
                    "raw_id": "d422380b-c1dd-4044-9a4c-4023670a732c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                                "raw_key": "",
                                "text": "START",
                                "comment": "Service Initialization",
                                "type": "EVENT",
                                "__gohashid": 8164
                            },
                            {
                                "key": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                                "raw_key": "",
                                "text": "STOP",
                                "comment": "Service Request",
                                "type": "EVENT",
                                "__gohashid": 8169
                            }
                        ],
                        "output_events": [
                            {
                                "key": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                                "raw_key": "",
                                "text": "EO",
                                "comment": "Initialization Confirm",
                                "type": "EVENT",
                                "__gohashid": 8176
                            }
                        ],
                        "inputs": [
                            {
                                "key": "23957b24-6905-437a-9a23-775d225f4598",
                                "text": "DT",
                                "comment": "Event Input Qualifier",
                                "type": "",
                                "initVals": "35",
                                "max": "1000",
                                "min": "0",
                                "step": "1",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8184
                            }
                        ],
                        "outputs": []
                    },
                    "name": "E_CYCLE",
                    "namespace": "FBLIB.EVENT",
                    "type": "SimpleFunctionBlock",
                    "loc": "-1843.0105931746523 282.95072973948015",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -69,
                    "version": "0.2",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6977
                },
                {
                    "FBB": "ck1",
                    "raw_id": "fd172db4-37e4-4a3b-edb5-4ea2c3718d75",
                    "interface": {
                        "input_events": [
                            {
                                "key": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                                "raw_key": "",
                                "text": "ERROR",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8251
                            },
                            {
                                "key": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8256
                            }
                        ],
                        "output_events": [
                            {
                                "key": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8263
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                                "text": "NR",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "847acf16-a254-40e3-86d3-fd1f340a4f4e"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8272
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "Camera_Nr_check",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-1751.4548160704617 -370.45393449468725",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -28,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6978
                },
                {
                    "FBB": "ck2",
                    "raw_id": "fd172db4-37e4-4a3b-edb5-4ea2c3718d75",
                    "interface": {
                        "input_events": [
                            {
                                "key": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                                "raw_key": "",
                                "text": "ERROR",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8338
                            },
                            {
                                "key": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8343
                            }
                        ],
                        "output_events": [
                            {
                                "key": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8350
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                                "text": "NR",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "847acf16-a254-40e3-86d3-fd1f340a4f4e"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8359
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "Camera_Nr_check",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-1737.3062949185282 -122.60318786551949",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -29,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6979
                },
                {
                    "FBB": "ck3",
                    "raw_id": "fd172db4-37e4-4a3b-edb5-4ea2c3718d75",
                    "interface": {
                        "input_events": [
                            {
                                "key": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                                "raw_key": "",
                                "text": "ERROR",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8425
                            },
                            {
                                "key": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8430
                            }
                        ],
                        "output_events": [
                            {
                                "key": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8437
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                                "text": "NR",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "847acf16-a254-40e3-86d3-fd1f340a4f4e"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8446
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "Camera_Nr_check",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-1735.149059070815 100.47643764575818",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -30,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6980
                },
                {
                    "FBB": "env_check",
                    "raw_id": "19d8830a-0623-48a5-b206-68dc2ccd0b10",
                    "interface": {
                        "input_events": [
                            {
                                "key": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8512
                            }
                        ],
                        "output_events": [
                            {
                                "key": "3739edab-3895-4ebc-b283-dcc806871813",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8519
                            }
                        ],
                        "inputs": [
                            {
                                "key": "e6bd1015-9c82-4bd7-8284-10bc021c6614",
                                "text": "ER1",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8527
                            },
                            {
                                "key": "5cc15bfb-687f-47b0-b106-b16a3f6b7634",
                                "text": "ER2",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8532
                            },
                            {
                                "key": "ce904a6d-2aad-4c91-ad4b-170e908df9d0",
                                "text": "ER3",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8537
                            },
                            {
                                "key": "709f957c-edc2-42eb-8d30-6bf66bf3f086",
                                "text": "MAXNR",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8542
                            }
                        ],
                        "outputs": [
                            {
                                "key": "b25a13f4-a69e-4876-a9ca-37e5d8b6abfd",
                                "text": "F4_ONLINE_CAM",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "3739edab-3895-4ebc-b283-dcc806871813"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_ONLINE_ENV",
                                "__gohashid": 8549
                            },
                            {
                                "key": "ab07d741-d808-4151-a490-da108aeb680b",
                                "text": "F4_NUM_CAM",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "3739edab-3895-4ebc-b283-dcc806871813"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_NUM_ENV",
                                "__gohashid": 8554
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ER_COUNT",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-535.2305718282967 -212.93132481562543",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -35,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6981
                },
                {
                    "FBB": "EMCHECK",
                    "raw_id": "19d8830a-0623-48a5-b206-68dc2ccd0b10",
                    "interface": {
                        "input_events": [
                            {
                                "key": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8620
                            }
                        ],
                        "output_events": [
                            {
                                "key": "3739edab-3895-4ebc-b283-dcc806871813",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8627
                            }
                        ],
                        "inputs": [
                            {
                                "key": "e6bd1015-9c82-4bd7-8284-10bc021c6614",
                                "text": "ER1",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8635
                            },
                            {
                                "key": "5cc15bfb-687f-47b0-b106-b16a3f6b7634",
                                "text": "ER2",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8640
                            },
                            {
                                "key": "ce904a6d-2aad-4c91-ad4b-170e908df9d0",
                                "text": "ER3",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8645
                            },
                            {
                                "key": "709f957c-edc2-42eb-8d30-6bf66bf3f086",
                                "text": "MAXNR",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "b3b3bd82-ad0e-4138-9652-0faa5cdf3438"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8650
                            }
                        ],
                        "outputs": [
                            {
                                "key": "b25a13f4-a69e-4876-a9ca-37e5d8b6abfd",
                                "text": "F4_ONLINE_CAM",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "3739edab-3895-4ebc-b283-dcc806871813"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_ONLINE_EM",
                                "__gohashid": 8657
                            },
                            {
                                "key": "ab07d741-d808-4151-a490-da108aeb680b",
                                "text": "F4_NUM_CAM",
                                "comment": "",
                                "type": "UDINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "3739edab-3895-4ebc-b283-dcc806871813"
                                ],
                                "OPC_UA": "2",
                                "opcName": "F2_NUM_EM",
                                "__gohashid": 8662
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "ER_COUNT",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-1372.7686355787807 1003.6133343394472",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -39,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6982
                },
                {
                    "FBB": "CK2",
                    "raw_id": "fd172db4-37e4-4a3b-edb5-4ea2c3718d75",
                    "interface": {
                        "input_events": [
                            {
                                "key": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                                "raw_key": "",
                                "text": "ERROR",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8728
                            },
                            {
                                "key": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                                "raw_key": "",
                                "text": "INIT",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8733
                            }
                        ],
                        "output_events": [
                            {
                                "key": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                                "raw_key": "",
                                "text": "INITO",
                                "comment": "",
                                "type": "EVENT",
                                "__gohashid": 8740
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                                "text": "NR",
                                "comment": "",
                                "type": "BOOL",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "847acf16-a254-40e3-86d3-fd1f340a4f4e"
                                ],
                                "OPC_UA": "0",
                                "__gohashid": 8749
                            }
                        ],
                        "internals": [],
                        "temps": []
                    },
                    "name": "Camera_Nr_check",
                    "namespace": "Light",
                    "type": "BasicFunctionBlock",
                    "loc": "-1771.9863259688054 981.4003317712976",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -42,
                    "version": "0.1",
                    "isGroup": true,
                    "fb_type": "",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6983
                },
                {
                    "FBB": "ss1",
                    "raw_id": "47f2b198-70bd-4944-96c3-a38324d99aff",
                    "interface": {
                        "input_events": [
                            {
                                "key": "4ecf07fa-56e1-4df0-a636-43fb61c41dca",
                                "raw_key": "START",
                                "text": "START",
                                "__gohashid": 8815
                            },
                            {
                                "key": "991833ea-c944-4c3b-8ab8-583bc5035e89",
                                "raw_key": "STOP",
                                "text": "STOP",
                                "__gohashid": 8820
                            }
                        ],
                        "output_events": [
                            {
                                "key": "b4ceb9c6-5266-40b1-b9a3-09ebf1c0f10d",
                                "raw_key": "STARTO",
                                "text": "STARTO",
                                "__gohashid": 8827
                            },
                            {
                                "key": "da86fccd-6f3c-43ef-827f-fe247d0e6cb0",
                                "raw_key": "STOPO",
                                "text": "STOPO",
                                "__gohashid": 8832
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-2202.138446352091 -269.14130514528995",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -31,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6984
                },
                {
                    "FBB": "r1",
                    "raw_id": "47f2b198-70bd-4944-96c3-a38324d99aff",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e21e2eeb-cfc0-436b-8b55-8449ed1c8fa2",
                                "raw_key": "READ",
                                "text": "READ",
                                "__gohashid": 8901
                            }
                        ],
                        "output_events": [
                            {
                                "key": "3743255b-c90b-4145-ba4e-8c4b1dda46b3",
                                "raw_key": "READO",
                                "text": "READO",
                                "__gohashid": 8908
                            },
                            {
                                "key": "b00ce368-7d68-4c12-ba8b-d79ba91a8cfd",
                                "raw_key": "READERR",
                                "text": "READERR",
                                "__gohashid": 8913
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1509.8414478533034 -319.5535833015217",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -32,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6985
                },
                {
                    "FBB": "w1",
                    "raw_id": "47f2b198-70bd-4944-96c3-a38324d99aff",
                    "interface": {
                        "input_events": [
                            {
                                "key": "23824707-4aee-41cf-88c3-ce006606f65f",
                                "raw_key": "GET",
                                "text": "GET",
                                "__gohashid": 8982
                            }
                        ],
                        "output_events": [
                            {
                                "key": "77c8a41d-fa4b-43dd-8972-9c708c60e77b",
                                "raw_key": "GETO",
                                "text": "GETO",
                                "__gohashid": 8989
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "89d4a9e2-4b79-4f78-992e-ed41e76cf4b7",
                                "text": "ENV_1",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "77c8a41d-fa4b-43dd-8972-9c708c60e77b"
                                ],
                                "raw_key": "fd671ce1-b0b5-4bba-8f41-28c7374889de",
                                "__gohashid": 8998
                            }
                        ],
                        "internals": []
                    },
                    "name": "RTU_5F",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1298.378462589037 -366.7238465775108",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -33,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6986
                },
                {
                    "FBB": "st2",
                    "raw_id": "582e4f59-120b-4920-b984-8843f1d3797b",
                    "interface": {
                        "input_events": [
                            {
                                "key": "fca3b4ba-c4b5-40ab-a98e-d287c1f8cca0",
                                "raw_key": "START",
                                "text": "START",
                                "__gohashid": 9064
                            },
                            {
                                "key": "0e1c992d-39d2-4d34-9409-96411ef1599c",
                                "raw_key": "STOP",
                                "text": "STOP",
                                "__gohashid": 9069
                            }
                        ],
                        "output_events": [
                            {
                                "key": "3132b676-1d1f-45d5-87b0-93335b7bb94b",
                                "raw_key": "STARTO",
                                "text": "STARTO",
                                "__gohashid": 9076
                            },
                            {
                                "key": "8bfc2ab3-a159-48d7-9d5f-dd24b8cede14",
                                "raw_key": "STOPO",
                                "text": "STOPO",
                                "__gohashid": 9081
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F2",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-2204.395201537994 -0.8590816803575763",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -62,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6987
                },
                {
                    "FBB": "st3",
                    "raw_id": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                    "interface": {
                        "input_events": [
                            {
                                "key": "344c2e88-062c-44ec-b5a2-ad3d2e236487",
                                "raw_key": "START",
                                "text": "START",
                                "__gohashid": 9150
                            },
                            {
                                "key": "74f04e52-834c-4c57-8e9c-f04facc2d76b",
                                "raw_key": "STOP",
                                "text": "STOP",
                                "__gohashid": 9155
                            }
                        ],
                        "output_events": [
                            {
                                "key": "09a81c81-952c-409a-8256-794837f1e53a",
                                "raw_key": "STARTO",
                                "text": "STARTO",
                                "__gohashid": 9162
                            },
                            {
                                "key": "ad4333fc-a07c-42a6-bd5c-97bb73edd134",
                                "raw_key": "STOPO",
                                "text": "STOPO",
                                "__gohashid": 9167
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F3",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-2200.331972246035 261.8746892257726",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -63,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6988
                },
                {
                    "FBB": "r2",
                    "raw_id": "582e4f59-120b-4920-b984-8843f1d3797b",
                    "interface": {
                        "input_events": [
                            {
                                "key": "e850bc88-d10a-4fa1-a045-d9a7218a7a02",
                                "raw_key": "READ",
                                "text": "READ",
                                "__gohashid": 9236
                            }
                        ],
                        "output_events": [
                            {
                                "key": "2d2372f5-d893-4772-9c49-908e48fece8e",
                                "raw_key": "READO",
                                "text": "READO",
                                "__gohashid": 9243
                            },
                            {
                                "key": "52a7f6db-034a-49f2-bbcc-fc07037b253a",
                                "raw_key": "READERR",
                                "text": "READERR",
                                "__gohashid": 9248
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F2",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1575.553566013844 0.3129389017472022",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -64,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6989
                },
                {
                    "FBB": "g2",
                    "raw_id": "582e4f59-120b-4920-b984-8843f1d3797b",
                    "interface": {
                        "input_events": [
                            {
                                "key": "8799b9f5-f64f-432a-8f18-4fba951379ce",
                                "raw_key": "GET",
                                "text": "GET",
                                "__gohashid": 9317
                            }
                        ],
                        "output_events": [
                            {
                                "key": "28b2cb34-9f69-4a9f-9f2a-bd41ffbea790",
                                "raw_key": "GETO",
                                "text": "GETO",
                                "__gohashid": 9324
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "069eed32-c7f2-4a27-91ab-aa0a0c451f27",
                                "text": "ENV_2",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "28b2cb34-9f69-4a9f-9f2a-bd41ffbea790"
                                ],
                                "raw_key": "83dd6579-c24f-4310-8a20-449d4fdab0ab",
                                "__gohashid": 9333
                            }
                        ],
                        "internals": []
                    },
                    "name": "RTU_5F2",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1180.7406783134875 22.018732612288204",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -65,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6990
                },
                {
                    "FBB": "r3",
                    "raw_id": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                    "interface": {
                        "input_events": [
                            {
                                "key": "29749d0b-77dd-4710-8c66-4216a8ef1a3d",
                                "raw_key": "READ",
                                "text": "READ",
                                "__gohashid": 9399
                            }
                        ],
                        "output_events": [
                            {
                                "key": "e1cc7160-3f1b-4aac-9d07-4cdeb11e2295",
                                "raw_key": "READO",
                                "text": "READO",
                                "__gohashid": 9406
                            },
                            {
                                "key": "02e1d244-7845-4e4c-a6db-3d26146c6980",
                                "raw_key": "READERR",
                                "text": "READERR",
                                "__gohashid": 9411
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F3",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1565.0778781120248 290.07428037815794",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -66,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6991
                },
                {
                    "FBB": "g3",
                    "raw_id": "0cbeaa2f-a41a-405f-94c2-9bff573768f6",
                    "interface": {
                        "input_events": [
                            {
                                "key": "f9e62522-02de-4c5a-aa20-0792d1c0c38a",
                                "raw_key": "GET",
                                "text": "GET",
                                "__gohashid": 9480
                            }
                        ],
                        "output_events": [
                            {
                                "key": "25b20770-97d4-4bfe-9d9b-31389758ff84",
                                "raw_key": "GETO",
                                "text": "GETO",
                                "__gohashid": 9487
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "412d32ae-ca7d-4b38-8971-c5edc24649ff",
                                "text": "ENV_3",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "13",
                                "relatedEvents": [
                                    "25b20770-97d4-4bfe-9d9b-31389758ff84"
                                ],
                                "raw_key": "0c7f9735-640b-40e3-afe4-1b1dbe68eb14",
                                "__gohashid": 9496
                            }
                        ],
                        "internals": []
                    },
                    "name": "RTU_5F3",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1332.9333380046241 285.46489023228105",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -67,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6992
                },
                {
                    "FBB": "srw1",
                    "raw_id": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "bc4b95e8-4d1a-4db9-95b6-ba59ced8dcdc",
                                "raw_key": "START",
                                "text": "START",
                                "__gohashid": 9562
                            },
                            {
                                "key": "052ef6c5-62d2-45a7-a1d7-cbaa356fe8ca",
                                "raw_key": "STOP",
                                "text": "STOP",
                                "__gohashid": 9567
                            }
                        ],
                        "output_events": [
                            {
                                "key": "57889a76-a17a-476d-83d5-b19e549aa54b",
                                "raw_key": "STARTO",
                                "text": "STARTO",
                                "__gohashid": 9574
                            },
                            {
                                "key": "5fdcf9df-fbde-4832-92bb-a10ecfd65e09",
                                "raw_key": "STOPO",
                                "text": "STOPO",
                                "__gohashid": 9579
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F_EM",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-2226.262526013014 639.5233367155024",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -59,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6993
                },
                {
                    "FBB": "rw1",
                    "raw_id": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "0d2781cc-43b1-41f4-b64a-1d0c31015219",
                                "raw_key": "READ",
                                "text": "READ",
                                "__gohashid": 9648
                            }
                        ],
                        "output_events": [
                            {
                                "key": "cfb3b416-1a48-4300-9812-e8dd845bc460",
                                "raw_key": "READO",
                                "text": "READO",
                                "__gohashid": 9655
                            },
                            {
                                "key": "7f170e5c-3368-43d8-9797-6559bb66920d",
                                "raw_key": "READERR",
                                "text": "READERR",
                                "__gohashid": 9660
                            }
                        ],
                        "inputs": [],
                        "outputs": [],
                        "internals": []
                    },
                    "name": "RTU_5F_EM",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1600.1737759719638 626.8539684919839",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -61,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6994
                },
                {
                    "FBB": "gw1",
                    "raw_id": "05e1fdf4-88ee-46bb-84cf-7b6735ee631c",
                    "interface": {
                        "input_events": [
                            {
                                "key": "b32309f3-f7e4-4b7f-9363-5283914cf2e6",
                                "raw_key": "GET",
                                "text": "GET",
                                "__gohashid": 9729
                            }
                        ],
                        "output_events": [
                            {
                                "key": "0e9fa1fc-d235-4682-90e6-9edfc0a84112",
                                "raw_key": "GETO",
                                "text": "GETO",
                                "__gohashid": 9736
                            }
                        ],
                        "inputs": [],
                        "outputs": [
                            {
                                "key": "baacb372-deae-4ef8-be11-0a9623113afb",
                                "text": "V",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "3",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "6fd28060-65c7-435c-a6c8-9ae845aa19c8",
                                "__gohashid": 9745
                            },
                            {
                                "key": "089ed31e-a1be-4df1-b35f-7d763e087087",
                                "text": "I",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "3",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "fd6ac15d-2138-4975-b2ff-de65226953ca",
                                "__gohashid": 9750
                            },
                            {
                                "key": "113ad5a8-cd89-43f1-ad32-20b1a1f3cec9",
                                "text": "W",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "4118c448-8717-4fa4-a967-0ef4881720e7",
                                "__gohashid": 9755
                            },
                            {
                                "key": "29373434-2783-4a39-bf6a-043729d45e68",
                                "text": "Q",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "47b10114-c1a2-44ee-aaa9-841e89d68344",
                                "__gohashid": 9760
                            },
                            {
                                "key": "b7dbb167-1ad7-4ab1-9b44-dac492753919",
                                "text": "F",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "1",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "400a0927-1030-436b-9c7f-11dfbe78057a",
                                "__gohashid": 9765
                            },
                            {
                                "key": "63fba323-e856-4aff-aa45-61e19d027c18",
                                "text": "E",
                                "comment": "",
                                "type": "UINT",
                                "initVals": "",
                                "max": "",
                                "min": "",
                                "step": "",
                                "arrayLength": "4",
                                "relatedEvents": [
                                    "0e9fa1fc-d235-4682-90e6-9edfc0a84112"
                                ],
                                "raw_key": "31dfb874-b0e6-4239-b3cb-742d341e0041",
                                "__gohashid": 9770
                            }
                        ],
                        "internals": []
                    },
                    "name": "RTU_5F_EM",
                    "namespace": "MODBUS_RTU",
                    "type": "DynamicFunctionBlock",
                    "loc": "-1353.3057679625465 597.5339149199089",
                    "resource": "f11d11a3-57b5-418e-a97e-5407d10a56cc",
                    "key": -72,
                    "isGroup": true,
                    "fb_type": "MODBUS_RTU",
                    "screen": "",
                    "category": "node_group",
                    "target": "",
                    "vars": null,
                    "__gohashid": 6995
                }
            ],
            "dots": [
                {
                    "text": "T#500ms",
                    "category": "constant",
                    "loc": "-1853.0537988821147 763.4541338822196",
                    "key": -37,
                    "group": -36,
                    "__gohashid": 6996
                },
                {
                    "text": "T#500ms",
                    "category": "constant",
                    "loc": "-1956.9591516057724 -163.2895703256895",
                    "key": -60,
                    "group": -58,
                    "__gohashid": 6997
                },
                {
                    "text": "T#500ms",
                    "category": "constant",
                    "loc": "-1923.0626600778853 128.82885581819414",
                    "key": -70,
                    "group": -68,
                    "__gohashid": 6998
                },
                {
                    "text": "T#500ms",
                    "category": "constant",
                    "loc": "-1922.0149877059023 425.9233859894801",
                    "key": -71,
                    "group": -69,
                    "__gohashid": 6999
                },
                {
                    "text": "3",
                    "category": "constant",
                    "loc": "-608.7305718282967 -17.82282872187542",
                    "key": -38,
                    "group": -35,
                    "__gohashid": 7000
                },
                {
                    "text": "1",
                    "category": "constant",
                    "loc": "-1446.2686355787807 1198.7218304331973",
                    "key": -43,
                    "group": -39,
                    "__gohashid": 7001
                }
            ],
            "linkDataArray": [
                {
                    "from": -37,
                    "fp": -37,
                    "points": {
                        "__gohashid": 7005,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1797.5494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1787.5494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1785.0494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1785.0494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1782.5494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1772.5494043508647,
                                "y": 771.3066241165945,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -36,
                    "tp": "23957b24-6905-437a-9a23-775d225f4598",
                    "group": -36,
                    "priority": 0,
                    "selectable": false,
                    "key": -1,
                    "__gohashid": 7068
                },
                {
                    "from": -60,
                    "fp": -60,
                    "points": {
                        "__gohashid": 7006,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1901.4547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1891.4547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1888.9547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1888.9547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1886.4547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1876.4547570745224,
                                "y": -155.4370800913145,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -58,
                    "tp": "23957b24-6905-437a-9a23-775d225f4598",
                    "group": -58,
                    "priority": 0,
                    "selectable": false,
                    "key": -2,
                    "__gohashid": 7069
                },
                {
                    "from": -70,
                    "fp": -70,
                    "points": {
                        "__gohashid": 7007,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1867.5582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            },
                            {
                                "x": -1857.5582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            },
                            {
                                "x": -1855.0582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            },
                            {
                                "x": -1855.0582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            },
                            {
                                "x": -1852.5582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            },
                            {
                                "x": -1842.5582655466353,
                                "y": 136.68134605256915,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -68,
                    "tp": "23957b24-6905-437a-9a23-775d225f4598",
                    "group": -68,
                    "priority": 0,
                    "selectable": false,
                    "key": -3,
                    "__gohashid": 7070
                },
                {
                    "from": -71,
                    "fp": -71,
                    "points": {
                        "__gohashid": 7008,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1866.5105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            },
                            {
                                "x": -1856.5105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            },
                            {
                                "x": -1854.0105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            },
                            {
                                "x": -1854.0105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            },
                            {
                                "x": -1851.5105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            },
                            {
                                "x": -1841.5105931746523,
                                "y": 433.7758762238551,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -69,
                    "tp": "23957b24-6905-437a-9a23-775d225f4598",
                    "group": -69,
                    "priority": 0,
                    "selectable": false,
                    "key": -4,
                    "__gohashid": 7071
                },
                {
                    "from": -38,
                    "fp": -38,
                    "points": {
                        "__gohashid": 7009,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -558.7305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            },
                            {
                                "x": -548.7305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            },
                            {
                                "x": -546.2305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            },
                            {
                                "x": -546.2305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -9.97033848750042,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "709f957c-edc2-42eb-8d30-6bf66bf3f086",
                    "group": -35,
                    "priority": 0,
                    "selectable": false,
                    "key": -5,
                    "__gohashid": 7072
                },
                {
                    "from": -43,
                    "fp": -43,
                    "points": {
                        "__gohashid": 7010,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1396.2686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            },
                            {
                                "x": -1386.2686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            },
                            {
                                "x": -1383.7686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            },
                            {
                                "x": -1383.7686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            },
                            {
                                "x": -1381.2686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            },
                            {
                                "x": -1371.2686355787807,
                                "y": 1206.5743206675722,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -39,
                    "tp": "709f957c-edc2-42eb-8d30-6bf66bf3f086",
                    "group": -39,
                    "priority": 0,
                    "selectable": false,
                    "key": -6,
                    "__gohashid": 7073
                },
                {
                    "from": -2,
                    "fp": "928b9b5e-09a9-4c6c-b7df-c10edbe6b427",
                    "points": {
                        "__gohashid": 7011,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2371.5200702307607,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2371.5200702307607,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -2210.638446352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -2200.638446352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -31,
                    "tp": "4ecf07fa-56e1-4df0-a636-43fb61c41dca",
                    "priority": 1,
                    "key": -7,
                    "__gohashid": 7074
                },
                {
                    "from": -2,
                    "fp": "61438fc8-3067-448d-adf3-1045ee85e047",
                    "points": {
                        "__gohashid": 7012,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2371.5200702307607,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2371.5200702307607,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2210.638446352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2200.638446352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -31,
                    "tp": "991833ea-c944-4c3b-8ab8-583bc5035e89",
                    "priority": 1,
                    "key": -8,
                    "__gohashid": 7075
                },
                {
                    "from": -31,
                    "fp": "b4ceb9c6-5266-40b1-b9a3-09ebf1c0f10d",
                    "points": {
                        "__gohashid": 7013,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2073.200946352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -1974.8278517133067,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -1974.8278517133067,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1886.4547570745224,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1876.4547570745224,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -58,
                    "tp": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                    "priority": 1,
                    "key": -9,
                    "__gohashid": 7076
                },
                {
                    "from": -31,
                    "fp": "da86fccd-6f3c-43ef-827f-fe247d0e6cb0",
                    "points": {
                        "__gohashid": 7014,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2073.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -1974.8278517133067,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -1974.8278517133067,
                                "y": -260.8156933725645,
                                "_isFrozen": true
                            },
                            {
                                "x": -1886.4547570745224,
                                "y": -260.8156933725645,
                                "_isFrozen": true
                            },
                            {
                                "x": -1876.4547570745224,
                                "y": -260.8156933725645,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -58,
                    "tp": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                    "priority": 1,
                    "key": -10,
                    "__gohashid": 7077
                },
                {
                    "from": -31,
                    "fp": "da86fccd-6f3c-43ef-827f-fe247d0e6cb0",
                    "points": {
                        "__gohashid": 7015,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2073.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -277.14130514528995,
                                "_isFrozen": true
                            },
                            {
                                "x": -2210.638446352091,
                                "y": -277.14130514528995,
                                "_isFrozen": true
                            },
                            {
                                "x": -2210.638446352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -2200.638446352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -31,
                    "tp": "4ecf07fa-56e1-4df0-a636-43fb61c41dca",
                    "priority": 1,
                    "key": -11,
                    "__gohashid": 7078
                },
                {
                    "from": -58,
                    "fp": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                    "points": {
                        "__gohashid": 7016,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1782.7169641057724,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1772.7169641057724,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1645.529205979538,
                                "y": -278.1943066538145,
                                "_isFrozen": true
                            },
                            {
                                "x": -1645.529205979538,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            },
                            {
                                "x": -1518.3414478533034,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            },
                            {
                                "x": -1508.3414478533034,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -32,
                    "tp": "e21e2eeb-cfc0-436b-8b55-8449ed1c8fa2",
                    "priority": 1,
                    "key": -12,
                    "__gohashid": 7079
                },
                {
                    "from": -32,
                    "fp": "3743255b-c90b-4145-ba4e-8c4b1dda46b3",
                    "points": {
                        "__gohashid": 7017,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1375.2354908220534,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            },
                            {
                                "x": -1365.2354908220534,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            },
                            {
                                "x": -1336.0569767055454,
                                "y": -291.4856633796467,
                                "_isFrozen": true
                            },
                            {
                                "x": -1336.0569767055454,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1306.878462589037,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1296.878462589037,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -33,
                    "tp": "23824707-4aee-41cf-88c3-ce006606f65f",
                    "priority": 1,
                    "key": -13,
                    "__gohashid": 7080
                },
                {
                    "from": -33,
                    "fp": "77c8a41d-fa4b-43dd-8972-9c708c60e77b",
                    "points": {
                        "__gohashid": 7018,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1195.669478214037,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1185.669478214037,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1031.3502870110865,
                                "y": -338.6559266556358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1031.3502870110865,
                                "y": -545.149901142796,
                                "_isFrozen": true
                            },
                            {
                                "x": -877.0310958081361,
                                "y": -545.149901142796,
                                "_isFrozen": true
                            },
                            {
                                "x": -867.0310958081361,
                                "y": -545.149901142796,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -34,
                    "tp": "562ba091-385b-4e48-8cde-847289481e7b",
                    "priority": 1,
                    "key": -14,
                    "__gohashid": 7081
                },
                {
                    "from": -2,
                    "fp": "928b9b5e-09a9-4c6c-b7df-c10edbe6b427",
                    "points": {
                        "__gohashid": 7019,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2372.6484478237126,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2372.6484478237126,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -2212.895201537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -2202.895201537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -62,
                    "tp": "fca3b4ba-c4b5-40ab-a98e-d287c1f8cca0",
                    "priority": 1,
                    "key": -15,
                    "__gohashid": 7082
                },
                {
                    "from": -2,
                    "fp": "61438fc8-3067-448d-adf3-1045ee85e047",
                    "points": {
                        "__gohashid": 7020,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2372.6484478237126,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2372.6484478237126,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2212.895201537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2202.895201537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -62,
                    "tp": "0e1c992d-39d2-4d34-9409-96411ef1599c",
                    "priority": 1,
                    "key": -16,
                    "__gohashid": 7083
                },
                {
                    "from": -62,
                    "fp": "8bfc2ab3-a159-48d7-9d5f-dd24b8cede14",
                    "points": {
                        "__gohashid": 7021,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2075.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": -8.859081680357576,
                                "_isFrozen": true
                            },
                            {
                                "x": -2212.895201537994,
                                "y": -8.859081680357576,
                                "_isFrozen": true
                            },
                            {
                                "x": -2212.895201537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -2202.895201537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -62,
                    "tp": "fca3b4ba-c4b5-40ab-a98e-d287c1f8cca0",
                    "priority": 1,
                    "key": -17,
                    "__gohashid": 7084
                },
                {
                    "from": -2,
                    "fp": "928b9b5e-09a9-4c6c-b7df-c10edbe6b427",
                    "points": {
                        "__gohashid": 7022,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2370.6168331777326,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2370.6168331777326,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2208.831972246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2198.831972246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -63,
                    "tp": "344c2e88-062c-44ec-b5a2-ad3d2e236487",
                    "priority": 1,
                    "key": -18,
                    "__gohashid": 7085
                },
                {
                    "from": -2,
                    "fp": "61438fc8-3067-448d-adf3-1045ee85e047",
                    "points": {
                        "__gohashid": 7023,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2370.6168331777326,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2370.6168331777326,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2208.831972246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2198.831972246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -63,
                    "tp": "74f04e52-834c-4c57-8e9c-f04facc2d76b",
                    "priority": 1,
                    "key": -19,
                    "__gohashid": 7086
                },
                {
                    "from": -63,
                    "fp": "ad4333fc-a07c-42a6-bd5c-97bb73edd134",
                    "points": {
                        "__gohashid": 7024,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2071.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 253.8746892257726,
                                "_isFrozen": true
                            },
                            {
                                "x": -2208.831972246035,
                                "y": 253.8746892257726,
                                "_isFrozen": true
                            },
                            {
                                "x": -2208.831972246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2198.831972246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -63,
                    "tp": "344c2e88-062c-44ec-b5a2-ad3d2e236487",
                    "priority": 1,
                    "key": -20,
                    "__gohashid": 7087
                },
                {
                    "from": -64,
                    "fp": "2d2372f5-d893-4772-9c49-908e48fece8e",
                    "points": {
                        "__gohashid": 7025,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1440.947608982594,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            },
                            {
                                "x": -1430.947608982594,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            },
                            {
                                "x": -1310.0941436480407,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            },
                            {
                                "x": -1310.0941436480407,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            },
                            {
                                "x": -1189.2406783134875,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            },
                            {
                                "x": -1179.2406783134875,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -65,
                    "tp": "8799b9f5-f64f-432a-8f18-4fba951379ce",
                    "priority": 1,
                    "key": -21,
                    "__gohashid": 7088
                },
                {
                    "from": -66,
                    "fp": "e1cc7160-3f1b-4aac-9d07-4cdeb11e2295",
                    "points": {
                        "__gohashid": 7026,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1430.4719210807748,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            },
                            {
                                "x": -1420.4719210807748,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            },
                            {
                                "x": -1380.9526295426995,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            },
                            {
                                "x": -1380.9526295426995,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            },
                            {
                                "x": -1341.4333380046241,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            },
                            {
                                "x": -1331.4333380046241,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -67,
                    "tp": "f9e62522-02de-4c5a-aa20-0792d1c0c38a",
                    "priority": 1,
                    "key": -22,
                    "__gohashid": 7089
                },
                {
                    "from": -67,
                    "fp": "25b20770-97d4-4bfe-9d9b-31389758ff84",
                    "points": {
                        "__gohashid": 7027,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1230.2243536296241,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            },
                            {
                                "x": -1220.2243536296241,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            },
                            {
                                "x": -1046.0417559521907,
                                "y": 313.53281015415604,
                                "_isFrozen": true
                            },
                            {
                                "x": -1046.0417559521907,
                                "y": 247.60289018694615,
                                "_isFrozen": true
                            },
                            {
                                "x": -871.859158274757,
                                "y": 247.60289018694615,
                                "_isFrozen": true
                            },
                            {
                                "x": -861.859158274757,
                                "y": 247.60289018694615,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -57,
                    "tp": "562ba091-385b-4e48-8cde-847289481e7b",
                    "priority": 1,
                    "key": -23,
                    "__gohashid": 7090
                },
                {
                    "from": -65,
                    "fp": "28b2cb34-9f69-4a9f-9f2a-bd41ffbea790",
                    "points": {
                        "__gohashid": 7028,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1078.0316939384875,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            },
                            {
                                "x": -1068.0316939384875,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            },
                            {
                                "x": -970.2310207603755,
                                "y": 50.0866525341632,
                                "_isFrozen": true
                            },
                            {
                                "x": -970.2310207603755,
                                "y": -165.1284630548618,
                                "_isFrozen": true
                            },
                            {
                                "x": -872.4303475822635,
                                "y": -165.1284630548618,
                                "_isFrozen": true
                            },
                            {
                                "x": -862.4303475822635,
                                "y": -165.1284630548618,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -41,
                    "tp": "562ba091-385b-4e48-8cde-847289481e7b",
                    "priority": 1,
                    "key": -24,
                    "__gohashid": 7091
                },
                {
                    "from": -62,
                    "fp": "3132b676-1d1f-45d5-87b0-93335b7bb94b",
                    "points": {
                        "__gohashid": 7029,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2075.457701537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -1959.0079835423148,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -1959.0079835423148,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            },
                            {
                                "x": -1852.5582655466353,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            },
                            {
                                "x": -1842.5582655466353,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -68,
                    "tp": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                    "priority": 1,
                    "key": -25,
                    "__gohashid": 7092
                },
                {
                    "from": -62,
                    "fp": "8bfc2ab3-a159-48d7-9d5f-dd24b8cede14",
                    "points": {
                        "__gohashid": 7030,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2075.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -1959.0079835423148,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -1959.0079835423148,
                                "y": 31.302732771319146,
                                "_isFrozen": true
                            },
                            {
                                "x": -1852.5582655466353,
                                "y": 31.302732771319146,
                                "_isFrozen": true
                            },
                            {
                                "x": -1842.5582655466353,
                                "y": 31.302732771319146,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -68,
                    "tp": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                    "priority": 1,
                    "key": -26,
                    "__gohashid": 7093
                },
                {
                    "from": -68,
                    "fp": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                    "points": {
                        "__gohashid": 7031,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1748.8204725778853,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            },
                            {
                                "x": -1738.8204725778853,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            },
                            {
                                "x": -1661.4370192958645,
                                "y": 13.924119490069144,
                                "_isFrozen": true
                            },
                            {
                                "x": -1661.4370192958645,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            },
                            {
                                "x": -1584.053566013844,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            },
                            {
                                "x": -1574.053566013844,
                                "y": 28.380858823622205,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -64,
                    "tp": "e850bc88-d10a-4fa1-a045-d9a7218a7a02",
                    "priority": 1,
                    "key": -27,
                    "__gohashid": 7094
                },
                {
                    "from": -69,
                    "fp": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                    "points": {
                        "__gohashid": 7032,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1747.7728002059023,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            },
                            {
                                "x": -1737.7728002059023,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            },
                            {
                                "x": -1655.6753391589637,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            },
                            {
                                "x": -1655.6753391589637,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            },
                            {
                                "x": -1573.5778781120248,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            },
                            {
                                "x": -1563.5778781120248,
                                "y": 318.1422003000329,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -66,
                    "tp": "29749d0b-77dd-4710-8c66-4216a8ef1a3d",
                    "priority": 1,
                    "key": -28,
                    "__gohashid": 7095
                },
                {
                    "from": -63,
                    "fp": "09a81c81-952c-409a-8256-794837f1e53a",
                    "points": {
                        "__gohashid": 7033,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2071.394472246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -1956.4525327103438,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -1956.4525327103438,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            },
                            {
                                "x": -1851.5105931746523,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            },
                            {
                                "x": -1841.5105931746523,
                                "y": 311.01864966135514,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -69,
                    "tp": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                    "priority": 1,
                    "key": -29,
                    "__gohashid": 7096
                },
                {
                    "from": -63,
                    "fp": "ad4333fc-a07c-42a6-bd5c-97bb73edd134",
                    "points": {
                        "__gohashid": 7034,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2071.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -1956.4525327103438,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -1956.4525327103438,
                                "y": 328.39726294260515,
                                "_isFrozen": true
                            },
                            {
                                "x": -1851.5105931746523,
                                "y": 328.39726294260515,
                                "_isFrozen": true
                            },
                            {
                                "x": -1841.5105931746523,
                                "y": 328.39726294260515,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -69,
                    "tp": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                    "priority": 1,
                    "key": -30,
                    "__gohashid": 7097
                },
                {
                    "from": -59,
                    "fp": "57889a76-a17a-476d-83d5-b19e549aa54b",
                    "points": {
                        "__gohashid": 7035,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2097.325026013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -1934.9372151819393,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -1934.9372151819393,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1782.5494043508647,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1772.5494043508647,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -36,
                    "tp": "e07fa0c7-12ed-45df-a5f4-3d9b0a948bbe",
                    "priority": 1,
                    "key": -31,
                    "__gohashid": 7098
                },
                {
                    "from": -59,
                    "fp": "5fdcf9df-fbde-4832-92bb-a10ecfd65e09",
                    "points": {
                        "__gohashid": 7036,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2097.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -1934.9372151819393,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -1934.9372151819393,
                                "y": 665.9280108353446,
                                "_isFrozen": true
                            },
                            {
                                "x": -1782.5494043508647,
                                "y": 665.9280108353446,
                                "_isFrozen": true
                            },
                            {
                                "x": -1772.5494043508647,
                                "y": 665.9280108353446,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -36,
                    "tp": "136bf4d9-f5f0-4bdc-b8c5-c09fcb68dea4",
                    "priority": 1,
                    "key": -32,
                    "__gohashid": 7099
                },
                {
                    "from": -2,
                    "fp": "928b9b5e-09a9-4c6c-b7df-c10edbe6b427",
                    "points": {
                        "__gohashid": 7037,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2383.582110061222,
                                "y": 161.9167790752616,
                                "_isFrozen": true
                            },
                            {
                                "x": -2383.582110061222,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -2234.762526013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -2224.762526013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -59,
                    "tp": "bc4b95e8-4d1a-4db9-95b6-ba59ced8dcdc",
                    "priority": 1,
                    "key": -33,
                    "__gohashid": 7100
                },
                {
                    "from": -2,
                    "fp": "61438fc8-3067-448d-adf3-1045ee85e047",
                    "points": {
                        "__gohashid": 7038,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2542.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2532.4016941094305,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2383.582110061222,
                                "y": 196.67400563776158,
                                "_isFrozen": true
                            },
                            {
                                "x": -2383.582110061222,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2234.762526013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2224.762526013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -59,
                    "tp": "052ef6c5-62d2-45a7-a1d7-cbaa356fe8ca",
                    "priority": 1,
                    "key": -34,
                    "__gohashid": 7101
                },
                {
                    "from": -59,
                    "fp": "5fdcf9df-fbde-4832-92bb-a10ecfd65e09",
                    "points": {
                        "__gohashid": 7039,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2097.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 631.5233367155024,
                                "_isFrozen": true
                            },
                            {
                                "x": -2234.762526013014,
                                "y": 631.5233367155024,
                                "_isFrozen": true
                            },
                            {
                                "x": -2234.762526013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -2224.762526013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -59,
                    "tp": "bc4b95e8-4d1a-4db9-95b6-ba59ced8dcdc",
                    "priority": 1,
                    "key": -35,
                    "__gohashid": 7102
                },
                {
                    "from": -36,
                    "fp": "338bfea2-bce3-4c11-a4e7-b5b38c2288df",
                    "points": {
                        "__gohashid": 7040,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1678.8116113821147,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1668.8116113821147,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1638.7426936770394,
                                "y": 648.5493975540945,
                                "_isFrozen": true
                            },
                            {
                                "x": -1638.7426936770394,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            },
                            {
                                "x": -1608.6737759719638,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            },
                            {
                                "x": -1598.6737759719638,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -61,
                    "tp": "0d2781cc-43b1-41f4-b64a-1d0c31015219",
                    "priority": 1,
                    "key": -36,
                    "__gohashid": 7103
                },
                {
                    "from": -61,
                    "fp": "cfb3b416-1a48-4300-9812-e8dd845bc460",
                    "points": {
                        "__gohashid": 7041,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1465.5678189407138,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            },
                            {
                                "x": -1455.5678189407138,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            },
                            {
                                "x": -1408.6867934516301,
                                "y": 654.9218884138588,
                                "_isFrozen": true
                            },
                            {
                                "x": -1408.6867934516301,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1361.8057679625465,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1351.8057679625465,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -72,
                    "tp": "b32309f3-f7e4-4b7f-9363-5283914cf2e6",
                    "priority": 1,
                    "key": -37,
                    "__gohashid": 7104
                },
                {
                    "from": -72,
                    "fp": "0e9fa1fc-d235-4682-90e6-9edfc0a84112",
                    "points": {
                        "__gohashid": 7042,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 625.6018348417838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 575.5845272227809,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 575.5845272227809,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 575.5845272227809,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "336e888b-339b-47ce-b45f-7b949a99f007",
                    "priority": 1,
                    "key": -38,
                    "__gohashid": 7105
                },
                {
                    "from": -31,
                    "fp": "da86fccd-6f3c-43ef-827f-fe247d0e6cb0",
                    "points": {
                        "__gohashid": 7043,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2073.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -1911.5778812112762,
                                "y": -223.69477194216495,
                                "_isFrozen": true
                            },
                            {
                                "x": -1911.5778812112762,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            },
                            {
                                "x": -1759.9548160704617,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            },
                            {
                                "x": -1749.9548160704617,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -28,
                    "tp": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                    "priority": 1,
                    "key": -39,
                    "__gohashid": 7106
                },
                {
                    "from": -31,
                    "fp": "b4ceb9c6-5266-40b1-b9a3-09ebf1c0f10d",
                    "points": {
                        "__gohashid": 7044,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2073.200946352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -2063.200946352091,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -1911.5778812112762,
                                "y": -241.07338522341493,
                                "_isFrozen": true
                            },
                            {
                                "x": -1911.5778812112762,
                                "y": -325.00740129156225,
                                "_isFrozen": true
                            },
                            {
                                "x": -1759.9548160704617,
                                "y": -325.00740129156225,
                                "_isFrozen": true
                            },
                            {
                                "x": -1749.9548160704617,
                                "y": -325.00740129156225,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -28,
                    "tp": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                    "priority": 1,
                    "key": -40,
                    "__gohashid": 7107
                },
                {
                    "from": -62,
                    "fp": "8bfc2ab3-a159-48d7-9d5f-dd24b8cede14",
                    "points": {
                        "__gohashid": 7045,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2075.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -1905.6319982282612,
                                "y": 44.587451522767424,
                                "_isFrozen": true
                            },
                            {
                                "x": -1905.6319982282612,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            },
                            {
                                "x": -1745.8062949185282,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            },
                            {
                                "x": -1735.8062949185282,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -29,
                    "tp": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                    "priority": 1,
                    "key": -41,
                    "__gohashid": 7108
                },
                {
                    "from": -62,
                    "fp": "3132b676-1d1f-45d5-87b0-93335b7bb94b",
                    "points": {
                        "__gohashid": 7046,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2075.457701537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -2065.457701537994,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -1905.6319982282612,
                                "y": 27.208838241517427,
                                "_isFrozen": true
                            },
                            {
                                "x": -1905.6319982282612,
                                "y": -77.15665466239449,
                                "_isFrozen": true
                            },
                            {
                                "x": -1745.8062949185282,
                                "y": -77.15665466239449,
                                "_isFrozen": true
                            },
                            {
                                "x": -1735.8062949185282,
                                "y": -77.15665466239449,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -29,
                    "tp": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                    "priority": 1,
                    "key": -42,
                    "__gohashid": 7109
                },
                {
                    "from": -63,
                    "fp": "ad4333fc-a07c-42a6-bd5c-97bb73edd134",
                    "points": {
                        "__gohashid": 7047,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2071.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2060,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -2060,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -1860,
                                "y": 307.3212224288976,
                                "_isFrozen": true
                            },
                            {
                                "x": -1860,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1743.649059070815,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1733.649059070815,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 8,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -30,
                    "tp": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                    "priority": 1,
                    "key": -43,
                    "__gohashid": 7110
                },
                {
                    "from": -63,
                    "fp": "09a81c81-952c-409a-8256-794837f1e53a",
                    "points": {
                        "__gohashid": 7048,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2071.394472246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2061.394472246035,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2060,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -2060,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -1860,
                                "y": 289.9426091476476,
                                "_isFrozen": true
                            },
                            {
                                "x": -1860,
                                "y": 145.92297084888318,
                                "_isFrozen": true
                            },
                            {
                                "x": -1743.649059070815,
                                "y": 145.92297084888318,
                                "_isFrozen": true
                            },
                            {
                                "x": -1733.649059070815,
                                "y": 145.92297084888318,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 8,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -30,
                    "tp": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                    "priority": 1,
                    "key": -44,
                    "__gohashid": 7111
                },
                {
                    "from": -28,
                    "fp": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                    "points": {
                        "__gohashid": 7049,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1632.8132145079617,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            },
                            {
                                "x": -1622.8132145079617,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            },
                            {
                                "x": -1083.2718931681293,
                                "y": -342.38601457281226,
                                "_isFrozen": true
                            },
                            {
                                "x": -1083.2718931681293,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                    "priority": 1,
                    "key": -45,
                    "__gohashid": 7112
                },
                {
                    "from": -29,
                    "fp": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                    "points": {
                        "__gohashid": 7050,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1618.6646933560282,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            },
                            {
                                "x": -1608.6646933560282,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            },
                            {
                                "x": -1076.1976325921623,
                                "y": -94.53526794364448,
                                "_isFrozen": true
                            },
                            {
                                "x": -1076.1976325921623,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                    "priority": 1,
                    "key": -46,
                    "__gohashid": 7113
                },
                {
                    "from": -30,
                    "fp": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                    "points": {
                        "__gohashid": 7051,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1616.507457508315,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1606.507457508315,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1075.1190146683057,
                                "y": 128.5443575676332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1075.1190146683057,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -184.8634048937504,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                    "priority": 1,
                    "key": -47,
                    "__gohashid": 7114
                },
                {
                    "from": -59,
                    "fp": "57889a76-a17a-476d-83d5-b19e549aa54b",
                    "points": {
                        "__gohashid": 7052,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2097.325026013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -1933.9056759909097,
                                "y": 667.5912566373773,
                                "_isFrozen": true
                            },
                            {
                                "x": -1933.9056759909097,
                                "y": 1026.8468649744227,
                                "_isFrozen": true
                            },
                            {
                                "x": -1780.4863259688054,
                                "y": 1026.8468649744227,
                                "_isFrozen": true
                            },
                            {
                                "x": -1770.4863259688054,
                                "y": 1026.8468649744227,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -42,
                    "tp": "d0b281f3-8d99-4232-bdff-ee6923066f40",
                    "priority": 1,
                    "key": -48,
                    "__gohashid": 7115
                },
                {
                    "from": -59,
                    "fp": "5fdcf9df-fbde-4832-92bb-a10ecfd65e09",
                    "points": {
                        "__gohashid": 7053,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -2097.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -2087.325026013014,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -1933.9056759909097,
                                "y": 684.9698699186274,
                                "_isFrozen": true
                            },
                            {
                                "x": -1933.9056759909097,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            },
                            {
                                "x": -1780.4863259688054,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            },
                            {
                                "x": -1770.4863259688054,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -42,
                    "tp": "ccfcf58b-33b7-4985-8dc4-add96deb67c1",
                    "priority": 1,
                    "key": -49,
                    "__gohashid": 7116
                },
                {
                    "from": -42,
                    "fp": "847acf16-a254-40e3-86d3-fd1f340a4f4e",
                    "points": {
                        "__gohashid": 7054,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1653.3447244063054,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            },
                            {
                                "x": -1643.3447244063054,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            },
                            {
                                "x": -1512.3066799925432,
                                "y": 1009.4682516931725,
                                "_isFrozen": true
                            },
                            {
                                "x": -1512.3066799925432,
                                "y": 1031.6812542613222,
                                "_isFrozen": true
                            },
                            {
                                "x": -1381.2686355787807,
                                "y": 1031.6812542613222,
                                "_isFrozen": true
                            },
                            {
                                "x": -1371.2686355787807,
                                "y": 1031.6812542613222,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -39,
                    "tp": "b3b3bd82-ad0e-4138-9652-0faa5cdf3438",
                    "priority": 1,
                    "key": -50,
                    "__gohashid": 7117
                },
                {
                    "from": -33,
                    "fp": "89d4a9e2-4b79-4f78-992e-ed41e76cf4b7",
                    "points": {
                        "__gohashid": 7055,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1195.669478214037,
                                "y": -215.8987000931358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1185.669478214037,
                                "y": -215.8987000931358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1031.3502870110865,
                                "y": -215.8987000931358,
                                "_isFrozen": true
                            },
                            {
                                "x": -1031.3502870110865,
                                "y": -422.392674580296,
                                "_isFrozen": true
                            },
                            {
                                "x": -877.0310958081361,
                                "y": -422.392674580296,
                                "_isFrozen": true
                            },
                            {
                                "x": -867.0310958081361,
                                "y": -422.392674580296,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -34,
                    "tp": "7aceee39-b110-46b6-9857-9611a500c52a",
                    "priority": 0,
                    "key": -51,
                    "__gohashid": 7118
                },
                {
                    "from": -65,
                    "fp": "069eed32-c7f2-4a27-91ab-aa0a0c451f27",
                    "points": {
                        "__gohashid": 7056,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1078.0316939384875,
                                "y": 172.84387909666322,
                                "_isFrozen": true
                            },
                            {
                                "x": -1068.0316939384875,
                                "y": 172.84387909666322,
                                "_isFrozen": true
                            },
                            {
                                "x": -970.2310207603755,
                                "y": 172.84387909666322,
                                "_isFrozen": true
                            },
                            {
                                "x": -970.2310207603755,
                                "y": -42.371236492361824,
                                "_isFrozen": true
                            },
                            {
                                "x": -872.4303475822635,
                                "y": -42.371236492361824,
                                "_isFrozen": true
                            },
                            {
                                "x": -862.4303475822635,
                                "y": -42.371236492361824,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -41,
                    "tp": "7aceee39-b110-46b6-9857-9611a500c52a",
                    "priority": 0,
                    "key": -52,
                    "__gohashid": 7119
                },
                {
                    "from": -67,
                    "fp": "412d32ae-ca7d-4b38-8971-c5edc24649ff",
                    "points": {
                        "__gohashid": 7057,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1230.2243536296241,
                                "y": 436.290036716656,
                                "_isFrozen": true
                            },
                            {
                                "x": -1220.2243536296241,
                                "y": 436.290036716656,
                                "_isFrozen": true
                            },
                            {
                                "x": -1046.0417559521907,
                                "y": 436.290036716656,
                                "_isFrozen": true
                            },
                            {
                                "x": -1046.0417559521907,
                                "y": 370.3601167494461,
                                "_isFrozen": true
                            },
                            {
                                "x": -871.859158274757,
                                "y": 370.3601167494461,
                                "_isFrozen": true
                            },
                            {
                                "x": -861.859158274757,
                                "y": 370.3601167494461,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -57,
                    "tp": "7aceee39-b110-46b6-9857-9611a500c52a",
                    "priority": 0,
                    "key": -53,
                    "__gohashid": 7120
                },
                {
                    "from": -72,
                    "fp": "baacb372-deae-4ef8-be11-0a9623113afb",
                    "points": {
                        "__gohashid": 7058,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 748.3590614042838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 748.3590614042838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 748.3590614042838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 698.341753785281,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 698.341753785281,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 698.341753785281,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "c711d850-73e2-411f-8aa4-d4b61e6c5389",
                    "priority": 0,
                    "key": -54,
                    "__gohashid": 7121
                },
                {
                    "from": -72,
                    "fp": "089ed31e-a1be-4df1-b35f-7d763e087087",
                    "points": {
                        "__gohashid": 7059,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 765.7376746855339,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 765.7376746855339,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 765.7376746855339,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 715.720367066531,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 715.720367066531,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 715.720367066531,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "2d1ce471-dbfc-426a-ac97-aa4ed16089be",
                    "priority": 0,
                    "key": -55,
                    "__gohashid": 7122
                },
                {
                    "from": -72,
                    "fp": "113ad5a8-cd89-43f1-ad32-20b1a1f3cec9",
                    "points": {
                        "__gohashid": 7060,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 783.1162879667838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 783.1162879667838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 783.1162879667838,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 733.098980347781,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 733.098980347781,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 733.098980347781,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "b14ab80d-ea39-4136-b5cf-2b63abc9f993",
                    "priority": 0,
                    "key": -56,
                    "__gohashid": 7123
                },
                {
                    "from": -72,
                    "fp": "29373434-2783-4a39-bf6a-043729d45e68",
                    "points": {
                        "__gohashid": 7061,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 800.4949012480338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 800.4949012480338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 800.4949012480338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 750.4775936290309,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 750.4775936290309,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 750.4775936290309,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "b016ca70-e110-4db7-8a3c-2b4717e13b2d",
                    "priority": 0,
                    "key": -57,
                    "__gohashid": 7124
                },
                {
                    "from": -72,
                    "fp": "b7dbb167-1ad7-4ab1-9b44-dac492753919",
                    "points": {
                        "__gohashid": 7062,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 817.8735145292839,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 817.8735145292839,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 817.8735145292839,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 767.856206910281,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 767.856206910281,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 767.856206910281,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "26e950c0-46b0-4102-9657-64cbec70b8ff",
                    "priority": 0,
                    "key": -58,
                    "__gohashid": 7125
                },
                {
                    "from": -72,
                    "fp": "63fba323-e856-4aff-aa45-61e19d027c18",
                    "points": {
                        "__gohashid": 7063,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1256.4747132750465,
                                "y": 835.2521278105338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1246.4747132750465,
                                "y": 835.2521278105338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 835.2521278105338,
                                "_isFrozen": true
                            },
                            {
                                "x": -1141.136529573812,
                                "y": 785.234820191531,
                                "_isFrozen": true
                            },
                            {
                                "x": -1035.798345872577,
                                "y": 785.234820191531,
                                "_isFrozen": true
                            },
                            {
                                "x": -1025.798345872577,
                                "y": 785.234820191531,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -17,
                    "tp": "502f58d2-cfd7-44c8-ade5-ae1141b2739c",
                    "priority": 0,
                    "key": -59,
                    "__gohashid": 7126
                },
                {
                    "from": -28,
                    "fp": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                    "points": {
                        "__gohashid": 7064,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1632.8132145079617,
                                "y": -219.62878801031223,
                                "_isFrozen": true
                            },
                            {
                                "x": -1622.8132145079617,
                                "y": -219.62878801031223,
                                "_isFrozen": true
                            },
                            {
                                "x": -1083.2718931681293,
                                "y": -219.62878801031223,
                                "_isFrozen": true
                            },
                            {
                                "x": -1083.2718931681293,
                                "y": -62.10617833125042,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -62.10617833125042,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -62.10617833125042,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "e6bd1015-9c82-4bd7-8284-10bc021c6614",
                    "priority": 0,
                    "key": -60,
                    "__gohashid": 7127
                },
                {
                    "from": -29,
                    "fp": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                    "points": {
                        "__gohashid": 7065,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1618.6646933560282,
                                "y": 28.221958618855517,
                                "_isFrozen": true
                            },
                            {
                                "x": -1608.6646933560282,
                                "y": 28.221958618855517,
                                "_isFrozen": true
                            },
                            {
                                "x": -1076.1976325921623,
                                "y": 28.221958618855517,
                                "_isFrozen": true
                            },
                            {
                                "x": -1076.1976325921623,
                                "y": -44.72756505000042,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -44.72756505000042,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -44.72756505000042,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "5cc15bfb-687f-47b0-b106-b16a3f6b7634",
                    "priority": 0,
                    "key": -61,
                    "__gohashid": 7128
                },
                {
                    "from": -30,
                    "fp": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                    "points": {
                        "__gohashid": 7066,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1616.507457508315,
                                "y": 251.3015841301332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1606.507457508315,
                                "y": 251.3015841301332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1075.1190146683057,
                                "y": 251.3015841301332,
                                "_isFrozen": true
                            },
                            {
                                "x": -1075.1190146683057,
                                "y": -27.348951768750425,
                                "_isFrozen": true
                            },
                            {
                                "x": -543.7305718282967,
                                "y": -27.348951768750425,
                                "_isFrozen": true
                            },
                            {
                                "x": -533.7305718282967,
                                "y": -27.348951768750425,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -35,
                    "tp": "ce904a6d-2aad-4c91-ad4b-170e908df9d0",
                    "priority": 0,
                    "key": -62,
                    "__gohashid": 7129
                },
                {
                    "from": -42,
                    "fp": "4c41adea-3ca2-4061-b2da-7caa5ca4c3c2",
                    "points": {
                        "__gohashid": 7067,
                        "_isFrozen": true,
                        "s": [
                            {
                                "x": -1653.3447244063054,
                                "y": 1132.2254782556727,
                                "_isFrozen": true
                            },
                            {
                                "x": -1643.3447244063054,
                                "y": 1132.2254782556727,
                                "_isFrozen": true
                            },
                            {
                                "x": -1512.3066799925432,
                                "y": 1132.2254782556727,
                                "_isFrozen": true
                            },
                            {
                                "x": -1512.3066799925432,
                                "y": 1154.4384808238224,
                                "_isFrozen": true
                            },
                            {
                                "x": -1381.2686355787807,
                                "y": 1154.4384808238224,
                                "_isFrozen": true
                            },
                            {
                                "x": -1371.2686355787807,
                                "y": 1154.4384808238224,
                                "_isFrozen": true
                            }
                        ],
                        "Ia": 6,
                        "Pa": null,
                        "yg": null
                    },
                    "to": -39,
                    "tp": "e6bd1015-9c82-4bd7-8284-10bc021c6614",
                    "priority": 0,
                    "key": -63,
                    "__gohashid": 7130
                }
            ],
            "key": "4a44862d-2ee7-42f8-80bc-1a881b4dc5f8",
            "comments": [
                {
                    "key": -51,
                    "text": "Comment",
                    "loc": "864.4819674358505 2866.528738105236",
                    "category": "comment",
                    "__gohashid": 7002
                },
                {
                    "key": -40,
                    "text": "Comment",
                    "loc": "-2343.0887940046823 -527.2563253953683",
                    "category": "comment",
                    "__gohashid": 7003
                }
            ]
        }
    ],
    "collections": {},
    "canvas": [],
    "id": "3731ea26-a4ab-4d43-b63a-bef95c2281eb",
    "dynamic": false,
    "lock": false,
    "updated_time": 1712816235000
};
const deploymentDS = {
    "devices": [],
    "target_devices": [],
    "segments": [],
    // g6图形存储格式 by twg
    "graphData": {}
}
export {
    algorithmDS,
    deploymentDS
}