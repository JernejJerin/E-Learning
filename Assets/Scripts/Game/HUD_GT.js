public static function setText(gtName, text){
	GameObject.Find(gtName).guiText.text = text;	
}

public static function getText(gtName, text){
	return GameObject.Find(gtName).guiText.text;	
}
