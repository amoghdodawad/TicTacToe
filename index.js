window.addEventListener("DOMContentLoaded",() =>{
    let tiles = document.querySelectorAll(".tiles");
    let result = document.querySelector("#result");
    let reset = document.querySelector("#reset");
    let currentPlayer = "X";
    let gameStatus = true;
    let box = ["","","","","","","","",""];
    let count = 0;
    let playerX = 0;
    let playerY = 0;
   

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let winningStatus = false;
        count++;
        for(let i=0;i<8;i++){
            let condition = winningConditions[i];
            const a = box[condition[0]];
            const b = box[condition[1]];
            const c = box[condition[2]];
            
            if(a === "" && b === "" && c === "")
                continue;
            if(a === b && b === c){
                winningStatus = true;
                gameStatus = false;
                tiles[condition[0]].style.backgroundColor = "#f7cb95";
                tiles[condition[1]].style.backgroundColor = "#f7cb95";
                tiles[condition[2]].style.backgroundColor = "#f7cb95";
                break;
            }
        }
        if(winningStatus){
            result.innerHTML =  currentPlayer + " is the Winner";
            if(currentPlayer === "X"){
                playerX++;
                document.querySelector("#player-X").innerHTML = playerX;
            }
            if(currentPlayer === "O"){
                playerY++;
                document.querySelector("#player-O").innerHTML = playerY;
            }
            return;
        }
        // console.log(count);
        if(count == 9){
            result.innerHTML = "It's a tie";
        }
        
    }

    function isValidAction(index){
        if(box[index] == "X" || box[index] == "O")
            return false;
        return true;
    }

    function updateBox(index){
        box[index] = currentPlayer;
        return;
    }

    function updateCurrentPlayer(){
        if(currentPlayer === "X")
            currentPlayer = "O";
        else    
            currentPlayer = "X";
    }

    function resetTheGame(){
        for(let i=0;i<9;i++){
            tiles[i].innerHTML = "";
            tiles[i].style.backgroundColor = "#F8F4E3";
            box[i] = "";
            // console.log(box[i]);
        }
        gameStatus = true;
        currentPlayer = "X";
        count = 0;
        result.innerHTML = "";
    }

    for(let i=0; i < 9; i++){
        tiles[i].addEventListener("click",()=>{
            if(isValidAction(i) && gameStatus){
                tiles[i].innerHTML = currentPlayer;
                console.log(tiles[i].innerHTML)
                updateBox(i);
                console.log(box);
                handleResultValidation();
                updateCurrentPlayer();
            }
        });
    }
    // reset.innerHTML = "Not yet clicked";
    reset.addEventListener("click",resetTheGame);
    // resetTheGame();

});
