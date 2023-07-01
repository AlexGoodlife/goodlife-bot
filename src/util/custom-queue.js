const { DefaultQueue } = require('vulkava');

module.exports = class CustomQueue extends DefaultQueue{

  constructor(){
    super();
  }

  peek(){
    return this.tracks[0];
  }

  getDetails(){
    const data = [];
    
  }


}
