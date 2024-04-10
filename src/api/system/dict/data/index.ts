// import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DictDataForm, DictDataQuery, DictDataVO } from './types';
// 根据字典类型查询字典数据信息
// export function getDicts(dictType: string): AxiosPromise<DictDataVO[]> {//不用后端先不用axios
  export function getDicts(dictType: string): DictDataVO[] {
  // return request({
  //   url: '/system/dict/data/type/' + dictType,
  //   method: 'get'
  // });
  let rlt;
  if(dictType=='eveType'){
    rlt={
      code: 200,
      msg: "操作成功",
      data: [
          {
              dictCode: 1,
              dictLabel: "BOOL",
              dictValue: "BOOL"
          },
          {
            dictCode: 2,
            dictLabel: "SINT",
            dictValue: "SINT"
          },
          {
            dictCode: 3,
            dictLabel: "DINT",
            dictValue: "DINT"
          },
          {
            dictCode: 4,
            dictLabel: "USINT",
            dictValue: "USINT"
          },
          {
            dictCode: 5,
            dictLabel: "UINT",
            dictValue: "UINT"
          },
          {
            dictCode: 6,
            dictLabel: "UDINT",
            dictValue: "UDINT"
          },
          {
            dictCode: 7,
            dictLabel: "REAL",
            dictValue: "REAL"
          },
          {
            dictCode: 8,
            dictLabel: "WSTRING",
            dictValue: "WSTRING"
          },
          {
            dictCode: 9,
            dictLabel: "LINT",
            dictValue: "LINT"
          },
          {
            dictCode: 10,
            dictLabel: "ULINT",
            dictValue: "ULINT"
          },
          {
            dictCode: 11,
            dictLabel: "TIME_OF_DAY",
            dictValue: "TIME_OF_DAY"
          },
          {
            dictCode: 12,
            dictLabel: "DATE_AND_TIME",
            dictValue: "DATE_AND_TIME"
          },
          {
            dictCode: 13,
            dictLabel: "BYTE",
            dictValue: "BYTE"
          },
          {
            dictCode: 14,
            dictLabel: "WORD",
            dictValue: "WORD"
          },
          {
            dictCode: 15,
            dictLabel: "DWORD",
            dictValue: "DWORD"
          },
          {
            dictCode: 16,
            dictLabel: "LWORD",
            dictValue: "LWORD"
          },
          {
            dictCode: 17,
            dictLabel: "LREAL",
            dictValue: "LREAL"
          },
          {
            dictCode: 18,
            dictLabel: "TIME",
            dictValue: "TIME"
          }
      ]
    }
  }
  return rlt;
}

// // 查询字典数据列表
// export function listData(query: DictDataQuery): AxiosPromise<DictDataVO[]> {
//   return request({
//     url: '/system/dict/data/list',
//     method: 'get',
//     params: query
//   });
// }

// // 查询字典数据详细
// export function getData(dictCode: string | number): AxiosPromise<DictDataVO> {
//   return request({
//     url: '/system/dict/data/' + dictCode,
//     method: 'get'
//   });
// }

// // 新增字典数据
// export function addData(data: DictDataForm) {
//   return request({
//     url: '/system/dict/data',
//     method: 'post',
//     data: data
//   });
// }

// // 修改字典数据
// export function updateData(data: DictDataForm) {
//   return request({
//     url: '/system/dict/data',
//     method: 'put',
//     data: data
//   });
// }

// // 删除字典数据
// export function delData(dictCode: string | number | Array<string | number>) {
//   return request({
//     url: '/system/dict/data/' + dictCode,
//     method: 'delete'
//   });
// }
