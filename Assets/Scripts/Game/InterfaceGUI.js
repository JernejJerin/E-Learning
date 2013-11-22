#pragma strict

// Nastavljanje kdaj naj bo enacba vidna navzven.
var showEquation = false;

function OnGUI () {
	// Ali je aktiviran kateri od matematicnih problemov?
	if (showEquation) {
		// Pridobimo enacbo iz skripte GenerateProblem.
		var generateProblem : GenerateProblem = GameObject.Find("Mathematical treasure - addition").GetComponent(GenerateProblem);
		
		if (generateProblem.mathematicalOperation == 0) {
			// Sestevanje
			GUI.Box(Rect(0,0,200,50), "Enačba: " + generateProblem.number1 + " + " + generateProblem.number2 + " = " + generateProblem.currentSolution);
		} else if (generateProblem.mathematicalOperation == 1) {
			// Odstevanje
			GUI.Box(Rect(0,0,200,50), "Enačba: " + generateProblem.number1 + " - " + generateProblem.number2 + " = " + generateProblem.currentSolution);
		} else if (generateProblem.mathematicalOperation == 2) {
			// Mnozenje
			GUI.Box(Rect(0,0,200,50), "Enačba: " + generateProblem.number1 + " * " + generateProblem.number2 + " = " + generateProblem.currentSolution);
			
		} else if (generateProblem.mathematicalOperation == 3) {
			// Deljenje
			GUI.Box(Rect(0,0,200,50), "Enačba: " + generateProblem.number1 + " / " + generateProblem.number2 + " = " + generateProblem.currentSolution);
		}
	}
}