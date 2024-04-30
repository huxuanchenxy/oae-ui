export const commonStore = defineStore("commonStore", {
    state: () => ({
        curTreeNode: { id: 0, name: "", algorithmName: "" },
    }),
    getters: {

    },
    actions: {
        changeCurTreeNode(id, name, algorithmName) {

            this.curTreeNode = { id, name, algorithmName };
            console.log("this.curTreeNode:::", this.curTreeNode);
        }
    }
})