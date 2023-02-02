

let playGame = function(){
    myAI = new AI();
    myGame = new Game(myAI);
    myAI.plays(myGame);  
    myGame.updateUI();
    //set symbols in game state
    myAI.AISymbol = (turn == "1"&& PlayAI)?player2Symbol:player1Symbol;

    //Game.prototype.playerSymbol = playerSymbol;
    Game.prototype.playerSymbol = (turn == "1")?player1Symbol:player2Symbol;
    // fade in the game board
    // use promise so that the callback only executes once as multiple items are being hidden.
    $(".hide-me").fadeOut(600).promise().done(function(){
      $(".board-area ,.message-area").fadeIn(600, function(){
        // if comp is X, proceed with first move after fadeIn is complete.
        if(PlayAI && !playerTurn){
          myGame.ai.takeMove(myGame.currentState);
          myGame.updateUI();
          playerTurn = true;
        }
      });
    }); 
  }

// define who to play with human or computer
  $(".player-type .btn").on("click", function(){
    let playerType = $(this).attr("id");
    if(playerType == "computer"){
      document.querySelector('.player-turn').style.display = 'block'; 
      PlayAI=true;
    } else {
        PlayAI=false;
      playerTurn = true;       
      document.querySelector('.symbol').style.display = 'block';  
    }        
  });


  // if playing with computer define who is going to play first
  $(".player-turn .btn").on("click", function(){
    turn = $(this).attr("id");
    if(turn == "1"&& PlayAI){
      playerTurn = true;
    } else {
      playerTurn = false;
    }
    document.querySelector('.symbol').style.display = 'block'; 
    }); 

// define who will play with which symbol
$(".symbol .btn").on("click", function(){
    symbol = $(this).attr("id");
    if(turn == "1"){  
      player1Symbol=symbol;
      player2Symbol=symbol==availableSymbols1?availableSymbols2:availableSymbols1;
    }
    else{
      player2Symbol=symbol
      player1Symbol=symbol==availableSymbols2?availableSymbols1:availableSymbols2;
    }
    playerSymbol = symbol;
    compSymbol = symbol==availableSymbols2?availableSymbols1:availableSymbols2;  
        playGame();
  });

  


  

