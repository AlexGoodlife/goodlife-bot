
module.exports = {
  vulkava: true,
  name: "warn",
  execute(client, node, warn){
    console.log(`[Vulkava] warning on node ${node} with message ${warn}`);
  }
}
