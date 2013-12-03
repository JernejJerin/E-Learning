
// Dolocimo hitrost pomikanja, obracanja igralca in aktivnost zaklada.
var speed = 15.0;
var rotateSpeed = 0.1;
var treasureActivated = false;
var text3D : Transform;
var pushPower = 2.0;
var jetEngine : Transform;
var jetEngine2 : Transform;
static var level = 0;

// Ob vsakem izrisu slike (frame) se poklice Update funkcija.
function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	
	// Obracanje okoli y-osi. Kot argument je podan 3D vektor.
	transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0); 
	
	// Pomikanje nazaj/naprej.
	var forward = transform.TransformDirection(Vector3.forward); 
	var curSpeed = speed * Input.GetAxis ("Vertical"); 
	controller.SimpleMove(forward * curSpeed);
	
	//vklop turbo pogona
	if (Input.GetKeyDown ("space")){
		speed = 100.0;
		rotateSpeed = 5;
		toggleJetEngineActive();
		Debug.Log("pritisnil space");
	}
	if (Input.GetKeyUp ("space")){
		speed = 15.0;
		rotateSpeed = 0.5;
		toggleJetEngineActive();
		if(LifeBar.getPowerLife() > 5){
			LifeBar.changeLifeBarPower(-5);
		}
	}
	if (Input.GetKeyDown ("s")){
		var generateProblem = this.transform.GetComponent(GenerateProblem);
		generateProblem.currentSolution = generateProblem.solution;
		level++;
			HUD_GT.setText("gtLevel", "Nivo: " + level);
			
			// Deaktiviramo zaklad.
			treasureActivated = false;
			
			// Obarvamo tekst nad zakladom rdece.
			text3D.renderer.material.color = Color.yellow;
			
			// Unicimo vse steklenice.
			var clones = GameObject.FindGameObjectsWithTag ("BottleClone");
		    for (var clone in clones){
		        Destroy(clone);
		    }
		    
		    //Unicimo vse piratske ladje
		    clones = GameObject.FindGameObjectsWithTag ("PirateShipClone");
		    for (var clone in clones){
		        Destroy(clone);
		    }
		    InterfaceGUI.showEquation = false;
		    HUD_GT.setText("gtEquation", "Poisci novo enacbo!");
		Debug.Log("pritisnil s");
	}
}

function toggleJetEngineActive(){
	jetEngine.active = !jetEngine.active;
	jetEngine2.active = !jetEngine2.active;
}
// Upravljanje z trki matematicne ladje.
function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body : Rigidbody = hit.collider.attachedRigidbody;
	var gameObject : GameObject = hit.collider.gameObject;
	var generateProblem : GenerateProblem;
	
	// Preverimo ali smo naleteli na zaklad in ali ze ni kateri od zakladov aktiven.
	if (hit.transform.tag.IndexOf("MathematicalTreasure") != -1 && !treasureActivated) {
		// Aktiviramo zaklad.
		this.treasureActivated = true;
		
		// Obarvamo tekst nad zakladom rdece.
		this.text3D = hit.transform.parent.Find("3D Text");
		this.text3D.renderer.material.color = Color.red;
		
		// Glede na tip zaklada (sestevanje, odstevanje, mnozenje, deljenje) posljemo sporocilo z parametrom o tipu enacbe.
		var island = hit.transform.parent + "";
		
		if (island.IndexOf("Addition") != -1) {
			this.transform.SendMessage("GenerateProblem", 0, SendMessageOptions.DontRequireReceiver);
		} else if (island.IndexOf("Subtraction") != -1) {
			this.transform.SendMessage("GenerateProblem", 1, SendMessageOptions.DontRequireReceiver);
		} else if (island.IndexOf("Multiplication") != -1) {
			this.transform.SendMessage("GenerateProblem", 2, SendMessageOptions.DontRequireReceiver);
		} else if (island.IndexOf("Division") != -1) {
			this.transform.SendMessage("GenerateProblem", 3, SendMessageOptions.DontRequireReceiver);
			
		}
		
		Debug.Log("Zadel v matematiöni zaklad");
	}
	
	//Ko nas napade pirate ship izgine
	if(hit.transform.tag.IndexOf("PirateShip") != -1){
		AudioSource.PlayClipAtPoint(hit.transform.gameObject.audio.clip, transform.position);
    	DestroyObject(hit.transform.gameObject);
    	LifeBar.changeLifeBarPower(-10);
		Debug.Log("Zadel v pirateShip");
	}
		
	// Ce naletimo na steklenico jo unicimo in dodamo zvocni efekt.
	if (gameObject.tag == "BottleClone") {	
		AudioSource.PlayClipAtPoint(gameObject.audio.clip, transform.position);
		
		// Naleteli smo na steklenico, torej je potrebno dobiti skripto GenerateProblem z metodo Find.
		generateProblem = this.transform.GetComponent(GenerateProblem);
		generateProblem.currentSolution += gameObject.GetComponent(BottleProperties).bottleValue;
		
		// Ali je uporabnikova resitva enaka uradni resitvi?
		if (generateProblem.solution == generateProblem.currentSolution) {
			level++;
			HUD_GT.setText("gtLevel", "Nivo: " + level);
			
			// Deaktiviramo zaklad.
			treasureActivated = false;
			
			// Obarvamo tekst nad zakladom rdece.
			text3D.renderer.material.color = Color.yellow;
			
			// Unicimo vse steklenice.
			var clones = GameObject.FindGameObjectsWithTag ("BottleClone");
		    for (var clone in clones){
		        Destroy(clone);
		    }
		    
		    //Unicimo vse piratske ladje
		    clones = GameObject.FindGameObjectsWithTag ("PirateShipClone");
		    for (var clone in clones){
		        Destroy(clone);
		    }
		    InterfaceGUI.showEquation = false;
		    HUD_GT.setText("gtEquation", "Poisci novo enacbo!");
		    
		} else {
			UnityEngine.Object.Destroy(gameObject);
		}
		LifeBar.changeLifeBarPower(10);
	}
	
	// no rigidbody
	if (body == null || body.isKinematic)
		return;
		
	// We dont want to push objects below us
	if (hit.moveDirection.y < -0.3) 
		return;
	
	// Calculate push direction from move direction, 
	// we only push objects to the sides never up and down
	var pushDir : Vector3 = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);

	// If you know how fast your character is trying to move,
	// then you can also multiply the push velocity by that.
	
	// Apply the push
	body.velocity = pushDir * pushPower;
}

@script RequireComponent(CharacterController)