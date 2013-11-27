#pragma strict

// Steklenica, iz katere delamo kopije.
var bottle : Transform;
var bottleText : Transform;
var audioClipOpenProblem : AudioClip;

// Generirani stevili, tip matematicne operacije in resitev matematicne enacbe.
var number1 : int;
var number2 : int;
var mathematicalOperation : int;
var solution : double;

// Trenutna resitev uporabnika.
var currentSolution : double;

/** Generiraj nakljucni matematicni problem **/
function GenerateProblem(mathematicalOperation) {
	currentSolution = 0;
	this.mathematicalOperation = mathematicalOperation;
	
	// Interval generiranja stevil naj bo med -10 in 10.
	number1 = Random.Range(-10, 10);
	number2 = Random.Range(-10, 10);

	// Ali gre za sestevanje, odstevanje, mnozenje ali deljenje? Na podlagi podanega parametra generiramo resitev.
	if (mathematicalOperation == 0) {
		// Sestevanje
		solution = number1 + number2;
	} else if (mathematicalOperation == 1) {
		// Odstevanje
		solution = number1 - number2;
	} else if (mathematicalOperation == 2) {
		// Mnozenje
		solution = number1 * number2;
	} else if (mathematicalOperation == 3) {
		// Deljenje
		solution = number1 / number2;
	}
	
	// Omogocimo izpis enacbe v skripti InterfaceGUI.
	var gui : InterfaceGUI = GameObject.Find("Main Camera").GetComponent(InterfaceGUI);
	gui.showEquation = true;
	
	// Generiramo 20 steklenic razlicnih vrednosti.
	for (var i = 0; i < 20; i++) {
		// Instanciramo novo steklenico in tekst.
		var cloneBottle : Transform;
		var cloneBottleText : Transform;
		
		
		var randomPosition : Vector3 = getRandomValidXZ();//Vector3(bottleX, -0.2, bottleZ);
		//TODO 
		// get terrian heigh
		//Debug.Log(Terrain.activeTerrain.SampleHeight(new Vector3(900,0,1010)));
		var bottleValue : int = Random.Range(-10, 10);
		
		cloneBottle = Instantiate(bottle, randomPosition, Quaternion.identity);
		cloneBottle.renderer.enabled = true;
		cloneBottle.tag = "BottleClone";
		randomPosition.y = 2;
		cloneBottleText = cloneBottle.Find("3D Text - Bottle");//Instantiate(bottleText,  randomPosition, Quaternion.identity);
		
		// Dobimo referenco na skripto, kjer imamo shranjeno lastnost.
		var bottleProperties : BottleProperties = cloneBottle.GetComponent(BottleProperties);
		
		// Nastavimo vrednost steklenice na nakljucno.
		bottleProperties.bottleValue = bottleValue;
		cloneBottleText.GetComponent(TextMesh).text = bottleValue.ToString();	
		
		//Demo: generiraj pol toliko sovraznikov kot steklenic
		if(i % 2 == 0){
			PirateShip.generatePirateShip(Random.Range(0.01, 0.2), Random.Range(2, 20));
		}
		AudioSource.PlayClipAtPoint(audioClipOpenProblem, this.transform.position);
	}
}

public static function getRandomValidXZ(){
	//Set initiall values somewhere on terrian 
	var x : float = 500;
	var z : float = 650; 
	
	// Search for within region where terrian is low, e.g is watter
	while(Terrain.activeTerrain.SampleHeight(Vector3(x, 0, z)) > 0){
		x = Random.Range(500,1350);
		z = Random.Range(650,1300);
	}
	
	return Vector3(x, 0, z);
}