#pragma strict

// Steklenica, iz katere delamo kopije.
var bottle : Transform;

/** Generiraj nakljucni matematicni problem **/
function GenerateProblem(mathematicalOperation) {
	var number1 : int = Random.Range(-10, 10);
	var number2 : int = Random.Range(-10, 10);
	var solution : double;

	// Ali gre za sestevanje, odstevanje, mnozenje ali deljenje? Na podlagi podanega parametra generiramo resitev.
	if (mathematicalOperation == 0) {
		solution = number1 + number2;
	} else if (mathematicalOperation == 1) {
		solution = number1 - number2;
	} else if (mathematicalOperation == 2) {
		solution = number1 * number2;
	} else if (mathematicalOperation == 3) {
		solution = number1 / number2;
	}
	
	// Generiramo 20 steklenic razlicnih vrednosti.
	for (var i = 0; i < 20; i++) {
		Instantiate(bottle, Vector3(Random.Range(830,980), -0.2, Random.Range(910,1095)), Quaternion.identity);
	}
	
	Debug.Log(number1 + ", " + number2 + " = " + solution);
}