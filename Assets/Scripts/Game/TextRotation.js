#pragma strict

var target : Transform;

function Update () {
	transform.LookAt(target);
	transform.Rotate(0, 180, 0);
}