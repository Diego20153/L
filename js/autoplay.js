var Total_secs,
	Total_mins,
	cronometer,
	Moves_Required,
	Moves,
	Options,
	board = new Array(8),
	CellSelected_x,
	CellSelected_y;


function Check_SuccessfullEnd(){
	SuccessfullEnd = true;
	if(Moves >0) SuccessfullEnd = false;
	if(SuccessfullEnd) alert("Partida ganada");
}

function Check_GameOver(x, y){

	Options = 0;

	Check_Moves(x, y, 1, -2); //check move right - top long
	Check_Moves(x, y, 2, -1); //check move right long - top
	Check_Moves(x, y, 1, 2); //check move right - bottom long
	Check_Moves(x, y, 2, 1); //check move right long - bottom long

	Check_Moves(x, y, -1, -2); //check move left - top long
	Check_Moves(x, y, -2, -1); //check move left long - top
	Check_Moves(x, y, -1, 2); //check move left - bottom long
	Check_Moves(x, y, -2, 1); //check move left long - bottom long

	document.getElementById('option').innerHTML = Options;

	if (!Options) alert("Game Over");
}

function Check_Moves(x, y, mov_x, mov_y){
	option_x = x + mov_x;
	option_y = y + mov_y;

	if (option_x < 8 && option_y < 8 && option_x >= 0 && option_y >=0){
		if (board[option_x][option_y] == 0 ) Options++;
	}
}

function SelectCell(x, y){

	Moves--;
	document.getElementById('move').innerHTML = Moves;

	board[x][y] = 1;
	PaintCell(CellSelected_x, CellSelected_y, "orange");
	PaintHorseCell(x, y, "green");

	CellSelected_x = x;
	CellSelected_y = y;

	Check_SuccessfullEnd();
	Check_GameOver(x, y);
	Check_newBonus();
}

function Check_newBonus(){
	if ((64-Moves)% Moves_Required == 0){

		//Buscar una casilla al azar para poner elbonus

		Bonus_Cell = false;
		while (Bonus_Cell == false){

			Bonus_Cell_x = Math.round(Math.random() * 7);
			Bonus_Cell_y = Math.round(Math.random() * 7);

			if(board[Bonus_Cell_x][Bonus_Cell_y] == 0)
				Bonus_Cell = true;
		}
		//En el tablero colocar 2
		board[Bonus_Cell_x][Bonus_Cell_y] = 2;

		//Pintar la casilla con el bonus
		PaintBonusCell(Bonus_Cell_x, Bonus_Cell_y);
	}

}

function CheckCell(x, y){

	CheckTrue = false;

	dif_x = x - CellSelected_x;
	dif_y = y - CellSelected_y;

	if (dif_x == 1 && dif_y == -2) CheckTrue = true; //right  - bottom long
	if (dif_x == 2 && dif_y == -1) CheckTrue = true; //right long - bottom
	if (dif_x == 1 && dif_y == 2) CheckTrue = true; //right  - top long
	if (dif_x == 2 && dif_y == 1) CheckTrue = true; //right long - top

	if (dif_x == -1 && dif_y == -2) CheckTrue = true; //left  - bottom long
	if (dif_x == -2 && dif_y == -1) CheckTrue = true; //left long  - bottom 
	if (dif_x == -1 && dif_y == 2) CheckTrue = true; //left  - top long
	if (dif_x == -2 && dif_y == 1) CheckTrue = true; //left long - top 

	if (board[x][y] == 1) CheckTrue = false;
	Check_GameOver(x, y);
	if (CheckTrue) SelectCell(x, y);
	

}

function autoplay(){

	Moves = 64;
	Moves_Required = 8;

	for (i=0; i<8; i++) board[i] = new Array(8);

	ClearBoard();

	ResetTime();

	StarTime();

	x=Math.round(Math.random()*7);
	y=Math.round(Math.random()*7);

	CellSelected_x = x;
	CellSelected_y = y;


	SelectCell(x, y);

}

autoplay();

//0 -> Vacia
//1 -> Ocupada
//2 -> Bonus