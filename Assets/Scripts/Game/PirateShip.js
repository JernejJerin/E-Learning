var speed : float;
var direction : Vector3;
var timeElapsed : float;
var directionChangeTime : float;
var target : Transform;
var tmp : Vector3;


function Start () {
	// Smeri vektor naj bo normaliziran (vrednosti med -1 in 1). Kasneje pomnozimo z hitrostjo.
	direction = Vector3(target.position.x - rigidbody.position.x, 0, target.position.z - rigidbody.position.z);
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
	//direction = new Vector3(Random.Range(-1, 1), 0, Random.Range(-1, 1));
	direction = Vector3(target.position.x - rigidbody.position.x, 0, target.position.z - rigidbody.position.z);
}

public static function generatePirateShip(newSpeed, directionChangeTime)
{
	var ps = Instantiate(GameObject.FindWithTag("PirateShip").transform, GenerateProblem.getRandomValidXZ() , Quaternion.identity);
	ps.tag = "PirateShip";
	var psjs : PirateShip = ps.GetComponent("PirateShip");
	psjs.speed = newSpeed;
	psjs.directionChangeTime = directionChangeTime;
}
