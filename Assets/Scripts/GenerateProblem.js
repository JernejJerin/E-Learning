#pragma strict

var bottle : Transform;

function Start () {

}

function Update () {

}

function GenerateProblem() {
	Instantiate(bottle, Vector3(966, 1, 1010), Quaternion.identity);
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("Trigger entered");
}
