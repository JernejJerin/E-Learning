#pragma strict

function Start () {

}

function OnTriggerEnter (other : Collider) {
	Debug.Log("Trigger entered");
}

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
	
	// Preverimo ali smo naleteli na zaklad in ali ze ni kateri od zakladov aktiven.
	if (hit.transform.tag.IndexOf("MathematicalTreasure") != -1 && !treasureActivated) {
		// Aktiviramo zaklad.
		treasureActivated = true;
		
		// Obarvamo tekst nad zakladom rdece.
		text3DAddition.renderer.material.color = Color.red;
		
		// Glede na tip zaklada (sestevanje, odstevanje, mnozenje, deljenje) posljemo sporocilo z parametrom o tipu enacbe.
		if (hit.transform.tag.IndexOf("Addition") != -1) {
			hit.transform.SendMessage("GenerateProblem", SendMessageOptions.DontRequireReceiver, 0);
		} else if (hit.transform.tag.IndexOf("Subtraction") != -1) {
			hit.transform.SendMessage("GenerateProblem", SendMessageOptions.DontRequireReceiver, 1);
		} else if (hit.transform.tag.IndexOf("Multiplication") != -1) {
			hit.transform.SendMessage("GenerateProblem", SendMessageOptions.DontRequireReceiver, 2);
		} else if (hit.transform.tag.IndexOf("Division") != -1) {
			hit.transform.SendMessage("GenerateProblem", SendMessageOptions.DontRequireReceiver, 3);
		} 
		LifeBar.powerLife -= 1;
	}
		
	// Ce naletimo na steklenico jo unicimo.
	if (gameObject.tag == "Bottle"){
		UnityEngine.Object.Destroy(gameObject);
		LifeBar.powerLife += 10;
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