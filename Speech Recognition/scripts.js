const textarea = document.getElementById("textarea");
const indicator = document.getElementById("indicator");
const copySpeech = document.getElementById("copySpeech");
const clearSpeech = document.getElementById("clearSpeech");
const voiceStart = document.getElementById("voiceStart");
const voiceFinish = document.getElementById("voiceFinish");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

voiceStart.addEventListener("click", () => {
  recognition.continuous = true;
  recognition.start();

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    const replaceTranscript = transcript.replace(/hello/, "Hi");
    textarea.textContent = replaceTranscript;
  });
});

voiceFinish.addEventListener("click", () => {
  recognition.stop();
});

recognition.addEventListener("audiostart", () => {
  indicator.style.display = "block";
});

recognition.addEventListener("audioend", () => {
  indicator.style.display = "none";
});

clearSpeech.addEventListener("click", () => {
  textarea.innerText = "";
});

copySpeech.addEventListener("click", () => {
  const copyText = textarea.value;
  if (copyText.trim() != 0) {
    textarea.select();
    navigator.clipboard.writeText(copyText);
  }
});
