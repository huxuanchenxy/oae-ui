export const useEveOutputStore = defineStore('eveOutput', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useEveOutputStore;
  