
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var navElement = ['rojo', 'VERDE', 'azul', 'amarillo', 'magenta', 'cian', 'blanco', 'negro']
var grammar = '#JSGF V1.0; grammar navElement;'
var i;
for (i = 0; i < navElement.length; i++) {
  grammar = grammar + ' public <navElement' + i + '> = ' + navElement[i] + ';';
}

var testBtn = document.querySelector('button');

function testSpeech() {

    testBtn.disabled = true;
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'es-Latin American';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = function(event) {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at position 0.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      var speechResult = event.results[0][0].transcript;
      for (i = 0; i < navElement.length; i++) {
        if (speechResult == navElement[i]) {
          var url = document.getElementById(navElement[i]);
          url.click();
          /*window.location.assign(url);*/
        }
      }
      console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function() {
      recognition.stop();
      testBtn.disabled = false;
    }

    recognition.onerror = function(event) {
      testBtn.disabled = false;
    }

}

testBtn.addEventListener('click', testSpeech);

