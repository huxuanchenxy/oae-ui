export const useVariInputStore = defineStore('variInput', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useVariInputStore;
  