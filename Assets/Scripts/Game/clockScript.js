
var isPaused : boolean = false;
var startTime : float; //(in seconds)
var timeRemaining : float; //(in seconds)

function Start () {
	guiText.material.color = Color.black;
}

function Update () {
	if (!isPaused)
	{
	// make sure the timer is not paused
		DoCountdown();
	}
}

function DoCountdown() {
}

function PauseClock()
{
	isPaused = true;
}
function UnpauseClock()
{
	isPaused = false;
}

function ShowTime()
{
}

function TimeIsUp()
{
}