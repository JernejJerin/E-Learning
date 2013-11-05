#pragma strict

var speed : Vector3;
var timing : float;

function Start () {
	// I reckon you are in 2D so z is 0
	speed = Vector3(Random.Range(-2, 2), Random.Range(-2, 2), 0); 
	timing = 0;
}

function Update () {
	timing += Time.deltaTime;
	rigidbody.MovePosition(rigidbody.position + speed * Time.deltaTime); 
	if (timing > 3){
	   ChangeDirection();
	   timing = 0;
	}
}

function ChangeDirection () { 
	speed = new Vector3(Random.Range(-2, 2), Random.Range(-2, 2), 0);
}