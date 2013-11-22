static var maxPowerLife : float = 100.0;
static var minPowerLife : float = 0.0;
private static var powerLife : float = 50.0;

function Update () { 
	renderer.material.SetFloat("_Cutoff", Mathf.InverseLerp(0, maxPowerLife, maxPowerLife-powerLife)); 
}


public static function changeLifeBarPower(difference : int){
	Debug.Log("Spreminjam life bar: " + difference);
	powerLife += difference;
	
	if (powerLife < minPowerLife){
		powerLife = minPowerLife;
	}
	
	if(powerLife > maxPowerLife){
		powerLife = maxPowerLife;
	}
}