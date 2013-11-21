#pragma strict

// Nastavljanje kdaj naj bo enacba vidna navzven.
var showEquation = false;

function OnGUI () {
	// Ali je aktiviran kateri od matematicnih problemov?
	if (showEquation) {
		// Pridobimo enacbo iz skripte GenerateProblem.
		var generateProblem : GenerateProblem = GameObject.Find("Mathematical treasure - addition").GetComponent(GenerateProblem);
		
		if (generateProblem.mathematicalOperation2 == 0) {
			// Sestevanje
			GUI.Box(Rect(0,0,100,50), "Enačba: " + generateProblem.number1 + " + " + generateProblem.number2 + " = " + generateProblem.currentSolution);
		} else if (generateProblem.mathematicalOperation2 == 1) {
			// Odstevanje
			GUI.Box(Rect(0,0,200,50), "Enačba: " + generateProblem.number1 + " + " + generateProblem.number2 + " = " + generateProblem.currentSolution);
		} else if (generateProblem.mathematicalOperation2 == 2) {
			// Mnozenje
			
		} else if (generateProblem.mathematicalOperation2 == 3) {
			// Deljenje
			
		}
	}
}