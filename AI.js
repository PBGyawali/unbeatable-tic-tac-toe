
let AI = function(){
  //current game being played by the AI.
  let game = {};
  
  // "global" variable used to store the next move, determined by the recursive minmax function
  let nextMove;
  
  // initialize the AI's symbol.  This will be defined via the UI.
  this.AISymbol = ""
  
  // for scoping
  let _this = this;
  
  // minimax function to determine the best move.
  function minimax(state) {
    
    // if this particular state is a finished game, return the score of the current board.
    if(state.gameOver()) {
      return Game.score(state);
    }
    else {
      //store all scores (index will correspond to the second array of moves)
      var scores = [];
      var moves = state.emptyCells();

      //calculate the minmax value for every possible move.
      for(let i = 0; i < moves.length; i++){
        
        //the next turn for the possible state will be whoever is not currently in this state.
        //let nextTurn = state.turn == "X" ? "O" : "X";        
        //create a possible state for every possible move
        let possibleState = new State(state, {turn: state.turn, position: moves[i]});

        //push that state's score
        let currScore = minimax(possibleState)
        scores.push(currScore);
      }
     

      //TODO - replace with player/computer value
      if(state.turn == "fa-times"){
        // if it's the player's turn, find the maximum value.
        let max = findMaxIndex(scores);
        // store the move to be executed
        nextMove = moves[max];
        
        // return the maximum score
        return scores[max];
      } else {
        // if it's the player's turn, find the maximum value.
        let min = findMinIndex(scores);
        
        // store the move to be executed
        nextMove = moves[min];
        
        // return the minimum score
        return scores[min];
      }
    }
  }
    
  this.plays = function(_game){
    game = _game;
  };  
  
  this.takeMove = function(_state){
    // call the minimax function to determine best move.
    _state.turn = _this.AISymbol;
    minimax(_state);

    let newState = new State(_state, {turn: _this.AISymbol, position: nextMove});
    myGame.advanceTo(newState);
  }

  this.changeSymbol = function(_state){
    // call the minimax function to determine best move.
    _state.turn = _this.AISymbol==availableSymbols1?availableSymbols2:availableSymbols1;

    let newState = new State("", {turn: _this.AISymbol});
  }
}

//game object
let Game = function(AI){
  // initialize the AI
  this.ai = AI;
  
  // initialize the game state
  this.currentState = new State();
  this.currentState.turn = "fa-times";
  
  // start game
  this.status = "start";
  
  // function to advance game to a new state
  this.advanceTo = function(_state){
    this.currentState = _state;   
    
  }
  
  // function to start the game
  this.start = function(){
    if(this.status = "start"){
      this.advanceTo(this.currentState);
      this.status = "running";
    }
  }
  
  // update UI after each move.
  this.updateUI = function(){    
    // first, update the UI's board to reflect the current game board
    let board = this.currentState.board;
    for(let i = 0; i <= 8; i++){
      let selector = "#sq" + i;
      if(board[i]){
        $(selector).addClass("fa "+board[i]).removeClass("empty");
      } else {
        $(selector).removeClass("fa fa-check fa-times").addClass("empty");
      }
    }
    
    // next, if the game is over, display the result.
    if(this.currentState.gameOver()){      
      if(this.currentState.result == "draw"){
        showMessage("It's a draw.",true);        
      } else if(this.currentState.result != player1Symbol){
        showMessage("Player 1 wins",true)        
      }  else { 
        showMessage("Player 2 wins",true)        
      } 
    }
  }
  
  // check to see if the move is valid before proceeding
  this.isValid = function(space){
    if(this.currentState.board[space] == 0){
      return true;
    } else {
      return false;
    }
  }
}

// score function for AI
Game.score = function(_state){
  if(_state.result !== "active"){
    if(_state.result === "fa-times"){
      return 10 - _state.depth;
    }
    else if(_state.result === "fa-check"){
      return -10 + _state.depth;
    }
    else {
      return 0;
    }
  }
}





  



