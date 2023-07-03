const { DefaultQueue } = require('vulkava');
const TrackStack  = require('./TrackStack.js');

module.exports = class CustomQueue extends DefaultQueue{
  previousTracks;

  constructor(){
    super();
    this.previousTracks = new TrackStack(999); // basically infinite
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

  bumpPrevious(amount){
    let size = Math.min(amount, this.previousTracks.size);
    for(let i = 0; i < size; i++){
      if(i == 0){
        const popped = this.previousTracks.pop();
        if(popped){
          this.tracks.unshift(popped); 
          this.tracks.unshift(this.previousTracks.pop()); 
        }
      }
      else{
        this.tracks.unshift(this.previousTracks.pop()); 
      }
    }
  }

  skipNTracks(n){
    for(let i = 0; i < n-1;i++){
      this.poll();
    }
  }

}
