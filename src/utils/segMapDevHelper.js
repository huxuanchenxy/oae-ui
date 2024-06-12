// 循环设备树，获取网络段及其挂载设备的映射关系
let attrTmp;
let segMapDev = {};
const getSegMapDev = (arr) => {
    for (let child of arr) {
      if (!child.children) break;
      else if (child.children[0].name === "终端设备") {
        attrTmp = child.name;
      } else if (child.name === "终端设备") {
        child.children.forEach((el) => {
          el.info = JSON.parse(el.jsonContent);
        });
        segMapDev[attrTmp] = child.children;
        break;
      }
      getSegMapDev(child.children);
    }
  };
  export { segMapDev, getSegMapDev};