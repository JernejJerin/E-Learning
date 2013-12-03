var scrollPosition : Vector2 = Vector2.zero;
var font : Font;
//	var style : GUIStyle;
private var help = "<b>POMOČ UPORABNIKU</b>\n\n"+
"Uporabniku upravlja matematicno ladjo za reševanje naslednjih osnovnih matematičnih problemov: \n"+
"\t•	Seštevanje \n"+
"\t•	Odštevanje \n"+
"\t•	Množenje \n"+
"\t•	Deljenje \n\n"+
"V igri se nahajajo štirje otoki, na katerih so postavljeni matematični zakladi. \n"+
"Ko se uporabnik z ladjo dotakne matematičnega zaklada, se generira matematični problem, \n"+
"ki ga mora uporabniki rešiti. Uporabnik reši navedeni problem tako, da z upravljanjem ladje pobira steklenice.\n"+
"Uporabnik upravlja ladjo z naslednjimi kombinacijami tipk: \n"+
"\t•	Pušcica navzgor za pomik ladje naprej \n"+
"\t•	Pušcica levo za pomik ladje levo \n"+
"\t•	Pušcica desno za pomik ladje desno \n"+
"\t•	Pušcica navzdol za pomik ladje nazaj \n"+
"\t•	Tipka presledek za TURBO pogon \n\n"+
"Ob generiranju matematicnega problema se ustvari 20 steklenic, ki imajo pripisane vrednosti. \n"+
"Pri matematičnih operacijah seštevanje in odštevanje mora uporabnik nabrati (oziroma pobrati) \n"+
"tolikšno vrednost steklenice kot je rešitev enačbe. \n"+
"Ob pobiranju steklenic se uporabnik izpisuje trenutno nabrana vrednost (vrednosti se seštevajo). \n"+
"Poleg tega za vsako pobrano steklenico dobi dodatne točke. \n"+
"Tako je v interesu uporabnika da poizkuša rešiti enačbo tako, da pobere čim vec steklenic, toda mora tudi paziti,\n"+
"da mu preostane takšna kombinacija steklenic, da bo lahko rešil problem. Ko se nabrana vrednost ujema z dejansko rešitvijo se problem zaključi.  \n"+
"Medtem ko pri množenju in deljenju mora uporabnik samo pobrati stekelnico, ki reši enačbo. Ob pobiranju napačnih steklenic uporabnik dobi negativne točke. \n"+
"V okolici se nahaja tudi piratske ladje, ki poskušajo ustaviti našo ladjo. Ce nas zadenejo, izgubimo 10 točk. Če vrednost točk pade pod 0 točk, izgubimo igro. \n"+
"Ob pravilni rešitvi se nam poveča nivo igre za 1. To pomeni večjo težavnost (daljše matematične enačbe, večji obseg števil in večje število piratskih ladij).";


var buttonW:int = 300;
var buttonH:int = 50;
var halfScreenW:float = Screen.width/2;
var halfButtonW:float = buttonW/2;
function OnGUI () {
		GUI.skin.label.font = font;
		if(GUI.Button(Rect(halfScreenW-halfButtonW,20,buttonW,buttonH),"Nazaj"))
		{
			Application.LoadLevel("title");
		}
		
		// Make a group on the center of the screen
		GUI.BeginGroup (new Rect (Screen.width / 2 - 450, Screen.height / 2 - 300, 950, 500));
		// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.
		

		//GUI.skin.scrollView = style;
		// rect and put it in a small rect on the screen.
		scrollPosition = GUI.BeginScrollView (Rect (0,100,950,400),scrollPosition, Rect (0, 0, 950, 500));
		// Make four buttons - one in each corner. The coordinate system is defined
		// by the last parameter to BeginScrollView.
		GUILayout.Label (help, GUILayout.ExpandHeight (true));
		    
		// End the scroll view that we began above.
		GUI.EndScrollView ();

		// End the group we started above. This is very important to remember!
		GUI.EndGroup ();

	}