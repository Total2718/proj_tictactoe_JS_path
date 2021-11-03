

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
    this.board = document.getElementsByClassName("tac_board_slots");
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
            this.player1_card.classList.remove("active");
            this.player2_card.classList.add("active");

        } else {
            this.current_symbol = "X"; 
            this.player2_card.classList.remove("active");
            this.player1_card.classList.add("active");
        }
    }

    this.makeNewBoard = () => {
        for (let i=0; i<9; i++) {
            let new_tac_slot = document.createElement("DIV");
            new_tac_slot.classList.add("tac_slots");
            new_tac_slot.classList.add("tac_board_slots");
            new_tac_slot.addEventListener("click", selectSpot);
            this.board_grid.appendChild(new_tac_slot);
        }
    }

    this.makeNamePlates = () => {
        let names_div = document.getElementById("player_names");
        this.player1_card = document.createElement("DIV");
        this.player1_card.classList.add("player_card");
        this.player1_card.innerHTML = this.player_1;
        this.player2_card = document.createElement("DIV");
        this.player2_card.classList.add("player_card");
        this.player2_card.innerHTML = this.player_2;
        names_div.appendChild(this.player1_card);
        names_div.appendChild(this.player2_card);
        this.player1_card.classList.add("active");
    }

    const addSymbol = (current_slot) => {
       current_slot.innerHTML = this.current_symbol;
    
    }

    const checkSlot = (current_slot) => {
        if (current_slot.target.innerHTML == "O" || current_slot.target.innerHTML == "X"){
            return true;
        }else {
            return false;
        }
    }
    const selectSpot = (event) => {
        let already_taken = checkSlot(event);
        if (already_taken == false){
            addSymbol(event.target);
            let game_over = check_win();
            if (game_over == true){
                gameOver();
                disable_board();
            } else if (game_over == "draw"){
                alert("Neither of you win and the board has been completely filled.");
                disable_board;
                
            } else if (game_over == false) {
                symbolSwitch();
            }
            event.target.classList.remove("tac_slots");
            event.target.classList.add("selected_slots");
            
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
        let slots_filled = 0;
        for(let i=0; i<possible_wins.length; i++){
            let sequence_count = 0;
            for(let j=0; j<3; j++){
                if(this.board[possible_wins[i][j]].innerHTML == this.current_symbol){
                    sequence_count++;
                }
            }
            if(sequence_count == 3){
                game_won = true;
            }
        }
        for(let i=0; i<this.board.length; i++){
            if (this.board[i] == "X" || this.board[i] == "O"){
                slots_filled++;
            }
        }
        if(slots_filled == 9 && game_won == false){
            game_won = "draw";
        }
        console.log(game_won);
        return game_won;
    }

    const disable_board = () => {
        for(let i=0; i<9; i++){
            this.board[i].removeEventListener("click", selectSpot);
            this.board[i].classList.remove("tac_slots");
            this.board[i].classList.add("selected_slots");
        }
    }


}
