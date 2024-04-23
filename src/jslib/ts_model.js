const tsModel = [
    {
     "caption": "Conversion functions",
     "en-us": "Conversion functions",
     "name": "转换函数",
     "header": "folder",
     "children": [
      {
       "name": "INT_STR",
       "en-us-tip": "Integer to String",
       "zh-hans-tip": "整数 转 字符串",
       "snippet": "${1:WSTRING} = INT_TO_WSTRING(${2:DINT});",
       "meta": "ExtFunction",
       "id": "4d6c11ab-205a-4390-8a72-b7ba981138aa",
       "user": "admin"
      },
      {
       "name": "STR_INT",
       "en-us-tip": "String to Integer",
       "zh-hans-tip": "字符串 转 整数",
       "snippet": "${1:DINT} = WSTRING_TO_INT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "fe1e5c57-20fd-4c74-823e-ac8a2c41132f",
       "user": "admin"
      },
      {
       "name": "DINT_STR",
       "en-us-tip": "双精度数 转 字符串",
       "zh-hans-tip": "Double Integer 转 String",
       "snippet": "${1:WSTRING} = DINT_TO_WSTRING(${2:dint});",
       "meta": "ExtFunction",
       "id": "75be99d4-81ac-491f-a133-27f6a41dfacb",
       "user": "admin"
      },
      {
       "name": "STR_DINT",
       "en-us-tip": "String to Double Integer",
       "zh-hans-tip": "字符串 转 双精度数",
       "snippet": "${1:dint} = WSTRING_TO_DINT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "668c9ed2-c9f8-45b6-b458-81cd00faa7f8",
       "user": "admin"
      },
      {
       "name": "LINT_STR",
       "en-us-tip": "Long Integer to String",
       "zh-hans-tip": "长整数 转 字符串",
       "snippet": "${1:WSTRING} = LINT_TO_WSTRING(${2:lint});",
       "meta": "ExtFunction",
       "id": "b882020a-08f8-4884-b5db-c1914129e3df",
       "user": "admin"
      },
      {
       "name": "STR_LINT",
       "en-us-tip": "String to Long Integer",
       "zh-hans-tip": "字符串 转 长整数",
       "snippet": "${1:lint} = WSTRING_TO_LINT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "f4f1e851-755c-41bf-b1bb-3117b2227bb7",
       "user": "admin"
      },
      {
       "name": "UINT_STR",
       "en-us-tip": "Unsigned Integer to String",
       "zh-hans-tip": "无符号整数 转 字符串",
       "snippet": "${1:WSTRING} = UINT_TO_WSTRING(${2:uint});",
       "meta": "ExtFunction",
       "id": "5b2a6a74-d5ee-4a2c-8130-e74657b73309",
       "user": "admin"
      },
      {
       "name": "STR_UINT",
       "en-us-tip": "String to Unsigned Integer",
       "zh-hans-tip": "字符串 转 无符号整数",
       "snippet": "${1:uint} = WSTRING_TO_UINT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "f1263f59-548f-4d3c-938b-1e63667866ca",
       "user": "admin"
      },
      {
       "name": "UDINT_STR",
       "en-us-tip": "Unsigned Double Integer to String",
       "zh-hans-tip": "无符号双精度数 转 字符串",
       "snippet": "${1:WSTRING} = UDINT_TO_WSTRING(${2:udint});",
       "meta": "ExtFunction",
       "id": "951a12fc-cbef-4c2d-bb8f-d2ba0e69b39b",
       "user": "admin"
      },
      {
       "name": "STR_UDINT",
       "en-us-tip": "String to Unsigned Double Integer",
       "zh-hans-tip": "字符串 转 无符号双精度数",
       "snippet": "${1:udint} = WSTRING_TO_UDINT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "d9785604-14dd-46e8-9039-bd8611e57e42",
       "user": "admin"
      },
      {
       "name": "ULINT_STR",
       "en-us-tip": "Unsigned Long Integer to String",
       "zh-hans-tip": "无符号长整数数 转 字符串",
       "snippet": "${1:WSTRING} = ULINT_TO_WSTRING(${2:ulint});",
       "meta": "ExtFunction",
       "id": "7b21c962-d661-440c-ae26-14e642c89dd3",
       "user": "admin"
      },
      {
       "name": "STR_ULINT",
       "en-us-tip": "String to Unsigned Long Integer",
       "zh-hans-tip": "字符串 转 无符号长整数数",
       "snippet": "${1:ulint} = WSTRING_TO_ULINT(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "8942b968-c932-4a84-b5f6-ca337a7c1c35",
       "user": "admin"
      },
      {
       "name": "REAL_STR",
       "en-us-tip": "Real to String",
       "zh-hans-tip": "实数 转 字符串",
       "snippet": "${1:WSTRING} = REAL_TO_WSTRING(${2:real});",
       "meta": "ExtFunction",
       "id": "c157cb14-9479-44ed-af4d-b8a32dccabbf",
       "user": "admin"
      },
      {
       "name": "STR_REAL",
       "en-us-tip": "String to Real",
       "zh-hans-tip": "字符串 转 实数",
       "snippet": "${1:real} = WSTRING_TO_REAL(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "51701d51-0c29-4738-a8ff-6c819c6e815c",
       "user": "admin"
      },
      {
       "name": "SINT_STR",
       "en-us-tip": "Short Integer to String",
       "zh-hans-tip": "短整数 转 字符串",
       "snippet": "${1:WSTRING} = SINT_TO_WSTRING(${2:sint});",
       "meta": "ExtFunction",
       "id": "5a0f9c97-a9c0-4672-a3a4-21fa6b641015",
       "user": "admin"
      },
      {
       "name": "STR_SINT",
       "en-us-tip": "String to Short Integer",
       "zh-hans-tip": "字符串 转 短整数",
       "snippet": "WSTRING_TO_SINT(${1:WSTRING}, ${2:sint});",
       "meta": "ExtFunction",
       "id": "a9429325-e486-48f1-8292-e65299506195",
       "user": "admin"
      },
      {
       "name": "REAL_DINT",
       "en-us-tip": "Real to Double Integer",
       "zh-hans-tip": "实数 转 双精度数",
       "snippet": "${1:dint} = REAL_TO_DINT(${2:real});",
       "meta": "ExtFunction",
       "id": "51fdf459-411c-49bc-87bf-3c8889ec7a8f",
       "user": "admin"
      },
      {
       "name": "DINT_REAL",
       "en-us-tip": "Double Integer to Real",
       "zh-hans-tip": "双精度数 转 实数",
       "snippet": "${1:real} = DINT_TO_REAL(${2:dint});",
       "meta": "ExtFunction",
       "id": "aa4df75b-b041-4387-9ed7-7546125f97d5",
       "user": "admin"
      },
      {
       "name": "REAL_INT",
       "en-us-tip": "Real to Integer",
       "zh-hans-tip": "实数 转 整数",
       "snippet": "${1:DINT} = REAL_TO_INT(${2:real});",
       "meta": "ExtFunction",
       "id": "4877236d-c605-4d52-9eb4-2702f2d32f6b",
       "user": "admin"
      },
      {
       "name": "INT_REAL",
       "en-us-tip": "Integer to Real",
       "zh-hans-tip": "整数 转 实数",
       "snippet": "${1:real} = INT_TO_REAL(${2:DINT});",
       "meta": "ExtFunction",
       "id": "4aa1f566-97c5-49e3-b179-f873b6840f00",
       "user": "admin"
      },
      {
       "name": "REAL_LINT",
       "en-us-tip": "Real to Long Integer",
       "zh-hans-tip": "实数 转 长整数",
       "snippet": "${1:lint} = REAL_TO_LINT(${2:real});",
       "meta": "ExtFunction",
       "id": "a6393c40-1d33-4d68-975f-6d5d3719dd7c",
       "user": "admin"
      },
      {
       "name": "LINT_REAL",
       "en-us-tip": "Long Integer to Real",
       "zh-hans-tip": "长整数 转 实数",
       "snippet": "${1:real} = LINT_TO_REAL(${2:lint});",
       "meta": "ExtFunction",
       "id": "1ce1305f-ac4c-4675-8c75-3af4911acccd",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "System Functions",
     "en-us": "System Functions",
     "name": "系统函数",
     "header": "folder",
     "children": [
      {
       "name": "GETTIME",
       "en-us-tip": "Get Current Time",
       "zh-hans-tip": "获取当前时间",
       "snippet": "${1:val} = GETTIME();",
       "meta": "ExtFunction",
       "id": "9bc0233e-42b8-4366-94d8-3498b4423be9",
       "user": "admin"
      },
      {
       "name": "LOGERROR",
       "en-us-tip": "Print Debug Information",
       "zh-hans-tip": "打印（LOG）调试信息",
       "snippet": "LOGERROR(${1:WSTRING data});",
       "meta": "ExtFunction",
       "id": "1e79b622-ddfd-41eb-bbaa-1dddc4e67e22",
       "user": "admin"
      },
      {
       "name": "SYSTEM",
       "en-us-tip": "Print SYSTEM Information",
       "zh-hans-tip": "打印（LOG）系统信息",
       "snippet": "SYSTEM(${1:WSTRING data});",
       "meta": "ExtFunction",
       "id": "be097a63-3013-4eb1-80be-424a9cb3109e",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "Arithmetic Function and Operators",
     "en-us": "Arithmetic Function and Operators",
     "name": "算术函数和运算符",
     "header": "folder",
     "children": [
      {
       "name": "ADD",
       "en-us-tip": "Addition",
       "zh-hans-tip": "加",
       "snippet": "${1:val} := ADD(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "947342a6-4454-4232-8dcd-c24e9d1de9b4",
       "user": "admin"
      },
      {
       "name": "SUB",
       "en-us-tip": "Subtraction",
       "zh-hans-tip": "减",
       "snippet": "${1:val} := SUB(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "effd81e0-2576-4fbc-8de1-f75da519ff57",
       "user": "admin"
      },
      {
       "name": "MUL",
       "en-us-tip": "Multiplication",
       "zh-hans-tip": "乘",
       "snippet": "${1:val} := MUL(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "9a19404f-8341-4cdd-b357-e2b0f685e6d6",
       "user": "admin"
      },
      {
       "name": "DIV",
       "en-us-tip": "Division",
       "zh-hans-tip": "除",
       "snippet": "${1:val} := DIV(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "e2b418e5-181e-4769-b8e6-21320b00ad8a",
       "user": "admin"
      },
      {
       "name": "MOD",
       "en-us-tip": "Modulo",
       "zh-hans-tip": "取余",
       "snippet": "${1:val} := MOD(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "165f8975-5783-4d0f-95ca-c4c3b31923a0",
       "user": "admin"
      },
      {
       "name": "EXPT",
       "en-us-tip": "Raise to power",
       "zh-hans-tip": "指数",
       "snippet": "${1:real} := EXPT(${2:real}, ${3:real});",
       "meta": "ExtFunction",
       "id": "83a84a81-9933-46f4-88b2-95a291b5c4f3",
       "user": "admin"
      },
      {
       "name": "MOVE",
       "en-us-tip": "Assignment",
       "zh-hans-tip": "赋值",
       "snippet": "${1:val} := MOVE(${2:val});",
       "meta": "ExtFunction",
       "id": "244ab666-9d1d-49b5-aa1d-6aa83c7cc329",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "BitShift Functions",
     "en-us": "BitShift Functions",
     "name": "位移函数",
     "header": "folder",
     "children": [
      {
       "name": "SHL",
       "en-us-tip": "Move bytes to the left",
       "zh-hans-tip": "向左移动字节",
       "snippet": "${1:val} := SHL(${2:val}, ${3:DINT step});",
       "meta": "ExtFunction",
       "id": "37512bd7-0067-4ae3-a040-ec3fb5e33a28",
       "user": "admin"
      },
      {
       "name": "SHR",
       "en-us-tip": "Move bytes to the right",
       "zh-hans-tip": "向右移动字节",
       "snippet": "${1:val} := SHR(${2:val}, ${3:DINT step});",
       "meta": "ExtFunction",
       "id": "09c930d8-3bbf-428c-9b1e-2fe5385229a9",
       "user": "admin"
      },
      {
       "name": "ROL",
       "en-us-tip": "Loop Left",
       "zh-hans-tip": "循环左移",
       "snippet": "${1:val} := ROL(${2:val}, ${3:DINT step});",
       "meta": "ExtFunction",
       "id": "4df29a48-3a7a-44ae-9d13-6d4fa156277d",
       "user": "admin"
      },
      {
       "name": "ROR",
       "en-us-tip": "Loop Right",
       "zh-hans-tip": "循环右移",
       "snippet": "${1:val} := ROR(${2:val}, ${3:DINT step});",
       "meta": "ExtFunction",
       "id": "39a1cad9-0c5c-42e8-8923-647891243a20",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "Bitwise Boolean Functions and Operators",
     "en-us": "Bitwise Boolean Functions and Operators",
     "name": "位运算函数",
     "header": "folder",
     "children": [
      {
       "name": "AND",
       "en-us-tip": "Logic and",
       "zh-hans-tip": "逻辑与",
       "snippet": "${1:val} := AND(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "bf123463-8e98-4566-ab76-a683b75f4e9f",
       "user": "admin"
      },
      {
       "name": "OR",
       "en-us-tip": "Logic OR",
       "zh-hans-tip": "逻辑或",
       "snippet": "${1:val} := OR(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "7bf68589-9a0a-4e8e-9968-79f39f960244",
       "user": "admin"
      },
      {
       "name": "NOT",
       "en-us-tip": "Logic NOT",
       "zh-hans-tip": "逻辑非",
       "snippet": "${1:val} := NOT(${2:val});",
       "meta": "ExtFunction",
       "id": "6174ccdf-9dc7-4272-90bb-754b20266084",
       "user": "admin"
      },
      {
       "name": "XOR",
       "en-us-tip": "Logic XOR",
       "zh-hans-tip": "逻辑异或",
       "snippet": "${1:val} := XOR(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "1458fd1b-7729-4fbb-9946-79f3736d069a",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "Selection Functions",
     "en-us": "Selection Functions",
     "name": "选择函数",
     "header": "folder",
     "children": [
      {
       "name": "LIMIT",
       "en-us-tip": "Returns a value limited to a maximum or minimum",
       "zh-hans-tip": "返回限制为最大值或最小值的值",
       "snippet": "${1:val} := LIMIT(${2:val},${3:val},${4:val});",
       "meta": "ExtFunction",
       "id": "ad34c7b0-5b78-4dc9-a88a-0b04b10c5805",
       "user": "admin"
      },
      {
       "name": "MAX",
       "en-us-tip": "Returns the highest value input",
       "zh-hans-tip": "返回最大值",
       "snippet": "${1:val} := MAX(${2:val},${3:val}...);",
       "meta": "ExtFunction",
       "id": "89cd661f-122b-4413-9c4f-cbe881c6ebf1",
       "user": "admin"
      },
      {
       "name": "MIN",
       "en-us-tip": "Returns the lowest value input",
       "zh-hans-tip": "返回最小值",
       "snippet": "${1:val} := MAX(${2:val},${3:val}...);",
       "meta": "ExtFunction",
       "id": "357a44c3-f4d4-4933-b217-85250fcdaf4b",
       "user": "admin"
      },
      {
       "name": "MUX",
       "en-us-tip": "Return one of N values depending on an integer selector value",
       "zh-hans-tip": "多路选择器",
       "snippet": "${1:val} := MUX(${2:int},${3:val},${4:val}...);",
       "meta": "ExtFunction",
       "id": "a71a60a9-cbcc-40d3-b71d-f3f3dc83dca9",
       "user": "admin"
      },
      {
       "name": "SEL",
       "en-us-tip": "Returns one of two values depending on a BOOL value",
       "zh-hans-tip": "选择器,根据布尔值返回两个值之一 2=false, 返回3; 2=true, 返回4",
       "snippet": "${1:val} := SEL(${2:bool},${3:val},${4:val});",
       "meta": "ExtFunction",
       "id": "1db35884-f25c-4a15-a328-8bf23ea0bf01",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "Comparison Functions",
     "en-us": "Comparison Functions",
     "name": "比较函数",
     "header": "folder",
     "children": [
      {
       "name": "EQ",
       "en-us-tip": "Equal",
       "zh-hans-tip": "等于",
       "snippet": "${1:bool} := EQ(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "44814191-480b-48cf-8480-1379ac7acea9",
       "user": "admin"
      },
      {
       "name": "GE",
       "en-us-tip": "Greater than or equal to",
       "zh-hans-tip": "大于等于",
       "snippet": "${1:bool} := GE(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "0c1f9739-7ff5-4d9a-a1e9-e8a61c7184a2",
       "user": "admin"
      },
      {
       "name": "GT",
       "en-us-tip": "Greater than",
       "zh-hans-tip": "大于",
       "snippet": "${1:bool} := GT(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "804d31c0-ef8b-47d8-b5f7-c4de21ef4df8",
       "user": "admin"
      },
      {
       "name": "LE",
       "en-us-tip": "Less than or equal to",
       "zh-hans-tip": "小于等于",
       "snippet": "${1:bool} := LE(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "c4cc5ffd-946e-4276-a716-852f807630ec",
       "user": "admin"
      },
      {
       "name": "LT",
       "en-us-tip": "Less than",
       "zh-hans-tip": "小于",
       "snippet": "${1:bool} := LT(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "d9ddb43c-f2e7-40f8-9399-03a4447203c6",
       "user": "admin"
      },
      {
       "name": "NE",
       "en-us-tip": "Not equal to",
       "zh-hans-tip": "不等于",
       "snippet": "${1:bool} := NE(${2:val},${3:val});",
       "meta": "ExtFunction",
       "id": "13d22c0e-1fe0-40de-9736-293806528315",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "String functions",
     "en-us": "String functions",
     "name": "字符串函数",
     "header": "folder",
     "children": [
      {
       "name": "LEFT",
       "en-us-tip": "Take the character of the N-bit on the left side of the WSTRING",
       "zh-hans-tip": "取字符串内左边N位的字符",
       "snippet": "${1:WSTRING} := LEFT(${2:WSTRING}, ${3:DINT length});",
       "meta": "ExtFunction",
       "id": "ea5332d2-fe4d-4323-821d-708df76339ee",
       "user": "admin"
      },
      {
       "name": "RIGHT",
       "en-us-tip": "Take the character of the N-bit on the right side of the WSTRING",
       "zh-hans-tip": "取字符串内右边N位的字符",
       "snippet": "${1:WSTRING} := RIGHT(${2:WSTRING}, ${3:DINT length});",
       "meta": "ExtFunction",
       "id": "54fa202e-bfe7-4d3e-aaa6-f6891ce078b4",
       "user": "admin"
      },
      {
       "name": "MID",
       "en-us-tip": "Take the character of the N-bit on the middle side of the WSTRING",
       "zh-hans-tip": "取字符串内中间N位的字符",
       "snippet": "${1:WSTRING} := MID(${2:WSTRING}, ${3:DINT start}, ${4:DINT length});",
       "meta": "ExtFunction",
       "id": "fbd63f28-b757-4dc6-95c3-6982fff4b2a4",
       "user": "admin"
      },
      {
       "name": "LEN",
       "en-us-tip": "Take WSTRING length",
       "zh-hans-tip": "取字符串长度",
       "snippet": "${1:DINT} := LEN(${2:WSTRING});",
       "meta": "ExtFunction",
       "id": "324e861f-2f3a-476b-9496-f3fe4011ed2c",
       "user": "admin"
      },
      {
       "name": "CONCAT",
       "en-us-tip": "Merge two WSTRINGs",
       "zh-hans-tip": "合并两个字符串",
       "snippet": "${1:WSTRING} := CONCAT(${2:WSTRING1}, ${3:WSTRING2});",
       "meta": "ExtFunction",
       "id": "30c0e713-7980-4d72-8f32-a7f2546234c1",
       "user": "admin"
      },
      {
       "name": "INSERT",
       "en-us-tip": "Insert n-bit characters within a WSTRING",
       "zh-hans-tip": "在字符串内插入N位的字符",
       "snippet": "${1:WSTRING} := INSERT(${2:WSTRING1}, ${3:WSTRING2}, ${4:DINT pos});",
       "meta": "ExtFunction",
       "id": "373f8097-cbd5-4079-920a-570c80d50f01",
       "user": "admin"
      },
      {
       "name": "DELETE",
       "en-us-tip": "Delete n-bit characters within a WSTRING",
       "zh-hans-tip": "在字符串内删除N位的字符",
       "snippet": "${1:WSTRING} := DELETE(${2:WSTRING}, ${3:DINT start}, ${4:DINT length});",
       "meta": "ExtFunction",
       "id": "b8b95baf-0c84-4bec-b3f0-340f42bb09d8",
       "user": "admin"
      },
      {
       "name": "REPLACE",
       "en-us-tip": "Replace n-bit characters within a WSTRING",
       "zh-hans-tip": "在字符串内替换N位的字符",
       "snippet": "${1:WSTRING} := REPLACE(${2:WSTRING1}, ${3:WSTRING2}, ${4:DINT start}, ${5:DINT length});",
       "meta": "ExtFunction",
       "id": "aaa3902e-835d-41e0-bf8a-5a614f66be5f",
       "user": "admin"
      },
      {
       "name": "FIND",
       "en-us-tip": "Find n-bit characters within a WSTRING",
       "zh-hans-tip": "在字符串内查找N位的字符",
       "snippet": "${1:DINT} := FIND(${2:WSTRING1}, ${3:WSTRING2});",
       "meta": "ExtFunction",
       "id": "7a1a502f-95e5-4c3c-b24c-40b012ff7562",
       "user": "admin"
      }
     ]
    },
    {
     "caption": "Mathematical functions",
     "en-us": "Mathematical functions",
     "name": "数学函数",
     "header": "folder",
     "children": [
      {
       "name": "ABS",
       "en-us-tip": "Take absolute values for integers",
       "zh-hans-tip": "对整数取绝对值",
       "snippet": "${1:val} = ABS(${2:val});",
       "meta": "ExtFunction",
       "id": "5207378a-9cdb-457a-a85c-36fa4a6f4baf",
       "user": "admin"
      },
      {
       "name": "FABS",
       "en-us-tip": "Take absolute values for floats",
       "zh-hans-tip": "对整数取绝对值",
       "snippet": "${1:double} = FABS(${2:double});",
       "meta": "ExtFunction",
       "id": "da45c2c8-15c4-4862-958b-85c71cef9ba8",
       "user": "admin"
      },
      {
       "name": "SQRT",
       "en-us-tip": "Calculating the square root of a non-negative real number",
       "zh-hans-tip": "计算一个非负实数的平方根",
       "snippet": "${1:val} = SQRT(${2:val});",
       "meta": "ExtFunction",
       "id": "2b78372b-52ea-445f-80aa-5a1dc3ddbc2f",
       "user": "admin"
      },
      {
       "name": "LN",
       "en-us-tip": "Calculate a true number e as a base value",
       "zh-hans-tip": "计算一个真数以e为底数的对数值",
       "snippet": "${1:val} = LN(${2:val});",
       "meta": "ExtFunction",
       "id": "287036b5-3d89-442d-a1eb-6081a8b8b041",
       "user": "admin"
      },
      {
       "name": "LOG",
       "en-us-tip": "Calculate a pair of values with a true number of 10 as a base",
       "zh-hans-tip": "计算一个真数以10为底数的对数值",
       "snippet": "${1:val} = LOG(${2:val});",
       "meta": "ExtFunction",
       "id": "c3522e73-f527-475b-9f8b-4ca935a0bb79",
       "user": "admin"
      },
      {
       "name": "EXP",
       "en-us-tip": "Calculating the X-side value based on e",
       "zh-hans-tip": "计算以e为底的X次方值",
       "snippet": "${1:val} = EXP(${2:val});",
       "meta": "ExtFunction",
       "id": "716efc94-e695-4b13-811a-ea91fe900f59",
       "user": "admin"
      },
      {
       "name": "SIN",
       "en-us-tip": "Calculate the sine value of a angle",
       "zh-hans-tip": "计算某个角的正弦值",
       "snippet": "${1:val} = SIN(${2:val});",
       "meta": "ExtFunction",
       "id": "d19d2328-42bd-4d1d-976d-e414020a4a52",
       "user": "admin"
      },
      {
       "name": "COS",
       "en-us-tip": "Calculate the cosine value of a angle",
       "zh-hans-tip": "计算某个角的余弦值",
       "snippet": "${1:val} = COS(${2:val});",
       "meta": "ExtFunction",
       "id": "1a8aec62-b8a8-4000-92a1-71865a99d165",
       "user": "admin"
      },
      {
       "name": "TAN",
       "en-us-tip": "Calculate the tangent value of a angle",
       "zh-hans-tip": "计算某个角的正切值",
       "snippet": "${1:val} = TAN(${2:val});",
       "meta": "ExtFunction",
       "id": "d56a8916-f0db-45d1-84bb-12c363fe565c",
       "user": "admin"
      },
      {
       "name": "ASIN",
       "en-us-tip": "Calculate the arcsine value of a angle",
       "zh-hans-tip": "计算某个角的反正弦值",
       "snippet": "${1:val} = ASIN(${2:val});",
       "meta": "ExtFunction",
       "id": "e48a8e4d-f6c0-4e58-b9b5-7decbea66649",
       "user": "admin"
      },
      {
       "name": "ACOS",
       "en-us-tip": "Calculate the arccosine of an angle",
       "zh-hans-tip": "计算某个角的反余弦值",
       "snippet": "${1:val} = ASIN(${2:val});",
       "meta": "ExtFunction",
       "id": "c2ccda1e-a060-48be-90a1-a2a56fdfb068",
       "user": "admin"
      },
      {
       "name": "ATAN",
       "en-us-tip": "Calculate the arctangent of an angle",
       "zh-hans-tip": "计算某个角的反正切值",
       "snippet": "${1:val} = ATAN(${2:val});",
       "meta": "ExtFunction",
       "id": "343b9ebf-ef52-465f-9e35-aeb9bd6d1d51",
       "user": "admin"
      }
     ]
    }
   ];

export {
    tsModel
}