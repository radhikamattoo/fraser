// Radhika Mattoo, radhika095@gmail.com
document.addEventListener("DOMContentLoaded", (event) =>{
  // Setup MP3 variables
  // To change out the file(s), only change the filename and keep the '/s/'
  // i.e. if you new 'before' filename uploaded to squarespace is 'hello-world.mp3',
  // the new beforeURL line would be: const beforeURL = "/s/hello-world.mp3";
  const beforeURL = "/s/afraid-of-love-mix-compare-before.mp3";
  const afterURL = "/s/afraid-of-love-mix-compare-after.mp3";

  // Squarespace image URLs - do not change these!
  const whiteClefImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/60415c7d5d59c90d8ab94c00/1614896258857/clef+graphic+white.png?format=750w";
  const blackClefImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/6041605493eaa01f72556214/1614897237668/clef+graphic+black.png?format=500w";
  const whiteLeafImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/6041602fe5570c37ff4e6d28/1614897202668/leaf+graphic+white.png?format=500w";
  const blackLeafImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/60415c47c691ce78b7455d02/1614896204352/leaf+graphic+black.png?format=750w";
  const pauseImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/60416b7d0e0f38002c96d5b7/1614900094690/pause-black.png?format=300w";
  const playImageURL = "https://static1.squarespace.com/static/6018773eb8f6f63bc05bd45e/t/604164a00771d01c0fed9f6a/1614898340425/play-black.png?format=300w";

  // Div IDs - do not change these!
  const beforeID = "block-yui_3_17_2_1_1614895594688_72654";
  const afterID = "block-yui_3_17_2_1_1614895594688_80952";
  const playID = "block-yui_3_17_2_1_1614800884754_26526";

  // Div elements
  const beforeElement = document.getElementById(beforeID);
  // const beforeTextElement = beforeElement.getElementsByTagName('h3')[0];
  const beforeImageElement = beforeElement.getElementsByTagName('img')[0];

  const afterElement = document.getElementById(afterID);
  // const afterTextElement = afterElement.getElementsByTagName('h3')[0];
  const afterImageElement = afterElement.getElementsByTagName('img')[0];

  const playElement = document.getElementById(playID).getElementsByTagName('figure')[0];
  const playImageElement = playElement.getElementsByTagName('img')[0];

  beforeElement.style.backgroundColor = "black";

  afterElement.style.backgroundColor = "#fef9f5";

  // Create hidden audio players
  const beforeAudioElement = createAudioElement(beforeURL);
  const afterAudioElement = createAudioElement(afterURL);

  // Controls which file to play
  let currentlySelectedAudioElement = beforeAudioElement;
  let currentlySelectedElement = beforeElement;
  let currentlyPlaying = false;

  // Handles click events on either circle
  beforeElement.addEventListener("click", (event) =>{
    // Already playing this track
    if(currentlyPlaying && !beforeAudioElement.paused){
      return;
    }
    // Switch image/styling
    beforeElement.style.backgroundColor = "black";
    beforeElement.classList.add("play-sound");
    beforeImageElement.src = whiteClefImageURL;

    afterElement.style.backgroundColor = "#fef9f5";
    afterElement.classList.remove("play-sound");
    afterImageElement.src = blackLeafImageURL;
    // Set audio timestamp
    beforeAudioElement.currentTime = afterAudioElement.currentTime;

    currentlySelectedAudioElement = beforeAudioElement;
    currentlySelectedElement = beforeElement;

    // If the other file is already playing, pause it and start this track
    if(currentlyPlaying && beforeAudioElement.paused){
      afterAudioElement.pause();
      beforeAudioElement.play();
    }
  });
  afterElement.addEventListener("click", (event) =>{
    // Already playing this track
    if(currentlyPlaying && !afterAudioElement.paused){
      return;
    }
    // Switch styling
    afterElement.style.backgroundColor = "black";
    afterElement.classList.add("play-sound");
    afterImageElement.src = whiteLeafImageURL;

    beforeElement.style.backgroundColor = "#fef9f5";
    beforeElement.classList.remove("play-sound");
    beforeImageElement.src = blackClefImageURL;

    // Set audio timestamp
    afterAudioElement.currentTime = beforeAudioElement.currentTime;

    currentlySelectedAudioElement = afterAudioElement;
    currentlySelectedElement = afterElement;

    // If the other file is already playing, pause it and start this track
    if(currentlyPlaying && afterAudioElement.paused){
      beforeAudioElement.pause();
      afterAudioElement.play();
    }
  });

  // Handles click events on play/pause image
  playElement.addEventListener("click", (event) =>{
    if(currentlyPlaying){
      currentlySelectedAudioElement.pause();
      currentlySelectedElement.classList.remove("play-sound");
      playImageElement.src = playImageURL;
      currentlyPlaying = false;
    }else{
      currentlySelectedAudioElement.play();
      currentlySelectedElement.classList.add("play-sound");
      playImageElement.src = pauseImageURL;
      currentlyPlaying = true;
    }
  });

  // Handles cleanup when audio file ends
  beforeAudioElement.addEventListener("ended", handleAudioEnd);
  afterAudioElement.addEventListener("ended", handleAudioEnd);

  function handleAudioEnd(evt){
    playImageElement.src = playImageURL;

    currentlyPlaying = false;

    beforeAudioElement.currentTime = 0.0;
    afterAudioElement.currentTime = 0.0;

    beforeElement.classList.remove("play-sound");
    afterElement.classList.remove("play-sound");

  }
  function createAudioElement(audioURL){
    const audioElement = document.createElement('audio');
    audioElement.style.display = 'none';
    audioElement.src = audioURL;
    audioElement.type = 'audio/mpeg';
    return audioElement;
  }
})
