#pragma strict

// Steklenica, iz katere delamo kopije.
var bottle : Transform;
var bottleText : Transform;
var audioClipOpenProblem : AudioClip;

// Generirani stevili, tip matematicne operacije in resitev matematicne enacbe.
var numbers = new Array();
var mathematicalOperation : int;
var solution : double;

// Trenutna resitev uporabnika.
var currentSolution : double;

/** Generiraj nakljucni matematicni problem **/
function GenerateProblem(mathematicalOperation : int) {
	numbers.clear();
	solution = 0;
	currentSolution = 0;
	this.mathematicalOperation = mathematicalOperation;
	
	generateLevel();

	// Ali gre za sestevanje, odstevanje, mnozenje ali deljenje? Na podlagi podanega parametra generiramo resitev.
	if (mathematicalOperation == 0) {
		// Sestevanje
		for (var i = 0; i < numbers.length; i++)
			solution += parseInt(numbers[i].ToString());
	} else if (mathematicalOperation == 1) {
		// Odstevanje
		for (i = 0; i < numbers.length; i++)
			solution -= parseInt(numbers[i].ToString());
	} else if (mathematicalOperation == 2) {
		// Mnozenje
		solution = parseInt(numbers[0].ToString()) * parseInt(numbers[1].ToString());
	} else if (mathematicalOperation == 3) {
		// Deljenje
		solution = parseInt(numbers[0].ToString()) / parseInt(numbers[1].ToString());
	}
	
	// Omogocimo izpis enacbe v skripti InterfaceGUI.
	var gui : InterfaceGUI = GameObject.Find("MainCamera").GetComponent(InterfaceGUI);
	gui.showEquation = true;
	
	// Generiramo 20 steklenic razlicnih vrednosti.
	for (i = 0; i < 20; i++) {
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

function generateLevel() {
	if (mathematicalOperation == 0 || mathematicalOperation == 1) {
		if (MoveAround.level < 5) {
			// Interval generiranja stevil naj bo med -10 in 10.
			numbers.Add(Random.Range(-10, 10));
			numbers.Add(Random.Range(-10, 10));
		} else if (MoveAround.level >= 5 && MoveAround.level < 10) {
			for (var i = 0; i < 3; i++)
				numbers.Add(Random.Range(-10, 10));
		} else {
			for (i = 0; i < 4; i++)
				numbers.Add(Random.Range(-10, 10));
		}
	} else {
		if (MoveAround.level < 5) {
			// Interval generiranja stevil naj bo med -10 in 10.
			numbers.Add(Random.Range(-10, 10));
			numbers.Add(Random.Range(-10, 10));
		} else if (MoveAround.level >= 5 && MoveAround.level < 10) {
			numbers.Add(Random.Range(-100, 100));
			numbers.Add(Random.Range(-100, 100));
		} else {
			numbers.Add(Random.Range(-1000, 1000));
			numbers.Add(Random.Range(-1000, 1000));
		}
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