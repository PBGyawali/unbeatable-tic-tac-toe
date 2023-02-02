

// object to represent a possible game state.  Will be used for traversal by the minimax AI.
// -optionally pass old state in to create the new state's data
// -optionally pass old move in to modify the new state
let State = function(old, move){  
    // whose turn is it?
    this.turn = ""  
    // number of AI moves so far - used by the minmax algorithm
    this.depth = 0;
  
    // current representation of board where 0 = blank space
    this.board = [0, 0, 0,
                  0, 0, 0,
                  0, 0, 0];
    
    // current status of the game
    this.result = "active"
    
    // if old state has been passed in to generate this state, copy the state over.
    if(old){
      for(let i = 0; i <= 8; i++){
        this.board[i] = old.board[i];
      }
      this.depth = old.depth;
      this.result = old.result;
      this.turn = old.turn;
    }
    
    //if there's a move object, advance the turn to that move's turn and place it at the specified position
    if(move){
      this.turn = move.turn;
      this.board[move.position] = move.turn;
      
      if(move.turn === "fa-check"){
        this.depth++;
      }    
      this.turn = move.turn == "fa-times" ? "fa-check" : "fa-times";
    }
    
    // find all empty cells in the state and return them
    this.emptyCells = function() {
      let indexes = [];
      for(let i = 0; i < 9; i++){
        if(this.board[i] === 0){
          indexes.push(i);
        }
      }
      return indexes;
    }
    
    // check if the game is over.
    // return true if the game is over.
    this.gameOver = function(){
      // check horizontally
      for(let i = 0; i <= 6; i+=3){
        if(this.board[i] !== 0 && this.board[i] === this.board[i+1] && this.board[i+1] === this.board[i+2]){
          this.result = this.board[i]; 
          return true;
        }
      }
      
      // check vertically
      for(let i = 0; i <= 2; i++){
        if(this.board[i] !== 0 && this.board[i] === this.board[i+3] && this.board[i+3] === this.board[i+6]){
          this.result = this.board[i];
          return true;
        }
      }
      
      // check diagonally
      if(this.board[4] !== 0 && (((this.board[0] === this.board[4]) && (this.board[4] === this.board[8])) || 
                                ((this.board[2] === this.board[4]) && (this.board[4] === this.board[6])))){
        this.result = this.board[4];     
        return true;
      }
      
      //if none of the win checks are met, check for a draw.
      let available = this.emptyCells();
      if(available[0] == undefined){
        this.result = "draw";
        return true;
      } else {
        return false;
      }
    };  
  }
  