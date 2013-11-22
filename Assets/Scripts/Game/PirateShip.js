#pragma strict

var speed : float;
var direction : Vector3;
var timeElapsed : float;
var directionChangeTime : float;
var target : Transform;
var tmp : Vector3;
var me : Transform;


function Start () {
	// Smeri vektor naj bo normaliziran (vrednosti med -1 in 1). Kasneje pomnozimo z hitrostjo.
	direction = Vector3(Random.Range(-1, 1), 0, Random.Range(-1, 1)); 
	timeElapsed = 0;
}

function Update () {

	// Cas, ki je potekel povecamo.
	timeElapsed += Time.deltaTime;
	
	// Trenutni poziciji pristejemo smer ladje pomnozeno z njeno hitrostjo.
	tmp = rigidbody.position + direction * speed * Time.deltaTime;
	rigidbody.MovePosition(tmp);
	transform.LookAt(tmp);
	
	// Ali je ze potekel cas za ponovni obrat?
	if (timeElapsed > directionChangeTime){
	   ChangeDirection();
	   timeElapsed = 0;
	}
}

// Spremenimo smer ladje.
function ChangeDirection () { 
	direction = new Vector3(Random.Range(-1, 1), 0, Random.Range(-1, 1));
}
//DestroyObject(transform.gameObject);

function OnCollisionEnter(collision : Collision) {
    if(collision.gameObject.tag.IndexOf("MathematicalShip") != -1){
    	DestroyObject(me.gameObject);
    	LifeBar.changeLifeBarPower(-10);
		Debug.Log("Zadel v pirateShip");
    }
}