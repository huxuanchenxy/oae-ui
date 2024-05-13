export const useBottomContentStore = defineStore('bottomContent', ()=>
  {
    let bottomDiv;
    function setBottomDiv(div){
      bottomDiv=div;
    }
    function getBottomDiv(){
      return bottomDiv;
    }
    return {
      getBottomDiv,setBottomDiv
    };
  });
  
  export default useBottomContentStore;
  