private static var powerLife : float = 0.0;

function Start(){
	Debug.Log("Init Tocke: 0");
	powerLife = 0;
}

function Update () { 
}


public static function changeLifeBarPower(difference : float){
	Debug.Log("Changing points: " + difference);
	
	powerLife += difference;
	Debug.Log("Tocke =  " + powerLife);
	
	HUD_GT.setText("gtBody", "Tocke: " + powerLife);
	
	if (powerLife <= 0){
		//Application.LoadLevel("game_over");
	}
}

public static function getPowerLife(){
	return powerLife;
}