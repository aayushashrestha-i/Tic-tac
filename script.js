let cells= document.querySelectorAll(".cell");
let resetbtn= document.querySelector("#resetbtn");
let newGamebtn= document.querySelector("#newbtn");
let msgContainer= document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnO= true; //playerX, playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enablecells();
    msgContainer.classList.add("hide");
}

cells.forEach((cell) =>  {
    cell.addEventListener("click", () => {
        if(turnO){
            //playerO
            cell.innerText ="O";
            turnO = false;
        }else{
            //playerX
            cell.innerText= "X";
            turnO = true;
        }
        cell.disabled = true;

        checkWinner();
    });
});

const disabledcells = () => {
    for (let cell of cells) {
        cell.disabled = true;
    }
}

const enablecells = () => {
    for (let cell of cells) {
        cell.disabled = false;
        cell.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
   msgContainer.classList.remove("hide");
   disabledcells();

   //Trigger confetti
   confetti ({
      particleCount : 100,
      spread : 70,
      origin : { y: 0.6}
   });
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = cells[pattern[0]].innerText; 
        let pos2val = cells[pattern[1]].innerText;
        let pos3val = cells[pattern[2]].innerText;
        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return;  //Exit if winner if found
            }
        }
    }
    //Checks for draw (no empty cells left)
    let isDraw = true;
    for (let cell of cells) {
        if(cell.innerText==="") {
            isDraw = false;
            break;
        }
    }
    if(isDraw){
        msg.innerText = "It's a Draw";
        msgContainer.classList.remove("hide");
    }
};

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);







