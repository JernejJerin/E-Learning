static var maxPowerLife : float = 100.0;
static var minPowerLife : float = 0.0;
private static var powerLife : float = 0.0;

function Start(){
	Debug.Log("Init Body: 50%");
	powerLife = 50;
}

function Update () { 
}


public static function changeLifeBarPower(difference : int){
	Debug.Log("Spreminjam life bar za: " + difference);
	
	powerLife += difference;
	Debug.Log("Life bar =  " + powerLife);
	
	HUD_GT.setText("gtBody", "Trup: " + powerLife + "%");
	
	if (powerLife > 100){
		powerLife = 100;
	}
	if (powerLife <= 0){
		Application.LoadLevel("game_over");
	}
}