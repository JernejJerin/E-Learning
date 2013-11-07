#pragma strict

function Start () {
Debug.Log("start");
}

function OnCollisionEnter(col : Collision) {
	if(col.gameObject.tag == "RockMesh") {
		Debug.Log("yes! hit tray!");
	}
	Debug.Log(col.gameObject.tag);
}


function Update () {
}