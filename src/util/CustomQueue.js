const { DefaultQueue } = require('vulkava');
const TrackStack  = require('./TrackStack.js');

module.exports = class CustomQueue extends DefaultQueue{
  previousTracks;

  constructor(){
    super();
    this.previousTracks = new TrackStack(20); // 20 track history should be ennough
  }

  peek(){
    return this.tracks[0];
  }

  getTrackAt(index){
    return this.tracks[index];
  }

  poll(dontPush = false){
    const track = super.poll();
    if(track && !dontPush){
      this.previousTracks.push(track);
    }
    return track;
  }

  bumpPrevious(){
    const popped = this.previousTracks.pop();
    if(popped){
      this.tracks.unshift(popped); 
      this.tracks.unshift(this.previousTracks.pop()); 
    }
  }

  // getDetails(low, high){
  //   const data = [];
  //   for (; low < high && this.tracks[low]; low++) {
  //     const req = this.tracks[low].requester;
  //     data.push(`${low + 1}º - \`${this.tracks[low].title}\` (Requested by: \`${req.username}#${req.discriminator}\`)`)
  //   }
  //   // return data.join('\n');
  //   return data;
  //   
  // }




}
