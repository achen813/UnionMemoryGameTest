

var player1 = "Player 1" //prompt("Type your first name.");
var player2 = "Player 2";  // can change if desired
var currentPlayer = player1;
var player1Score = 0;
var player2Score = 0;
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var turn = 0;
var red = "#DC143C"
var blue = "#6495ED"
var color = ''
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" class="card" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    // Set all variables back to default 
    document.getElementById('memory_board').innerHTML = output;
    document.getElementById('turn').innerHTML = "<h1 style= 'color: " + red + "' > It is " + player1 + "'s Turn</h1>";
    turn = 0;
    player1Score, player2Score = 0;
    document.getElementById('player1Score').innerHTML = "<h3> Player 1 Score: "+0+"</h3>";
    document.getElementById('player2Score').innerHTML = "<h3> Player 2 Score: "+0+"</h3>";


}
function memoryFlipTile(tile,val){
    if(currentPlayer == player1){
        tile.style.background = red;
    }
    else{
        tile.style.background = blue;
    }
    turn++;
    if( turn == 2){
        if (currentPlayer == player1){
            currentPlayer = player2;
            turn = 0;
            color = blue;
        }else{
            currentPlayer = player1;
            turn =0;
            color = red;
        }

        document.getElementById('turn').innerHTML = "<h1 style= 'color: " + color + "' > It is " + currentPlayer + "'s Turn</h1>";
    }
    // check to see if it is blank and memory_value is less than 2
	if(tile.innerHTML == "" && memory_values.length < 2){
        // insert value
        tile.innerHTML = val;
        // if no cards flipped yet
		if(memory_values.length == 0){
            // push the value
            memory_values.push(val);
            // push the click id
            memory_tile_ids.push(tile.id);
            // if already 1 card flipped over
		} else if(memory_values.length == 1){
			memory_values.push(val);
            memory_tile_ids.push(tile.id);
            // if the two cards matches
			if(memory_values[0] == memory_values[1]){
                if (currentPlayer != player1){
                    player1Score = player1Score + 1;
                    console.log(player1Score, "1");
                    document.getElementById('player1Score').innerHTML = "<h3> Player 1 Score: "+player1Score+"</h3>";
                }else{
                    player2Score = player2Score + 1;
                    console.log(player2Score, "2");
                    document.getElementById('player2Score').innerHTML = "<h3> Player 2 Score: "+player2Score+"</h3>";
                }
                // set the card tiles to remain flipped over
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is already matched
				if(tiles_flipped == memory_array.length){
                    if(player1Score > player2Score){
                        alert(player1 + "wins!!!, Board cleared... generating new board");
                    }
                    else{
                        alert(player2 + "wins!!!, Board cleared... generating new board");
                    }
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    // make the background go back
				    tile_1.style.background = 'url(logo.png) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(logo.png) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

newBoard()