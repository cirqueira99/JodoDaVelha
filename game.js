// amazena de quem é a vez
var turn = 0;
// ira ajudar a especificar o id de cada img criada para assim poder deleta lá
var cont = 1; 
// tabuleiro do jogo
var board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
// pontuação dos players
var pointsPlayers = [0,0];
// variável que ajudará na verificação do vencedor ou empate
var sum = [7]; 

window.onload = definePiece();

// gera a vez quem joga  ---------------------------------------------- //
function definePiece(){
    turn = Math.floor(1 + Math.random()*2);
    turn==1 ? alert("O jogador VERMELHO começa") : alert("O jogador VERDE começa");
    updatesPoints();
}

// verifica se movimento é valido ---------------------------------------------- //
function checkMovement(event){
    var d = event.target.id; 

    if( d.indexOf("img") == 0 ){
        alert("Movimento inválido! Escolha outra casa.");
        return 1;
    }
    
    putPiece(d);
}

// coloca peça no tabuleiro  ---------------------------------------------- //
function putPiece(d) {
    var caminhoImg= `./imgs/peca${turn}.png`;
    var img = document.createElement('img');

    img.setAttribute("src", caminhoImg);
    img.setAttribute("width", "80");
    img.setAttribute("hegth", "80");
    img.setAttribute("id", `img${cont}`);
    
    document.getElementById(d).appendChild(img)
    cont++;

    recordsMovements(d);
}

// amazena os lances jogados do tabuleiro  ---------------------------------------------- //
function recordsMovements (d){
    var i;

    switch(d){
        case "box1":
            i= 0;   break;
        case "box2":
            i= 1;   break;
        case "box3":
            i= 2;   break;   
        case "box4":
            i= 3;   break;
        case "box5": 
            i= 4;   break;
        case "box6": 
            i= 5;   break;
        case "box7": 
            i= 6;   break;
        case "box8": 
            i= 7;   break;
        case "box9": 
            i= 8;   break;
        default:
            break;
    }

    turn==1 ? board[i] = 1 : board[i] = -1;

    checkWinner();
}

// verifica e retorna ganhador ---------------------------------------------- //
function checkWinner(){
    var result;

    sum[0] = board[0]+board[1]+board[2];
    sum[1] = board[0]+board[3]+board[6];
    sum[2] = board[0]+board[4]+board[8];
    sum[3] = board[3]+board[4]+board[5];
    sum[4] = board[6]+board[7]+board[8]; 
    sum[5] = board[2]+board[5]+board[8];
    sum[6] = board[2]+board[4]+board[6];
    sum[7] = board[1]+board[4]+board[7];
    

    result = sum.filter( (b)=> {
        return (b == 3)||(b == -3);
    } );
    console.log(result[0]);

    if( result.length != 0 ){
        if( result[0] == 3 )
            alert("O Vermelho ganhou!!\n\nO jogo iniciará uma nova partida");       
        if( result[0] == -3 )
            alert("O Verde ganhou!!\n\nO jogo iniciará uma nova partida");
        
        pointsPlayers[turn-1] = pointsPlayers[turn-1]+1;        
        updatesPoints();
        clearGame();
    }
    
    // verifica se há empate
    if( checkTie().length == 0 ){
        alert("EMPATE! O jogo iniciará outra partida.");
        theEnd = true;
        updatesPoints();
        clearGame();
    }
      

    //console.log("ainda tem jogo!");

    turn==1 ? turn=2 : turn=1; 
}

// verifica se o tabuleiro foi totalmente preenchido ---------------------- //
function checkTie(){
    var result;

    result = board.filter( (b)=> {
        return b == 0;
    } );

    return result;
}

// Atualiza placar de pontuações ---------------------------------------------- //
function updatesPoints(){    
    document.getElementById("pointP1").innerHTML = pointsPlayers[0];
    document.getElementById("pointP2").innerHTML = pointsPlayers[1];
}

// Zera o placar de pontuações ---------------------------------------------- //
function zeroGame(){
    pointsPlayers[0] = 0;
    pointsPlayers[1] = 0;
    updatesPoints();
}

// limpa o tabuleiro ---------------------------------------------- //
function clearGame() {
    this.cont = 1;
    var img1 =  document.getElementById("img1");
    var img2 =  document.getElementById("img2");
    var img3 =  document.getElementById("img3");
    var img4 =  document.getElementById("img4");
    var img5 =  document.getElementById("img5");
    var img6 =  document.getElementById("img6");
    var img7 =  document.getElementById("img7");
    var img8 =  document.getElementById("img8");
    var img9 =  document.getElementById("img9");

    if(img1 != null)
        img1.remove();
    if(img2 != null)
        img2.remove();
    if(img3 != null)
        img3.remove();
    if(img4 != null)
        img4.remove();
    if(img5 != null)
        img5.remove();
    if(img6 != null)
        img6.remove();
    if(img7 != null)
        img7.remove();
    if(img8 != null)
        img8.remove();
    if(img9 != null)
        img9.remove();

    board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];   
    definePiece();
}

