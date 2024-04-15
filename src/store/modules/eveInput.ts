export const useEveInputStore = defineStore('eveInput', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useEveInputStore;
  