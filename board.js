class Board{
  constructor(){
    this._cells = Array(9).fill(null);
  }
  place(index , player){
    if(this._cells[index] !== null) return -1;
    this._cells[index] = player;
  }
  pick(index){
    if(this._cells[index] === null) return -1;
    this._cells[index] = null;
  }
  state(){
    return this._cells.slice();
  }
}