export const useDeploymentMenuStore = defineStore("deploymentMenuStore", () => {
    let deploymentMenu=ref({});
    return {
        deploymentMenu
    };
  });

  export const useDeploymentNodeIDStore = defineStore("deploymentNodeIDStore", () => {
    let nodeId=ref('');
    return {
        nodeId
    };
  });
  export const useDeploymentNodeDragStore = defineStore("deploymentNodeDragStore", () => {
    let operation=ref({});
    return {
      operation
    };
  });
  export default {
    useDeploymentMenuStore,
    useDeploymentNodeIDStore,
    useDeploymentNodeDragStore
};