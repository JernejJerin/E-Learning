var customSkin:GUISkin;
var audioClip : AudioClip;

function OnGUI () {
	GUI.skin = customSkin;
	var buttonW:int = 200;
	var buttonH:int = 50;
	var halfScreenW:float = Screen.width/2;
	var halfButtonW:float = buttonW/2;
	
	if(GUI.Button(Rect(halfScreenW-halfButtonW,360,buttonW,buttonH),"Start"))
	{
		
		Application.LoadLevel("terrian");
		AudioSource.PlayClipAtPoint(audioClip, this.transform.position);
	}
	
	if(GUI.Button(Rect(halfScreenW-halfButtonW,420,buttonW,buttonH),"Navodila"))
	{
		
		Application.LoadLevel("help");
		AudioSource.PlayClipAtPoint(audioClip, this.transform.position);
	}
}