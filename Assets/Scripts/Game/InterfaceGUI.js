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
		
		// Izpis enacbe.
		var str = "Enacba: ";
		for (var i = 0; i < generateProblem.numbers.length - 1; i++) 
			str += generateProblem.numbers[i] + mathSign;
		str += generateProblem.numbers[generateProblem.numbers.length - 1] + " = ";
		
		// Izpisemo samo, ce je uporabnik ze pobral kaksno steklenico.
		if (generateProblem.currentSolution != null)
			str += generateProblem.currentSolution;
		else
			str += " ? ";
		HUD_GT.setText("gtEquation", str);
	}
}