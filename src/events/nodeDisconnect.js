module.exports = {
  vulkava: true,
  name: "nodeDisconnect",
  execute(client, node,code,reason){
    console.log(`[Vulkava] Vulkava disconnected from node ${node.identifier} with code ${code} and reason ${reason}`);
  }

}
