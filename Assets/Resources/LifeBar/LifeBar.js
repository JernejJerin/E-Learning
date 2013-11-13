static var maxPowerLife : float = 100.0;
static var powerLife : float = 50.0;

function Update () { 
	renderer.material.SetFloat("_Cutoff", Mathf.InverseLerp(0, maxPowerLife, maxPowerLife-powerLife)); 
}
