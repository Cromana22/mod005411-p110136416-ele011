const SpeakContentLink = document.getElementById("SpeakContentLink");

SpeakContentLink.addEventListener('click', function(e) {
    isSpeaking = speechSynthesis.speaking;
    if (isSpeaking == false) {
        var htmlContents = document.querySelectorAll('.ReadAloud');
        [].forEach.call(htmlContents, function (htmlContent) { 
            speak(htmlContent.textContent);
        });
    }
    else {
        speechSynthesis.cancel();
    }

});

function speak(text) {
    var msg = new SpeechSynthesisUtterance();

    msg.addEventListener('start', function(event) {
        SpeakContentLink.classList.add("active");
        SpeakContentLink.innerHTML = `<i class="fa-solid fa-compact-disc fa-spin"></i>`;
    });
    
    msg.addEventListener('end', function(event) {
        SpeakContentLink.classList.remove("active");
        SpeakContentLink.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    });

    msg.text = text;
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    msg.voice = speechSynthesis.getVoices().filter(
        function(voice) {
            return voice.name == "Microsoft Sonia Online (Natural) - English (United Kingdom)";})[0];
    window.speechSynthesis.speak(msg);

    voices = speechSynthesis.getVoices().forEach(voice => console.log(voice.name));
}