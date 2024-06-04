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
  export default {
    useDeploymentMenuStore,
    useDeploymentNodeIDStore
};