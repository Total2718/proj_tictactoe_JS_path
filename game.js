

let blank_board = document.createElement('div');

let new_game_button = document.getElementById("ng_button");
let name_form = document.getElementById('name_form');
let shadow_cover = document.getElementById('shadow');
let player1_slot = document.getElementById("player_name_1");
let player2_slot = document.getElementById("player_name_2");
let play_button = document.getElementById("play_button");
let board_grid = document.getElementById("board_grid");
let lower_div = document.getElementById("lower_div");




shadow_cover.addEventListener('click', function(e){
    e.target.classList.remove('active');
    name_form.classList.remove('active');
});

new_game_button.addEventListener('click', function(){
    name_form.classList.add("active");
    shadow_cover.classList.add("active");
});

play_button.addEventListener("click", function(e){
    e.target.classList.remove('active');
    name_form.classList.remove('active');
    shadow_cover.classList.remove('active');
    let old_game = document.getElementById("board_grid");
    if (old_game != null){
        old_game.remove();
    }
    
    let new_game = new Game(player1_slot.value, player2_slot.value);
    new_game.makeNewBoard();
    new_game.makeNamePlates();
    e.preventDefault();
    name_form.reset(); 
});



const Game = function(player1, player2) {
    if(player1 == ""){
        player1 = "Player 1";
    }
    if (player2 == ""){
        player2 = "Player 2";
    }
    this.player_1 = player1;
    this.player_2 = player2;
    this.board = [];
    this.current_symbol = "X";
    this.board_grid = document.createElement("DIV");
    this.board_grid.setAttribute("id","board_grid");
    lower_div.appendChild(this.board_grid);
    

    let possible_wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; 
    

    const symbolSwitch = () => {
        if (this.current_symbol == "X"){
            this.current_symbol = "O";
        } else {
            this.current_symbol = "X"; 
        }
    }

    
    this.makeNewBoard = () => {
        
        for (let i=0; i<9; i++) {
            let new_tac_slot = document.createElement("DIV");
            new_tac_slot.classList.add("tac_slots");
            
            // console.log(i);
            new_tac_slot.addEventListener("click", function(e){
                selectSpot(e.target, i);
            });
            this.board_grid.appendChild(new_tac_slot);

        }
    }

    this.makeNamePlates = () => {
        let names_div = document.getElementById("player_names");
        let player1_name = document.createElement("DIV");
        player1_name.classList.add("player_card");
        player1_name.innerHTML = this.player_1;
        let player2_name = document.createElement("DIV");
        player2_name.classList.add("player_card");
        player2_name.innerHTML = this.player_2;
        names_div.appendChild(player1_name);
        names_div.appendChild(player2_name);
        player1_name.classList.add("active");
    }

    const addSymbol = (current_slot, slot_number) => {
       current_slot.innerHTML = this.current_symbol;
       this.board[slot_number] = this.current_symbol;
       console.log(this.board[slot_number]);
       console.log(this.board);
       console.log(possible_wins);
    }

    const checkSlot = (slot_number) => {
        if (this.board[slot_number] == "X"){
            return true;
        } else if (this.board[slot_number] == "O"){
            return true;
        } else {
            return false;
        }
    };

    const selectSpot = (current_slot, slot_number) => {
        let already_taken = checkSlot(slot_number);
        if (already_taken == false){
            addSymbol(current_slot, slot_number);
            let game_over = check_win();
            if (game_over == true){
                gameOver();
            } else if (game_over == false && this.board.length == 9){
                alert("Neither of you win and the board has been completely filled.");
                
            }
            symbolSwitch();
        } else {
            alert("Spot already taken.");
        }
        
    };

   

    const gameOver = () => {
        let winning_player;
        if (this.current_symbol == "X"){
            winning_player = this.player_1;
        }else {
            winning_player = this.player_2;
        }
        let game_win_message = "The winner is " + winning_player;
        alert(game_win_message);

    }


    const check_win = () => {
        
        let game_won = false;
        for(let i=0; i<possible_wins.length; i++){
            let sequence_count = 0;
           
            for(let j=0; j<3; j++){
               
                
                if(this.board[possible_wins[i][j]] == this.current_symbol){
                    
                    sequence_count++;
                    
                }
            }
            
            if(sequence_count == 3){
                game_won = true;
            }
        }
        
        console.log(game_won);
        return game_won;

    }



    
    
}


