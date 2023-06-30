
module.exports = {
  vulkava: true,
  name: "nodeConnect",
  execute(client, node){
    console.log(`[Vulkava] Vulkava connected to node ${node.identifier} sucessfully`);
  }

}
