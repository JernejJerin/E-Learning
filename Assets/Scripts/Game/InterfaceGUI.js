#pragma strict

// Nastavljanje kdaj naj bo enacba vidna navzven.
public static var showEquation = false;
var mathSign = " ";

function OnGUI () {
	// Ali je aktiviran kateri od matematicnih problemov?
	if (showEquation) {
		// Pridobimo enacbo iz skripte GenerateProblem.
		var generateProblem : GenerateProblem = GameObject.Find("MathematicalShip").GetComponent(GenerateProblem);
		
		switch(generateProblem.mathematicalOperation){
			case (0):
				// Sestevanje
				mathSign = " + ";
				break;
			case 1:
				// Odstevanje
				mathSign = " - ";
				break;
			case 2:
				// Mnozenje
				mathSign = " * ";
				break;
			case 3:
				// Deljenje
				mathSign = " / ";
				break;
		}
		
		// to prevent 5 + -6 =, so we get 5 - 6 = 
		if (generateProblem.number2 < 0){
			mathSign = " ";
		}
		var str = "Enacba: " + generateProblem.number1 + mathSign + generateProblem.number2 + " = " + generateProblem.currentSolution;
		HUD_GT.setText("gtEquation", str);
	}
}