// place moves when clicking on board spaces
$(".fillbox").on("click", function(){
    //grab the space's number.
    let num = $(this).attr("id");   
    //replace all non numeric strings
    num=num.replace(/\D/g, "");    
    // next, if the game is over, display the result.
    if(myGame.currentState.gameOver()){      
      if(myGame.currentState.result == "draw"){
        showMessage("It's a Draw Game. Press Reset or New Game to continue",true);        
      } else { 
        showMessage("Game is Over. Press Reset or New Game to play a New Game",true);       
      } 
    }
    else if(!myGame.isValid(num))
    {	
        $(this).css("background-color", "red");
        showMessage();
        setTimeout(() => {
            $(this).css("background-color", "");
        }, 800);	
    }
    else if(playerTurn && myGame.isValid(num)&& PlayAI){
      // create a new game state based on the player's choice.
//      alert("kk")
      let newState = new State(myGame.currentState, {turn: playerSymbol, position: num});
  
      // if it's the player's turn, update the game state.
      myGame.advanceTo(newState);
      myGame.updateUI();
      playerTurn = false;
  
      if(PlayAI){
        // wait a second to simulate thought, then make the AI's move.
        setTimeout(function(){
          myGame.ai.takeMove(myGame.currentState);
          myGame.updateUI();
          // allow the player to move again once UI has been updated.
          playerTurn = true;
        }, 1000);
      }
      else{
        playerTurn = true;
      }

    }
    else if(currentPlayer==1 && !PlayAI){	
          document.querySelector("#currentPlayerName").textContent = player2name;
          //Check sign font from font-awesome
          $(this).addClass("fa "+player1Symbol).removeClass("empty");            		
          currentPlayer = 2;
        }
    else{
      document.querySelector("#currentPlayerName").textContent = player1name;
      //Check sign font from font-awesome
      $(this).addClass("fa "+player2Symbol).removeClass("empty");            		
      currentPlayer = 1;
    }
  });
  
  
  

    // $(".fillbox").click(function() {
    // if (filled==9){	
    //    showMessage("Draw Game. Press Reset or New Game to continue");
    // }
    // else if(finishedGame)
    //     {	
    //     showMessage("Game is Over. Press Reset or New Game to play a New Game");
    //     }
    //   else if($(this).hasClass("fa fa-times") ||	$(this).hasClass("fa fa-check"))
    //     {	
    //         $(this).css("background-color", "red");
    //         showMessage();
    //         setTimeout(() => {
    //             $(this).css("background-color", "");
    //         }, 800);	
    //     }
    //     else if(turn == 1) {
    //         $("#currentPlayerName").text(player2name);
    //         // Check sign font from font-awesome
    //         $(this).addClass("fa fa-check").removeClass("empty");            		
    //         symbol="fa-check";
    //         check(symbol);
    //         turn = 2;
    //     }
    //     else {
    //         $("#currentPlayerName").text(player1name);	
    //         // Cross sign font from font-awesome
    //         $(this).addClass("fa fa-times").removeClass("empty");            
    //         symbol="fa-times";
    //         check(symbol);
    //         turn = 1;
    //     }
    // });
    
    
    function showMessage(message="Invalid move",pause=false){
      const item = document.querySelector('#message');
            item.textContent=message;
            item.style.opacity="100";        
      if (!pause){
        setTimeout(() => {
            item.style.opacity="0";
              }, 800);	
      }        
    }
    
    
    
    // Function to check the winning move
    // function check(symbol) {
    //     if ($("#sq1").hasClass(symbol) &&	$("#sq2").hasClass(symbol) &&	$("#sq3").hasClass(symbol))
    //     {
    //         $("#sq1, #sq2,#sq3").css("color", "green");
    //         finishGame();
            
    //     } 
    //     else if ($("#sq4").hasClass(symbol)	&& $("#sq5").hasClass(symbol)	&& $("#sq6").hasClass(symbol))
    //     {
    //         $("#sq4, #sq5,#sq6").css("color", "green");
    //         finishGame();		
    //     } 
    //     else if ($("#sq7").hasClass(symbol)	&& $("#sq8").hasClass(symbol)	&& $("#sq9").hasClass(symbol))
    //     {
    //         $("#sq7, #sq8,#sq9").css("color", "green");
    //         finishGame();	
    //     } 
    //     else if ($("#sq1").hasClass(symbol)	&& $("#sq4").hasClass(symbol)	&& $("#sq7").hasClass(symbol))
    //     {
    //         $("#sq1, #sq4,#sq7").css("color", "green");
    //         finishGame();		
    //     } 
    //     else if ($("#sq2").hasClass(symbol)	&& $("#sq5").hasClass(symbol)	&& $("#sq8").hasClass(symbol))
    //     {
    //         $("#sq2, #sq5,#sq8").css("color", "green");
    //         finishGame();	
    //     } 
    //     else if ($("#sq3").hasClass(symbol)	&& $("#sq6").hasClass(symbol)	&& $("#sq9").hasClass(symbol))
    //     {
    //         $("#sq3, #sq6,#sq9").css("color", "green");
    //         finishGame();	
    //     } else if ($("#sq1").hasClass(symbol) && $("#sq5").hasClass(symbol)	&& $("#sq9").hasClass(symbol))
    //     {
    //         $("#sq1, #sq5,#sq9").css("color", "green");
    //         finishGame();		
    //     } 
    //     else if ($("#sq3").hasClass(symbol)	&& $("#sq5").hasClass(symbol)	&& $("#sq7").hasClass(symbol))
    //     {
    //         $("#sq3, #sq5,#sq7").css("color", "green");
    //         finishGame();
    //     } else {
    //         filled++;
    //         if (filled==9){	
    //             showMessage("Draw Game",true);
    //          }
    //     }
    // }
    

    function finishGame(){
        showMessage("Game Over");
        finishedGame=true;
        if (turn==1){
            player1Score++;            
            document.querySelector("#player1score").textContent = player1Score; 
        }            
        else{
            player2Score++;     
           document.querySelector("#player2score").textContent = player2score; 
        }
            
    }

    //Resetting the game
    function reset(){
        newGame();
        resetScore();
        PlayAI=false;
        document.querySelector("#player1name").textContent = player1name+"  : ";        
        document.querySelector("#player2name").textContent = player2name+"  : ";
        document.querySelectorAll('.player-type').forEach(item => {item.style.display = 'block'; });
        document.querySelectorAll('.board-area, .message-area').forEach(item => {item.style.display = 'none'; });bvv
    }
    
    function newGame(){
        
        document.querySelector("#currentPlayerName").textContent = player1name;
        document.querySelector("#currentPlayerName").style.backgroundColor="transparent";
        document.querySelectorAll('.fillbox').forEach(item => {
          item.style.color = 'black'; 
          item.classList.add('empty');
          item.classList.remove('fa', 'fa-check', 'fa-times');          
        });
        turn=1;
        finishedGame=false;
        filled=0;
        playGame();
        showMessage("Lets start");        
    }
    
    
    function resetScore(){
        player1Score=player2Score=0;
        document.querySelectorAll(".playerscore").forEach(box => { box.textContent = "0" })
    }