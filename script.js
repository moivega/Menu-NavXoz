
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'inicio',
  'amenazas',
  'recomendaciones',
  'estandares',
  'tecnologia'
]

/*var phrasePara = document.querySelector('.phrase');*/
/*var resultPara = document.querySelector('.result');*/
/*var diagnosticPara = document.querySelector('.output');*/

var eventoMenu = document.querySelector('.menu');

var testBtn = document.querySelector('button');

/*function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}*/

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Micrófono Off';
  /*var phrase = phrases[randomPhrase()];*/
  /*phrasePara.textContent = phrase;*/
  /*resultPara.textContent = 'Correcto o Incorrecto?';*/
  /*resultPara.style.background = 'rgba(0,0,0,0.2)';*/
  /*diagnosticPara.textContent = '...mensaje de diagnostico';*/

  var recognition = new SpeechRecognition();
  /*var speechRecognitionList = new SpeechGrammarList();

  for (var i=0; i<phrases.lenght(); i++) {
    var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases[i] +';';
    speechRecognitionList.addFromString(grammar, 1);
  }

  recognition.grammars = speechRecognitionList; */
  recognition.lang = 'es';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {

    var speechResult = event.results[0][0].transcript;
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';

    for (var i=0; i<phrases.lenght(); i++) {
      if (speechResult == phrases[i]) {
        /* resultPara.textContent = 'Yo escucho la frase correcta!';
        resultPara.style.background = 'lime'; */
        eventoMenu.getElementsByClassName("phrases[i]").onclick="href='phrases[i]'+'.html'";
      }
    /*  else {
        resultPara.textContent = 'No suena muy bien!';
        resultPara.style.background = 'blue';
      } */
    }


    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Activar Micrófono';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Activar Micrófono';
    diagnosticPara.textContent = 'Error ocurrido en reconocimiento: ' + event.error;
  }

}

testBtn.addEventListener('click', testSpeech);

