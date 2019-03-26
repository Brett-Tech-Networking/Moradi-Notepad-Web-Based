var mytrack = document.getElementById('mytrack');
var playButton = document.getElementById('playButton');
var muteButton = document.getElementById('muteButton');

var duration = document.getElementById('fullDuration');
var currentTime = document.getElementById('currentTime');


var minutes = parseInt (mytrack.duration/60);
var seconds = pad(parseInt (mytrack.duration%60));

var barSize = 640;
var bar = document.getElementById('defaultBar');
var progressBar = document.getElementById('progressBar');

duration.innerHTML = minutes + ':'+ seconds;

playButton.addEventListener('click', playOrPause,false);
muteButton.addEventListener('click', muteOrUnmute,false);
bar.addEventListener('click', clickedBar, false);


function playOrPause()
{
  if (!mytrack.paused && !mytrack.ended)
  {
    mytrack.pause();
    playButton.style.backgroundImage = "url('images/play.png')";
    window.clearInterval(updateTime);
  }
  else
  {
    mytrack.play();
    playButton.style.backgroundImage = 'url(images/pause.png)';
    updateTime = setInterval (update,500);

  }
}

function muteOrUnmute ()
{
  if (mytrack.muted == true )
  {
    mytrack.muted = false;
    muteButton.style.backgroundImage = "url('images/speaker.png')";
  }

  else
  {
    mytrack.muted = true;
    muteButton.style.backgroundImage = "url('images/mute.png')";
  }
}

function update ()
{
  if (!mytrack.ended)
  {
    var playedMinutes = parseInt(mytrack.currentTime/60);
    var playedSeconds = pad(parseInt(mytrack.currentTime%60));
    currentTime.innerHTML = playedMinutes + ':' + playedSeconds;

    var size = parseInt(mytrack.currentTime*barSize/mytrack.duration);
    progressBar.style.width = size + 'px';
  }

  else
  {
      currentTime.innerHTML = "0.00";
        playButton.style.backgroundImage = 'url(images/play.png)';

        progressBar.style.width = size + "px";
        window.clearInterval(updateTime);
  }
}

function clickedBar(e)
{
  if (!mytrack.ended)
  {
    var mouseX = e.pageX - bar.offsetLeft;
    var newtime = mouseX*mytrack.duration/barSize;

    mytrack.currentTime = newtime;
    progressBar.style.width = mouseX + 'px';
  }
}

function pad(d)
{
  return (d < 10 ) ? '0'+d.toString() : d.toString();
}
