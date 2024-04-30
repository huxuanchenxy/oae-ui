export const useInVariStore = defineStore('invari', ()=>
  {
    let flag=ref(false);
    return {
      flag
    };
  });
  
  export default useInVariStore;
  