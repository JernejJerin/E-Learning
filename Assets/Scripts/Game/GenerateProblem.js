#pragma strict

// Steklenica, iz katere delamo kopije.
var bottle : Transform;
var bottleText : Transform;

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
		
		//Set initiall values somewhere on terrian 
		var bottleX : float = 500;
		var bottleZ : float = 650; 
		
		// Search for within region where terrian is low, e.g is watter
		while(Terrain.activeTerrain.SampleHeight(Vector3(bottleX, 0, bottleZ)) > 0){
			bottleX = Random.Range(500,1350);
			bottleZ = Random.Range(650,1300);
		}
		var randomPosition : Vector3 = Vector3(bottleX, -0.2, bottleZ);
		//TODO 
		// get terrian heigh
		//Debug.Log(Terrain.activeTerrain.SampleHeight(new Vector3(900,0,1010)));
		var bottleValue : int = Random.Range(-10, 10);
		
		cloneBottle = Instantiate(bottle, randomPosition, Quaternion.identity);
		cloneBottle.renderer.enabled = true;
		cloneBottle.tag = "BottleClone";
		randomPosition.y = 2;
		cloneBottleText = Instantiate(bottleText,  randomPosition, Quaternion.identity);
		cloneBottleText.renderer.enabled = true;
		
		// Nastavimo steklenico kot starsa za text.
		cloneBottleText.transform.parent = cloneBottle;
		
		// Dobimo referenco na skripto, kjer imamo shranjeno lastnost.
		var bottleProperties : BottleProperties = cloneBottle.GetComponent(BottleProperties);
		
		// Nastavimo vrednost steklenice na nakljucno.
		bottleProperties.bottleValue = bottleValue;
		cloneBottleText.GetComponent(TextMesh).text = bottleValue.ToString();
	}
}