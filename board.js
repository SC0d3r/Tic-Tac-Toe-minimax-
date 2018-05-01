class Board{
  constructor(){
    this._cells = Array(9).fill(null);
    // this._cells[0] = aiPlayer;
    // this._cells[6] = aiPlayer;
    // this._cells[4] = humanPlayer;
    // this._cells[2] = humanPlayer;

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