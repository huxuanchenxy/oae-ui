export const useTempVariStore = defineStore('tempvari', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useTempVariStore;
  