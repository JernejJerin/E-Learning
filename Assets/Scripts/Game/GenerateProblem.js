#pragma strict

var bottle : Transform;

function Start () {

}

function Update () {

}


function GenerateProblem() {
	Instantiate(bottle, Vector3(Random.Range(830,980), -0.2, Random.Range(910,1095)), Quaternion.identity);
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("Trigger entered");
}
