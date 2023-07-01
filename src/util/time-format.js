module.exports = function formatTime(milisseconds){
  let currentDate = new Date(0);
  currentDate.setSeconds(milisseconds/ 1000);
  return currentDate.toISOString().substring(11, 19);
}
