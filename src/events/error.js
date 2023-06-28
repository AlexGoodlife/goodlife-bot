
module.exports = {
  vulkava : true,
  name : "error",
  execute(client, node, err){
      console.error(`[Vulkava] Error on node ${node.identifier}`, err.message);
  }
}
