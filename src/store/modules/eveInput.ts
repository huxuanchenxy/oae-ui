export const useEveInputStore = defineStore('eveInput', () => {
    const eveInputList = ref<
      Array<{
        key: string;
        value: EveInputForm[];
      }>
    >([]);
  
    /**
     * 获取
     * @param _key key
     */
    const getEveInputList = (_key: string): EveInputForm[] | null => {
      if (_key == null && _key == '') {
        return null;
      }
      try {
        for (let i = 0; i < eveInputList.value.length; i++) {
          if (eveInputList.value[i].key == _key) {
            return eveInputList.value[i].value;
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    };
  
    /**
     * 设置字典
     * @param _key 字典key
     * @param _value 字典value
     */
    const setEveInputList = (_key: string, _value: EveInputForm[]) => {
      if (_key !== null && _key !== '') {
        eveInputList.value.push({
          key: _key,
          value: _value
        });
      }
    };
  
    /**
     * 删除字典
     * @param _key
     */
    const removeDict = (_key: string): boolean => {
      let bln = false;
      try {
        for (let i = 0; i < eveInputList.value.length; i++) {
          if (eveInputList.value[i].key == _key) {
            eveInputList.value.splice(i, 1);
            return true;
          }
        }
      } catch (e) {
        bln = false;
      }
      return bln;
    };
  
    /**
     * 清空字典
     */
    const cleanEveInputList = (): void => {
      eveInputList.value = [];
    };
  
    return {
      eveInputList,
      getEveInputList,
      setEveInputList,
      removeDict,
      cleanEveInputList
    };
  });
  
  export default useEveInputStore;
  