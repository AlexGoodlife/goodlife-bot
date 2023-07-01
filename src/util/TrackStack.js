
module.exports = class TrackStack{
  tracks = [];
  maxSize;

  constructor(size){
    this.maxSize = size;
  }

  push(track){
    this.tracks.push(track);
    if(this.tracks.length >= this.maxSize){
      this.tracks = this.tracks.slice(1,this.tracks.length);
    }
  }

  pop(){
    return this.tracks.pop();
  }

  get size(){
    return this.tracks.length;
  }
}
