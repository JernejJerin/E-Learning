#pragma strict

var bottle : Transform;

function Start () {

}

function Update () {

}

function GenerateProblem() {
	Instantiate(bottle, Vector3(0, 3, 0), Quaternion.identity);
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("Trigger entered");
}
