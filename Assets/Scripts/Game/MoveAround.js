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


@script RequireComponent(CharacterController)