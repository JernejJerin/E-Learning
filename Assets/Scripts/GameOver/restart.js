var audioClip : AudioClip;

function OnMouseDown(){
 	Debug.Log("clicked");
 	Application.LoadLevel("terrian");
	AudioSource.PlayClipAtPoint(audioClip, this.transform.position);
}
