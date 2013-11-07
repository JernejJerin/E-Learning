#pragma strict

function Start () {

}

// Dolocimo hitrost pomikanja in obracanja igralca.
var speed = 3.0;
var rotateSpeed = 0.1;

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
	
	// Ce naletimo na zaklad, nakljucno generiramo novo steklenico.
	if (hit.transform.tag == "MathematicalTreasure") {
		// Posljemo sporocilo da naj ustvari novo enacbo.
		hit.transform.SendMessage("GenerateProblem", SendMessageOptions.DontRequireReceiver);
	}
		
	// Ce naletimo na steklenico jo unicimo.
	if (gameObject.tag == "Bottle")
		UnityEngine.Object.Destroy(gameObject);
	
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