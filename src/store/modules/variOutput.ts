export const useVariOutputStore = defineStore('variOutput', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useVariOutputStore;
  