#pragma strict

var target : Transform;

function LateUpdate () {
	this.transform.position = new Vector3(target.position.x, this.transform.position.y, target.position.z);
}