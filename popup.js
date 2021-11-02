const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    //   selecting "Google US English" voice as default
    let selected = voice.name == "Google US English" ? "selected" : "";
    // creating an option tag with passing voice name and voice language
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    // inserting option tag beforeend of select tag
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    //  if available device voice name is equal to user selected voice name,
    //  then set speech voice to user selected voice
    if (voice.name == voiceList.value) {
      utternance.voice = voice;
    }
  }
  // speak the speech / utternance
  speechSynthesis.speak(utternance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    //   if an utteranance/speech is not currently in the process of speaking
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }

      // checking is utternance/speech in speaking process or not in every 100 ms
      // if not then set the value of isSpeaking to true and change button text
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert To Speech";
        }
      });
    } else {
      speechBtn.innerText = "Convert To Speech";
    }
  }
});
