#pragma strict

// Dolocimo hitrost pomikanja, obracanja igralca in aktivnost zaklada.
var speed = 3.0;
var rotateSpeed = 0.1;
var treasureActivated = false;
var text3DAddition : Transform;

// Ob vsakem izrisu slike (frame) se poklice Update funkcija.
function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	
	// Obracanje okoli y-osi. Kot argument je podan 3D vektor.
	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0); 
	
	// Pomikanje nazaj/naprej.
	var forward = transform.TransformDirection(Vector3.forward); 
	var curSpeed = speed * Input.GetAxis ("Vertical"); 
	controller.SimpleMove(forward * curSpeed);

}

// this script pushes all rigidbodies that the character touches
var pushPower = 2.0;
function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body : Rigidbody = hit.collider.attachedRigidbody;
	var gameObject : GameObject = hit.collider.gameObject;
	var generateProblem : GenerateProblem;
	
	// Preverimo ali smo naleteli na zaklad in ali ze ni kateri od zakladov aktiven.
	if (hit.transform.tag.IndexOf("MathematicalTreasure") != -1 && !treasureActivated) {
		// Aktiviramo zaklad.
		treasureActivated = true;
		
		// Obarvamo tekst nad zakladom rdece.
		text3DAddition.renderer.material.color = Color.red;
		
		// Glede na tip zaklada (sestevanje, odstevanje, mnozenje, deljenje) posljemo sporocilo z parametrom o tipu enacbe.
		if (hit.transform.tag.IndexOf("Addition") != -1) {
			hit.transform.SendMessage("GenerateProblem", 0, SendMessageOptions.DontRequireReceiver);
			//Debug.Log("Addition");
		} else if (hit.transform.tag.IndexOf("Subtraction") != -1) {
			hit.transform.SendMessage("GenerateProblem", 1, SendMessageOptions.DontRequireReceiver);
		} else if (hit.transform.tag.IndexOf("Multiplication") != -1) {
			hit.transform.SendMessage("GenerateProblem", 2, SendMessageOptions.DontRequireReceiver);
		} else if (hit.transform.tag.IndexOf("Division") != -1) {
			hit.transform.SendMessage("GenerateProblem", 3, SendMessageOptions.DontRequireReceiver);
		} 
		LifeBar.powerLife -= 1;
	}
	
	// Ce smo se dotaknili zaklada in je ta ze aktiven, potem preverimo ali je uporabnik pobral pravilno stevilo steklenic.
	if (hit.transform.tag.IndexOf("MathematicalTreasure") != -1 && treasureActivated) {
		// Ker smo zadeli ob matematicni zaklad lahko direktno dostopamo do skripte, ki je vezana kot komponenta.
		generateProblem = hit.transform.GetComponent(GenerateProblem);
	
		
	}
		
	// Ce naletimo na steklenico jo unicimo.
	if (gameObject.tag == "BottleClone") {
		// Naleteli smo na steklenico, torej je potrebno dobiti skripto GenerateProblem z metodo Find.
		generateProblem = GameObject.Find("Mathematical treasure - addition").GetComponent(GenerateProblem);
		generateProblem.currentSolution += gameObject.GetComponent(BottleProperties).bottleValue;
		
		// Ali je uporabnikova resitva enaka uradni resitvi?
		if (generateProblem.solution == generateProblem.currentSolution) {
			// Deaktiviramo zaklad.
			treasureActivated = false;
			
			// Obarvamo tekst nad zakladom rdece.
			text3DAddition.renderer.material.color = Color.yellow;
			
			// Unicimo vse steklenice.
			var clones = GameObject.FindGameObjectsWithTag ("BottleClone");
		    for (var clone in clones){
		        Destroy(clone);
		    }
		} else {
			UnityEngine.Object.Destroy(gameObject);
			LifeBar.powerLife += 10;
		}
	}
	
	// no rigidbody
	if (body == null || body.isKinematic)
		return;
		
	// We dont want to push objects below us
	if (hit.moveDirection.y < -0.3) 
		return;
	
	// Calculate push direction from move direction, 
	// we only push objects to the sides never up and down
	var pushDir : Vector3 = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);

	// If you know how fast your character is trying to move,
	// then you can also multiply the push velocity by that.
	
	// Apply the push
	body.velocity = pushDir * pushPower;
}

@script RequireComponent(CharacterController)