const synth = window.speechSynthesis;
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voice arrays

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    //loop through the voices

    voices.forEach(voice => {
        //create a option an element
        const option = document.createElement('option');
        //fill the option with voices and language
        option.textContent = voice.name + '(' + voice.lang + ')';
        //set needed option attributes

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    })
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak

const speak = () => {


    if (synth.speaking) {
        //already in speaking
        console.error('already speaking!');
        return;
    }
    if (textInput.value != '') {
        //add background animation
        body.style.background = '#141414 url(./wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speaking text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e => {
            console.log('Done Speaking...!');
            body.style.background = 'linear-gradient(to right, #0f0c29, #302b63, #24243e)';
        }
        //speak error
        speakText.onerror = e => {
            console.error('Something is Wrong!!');
        }
        //selected voice
        const selctedVoice = voiceSelect.selectedOptions[0]
            .getAttribute('data-name');

        //loop through the voices

        voices.forEach(voice => {
            if (voice.name === selctedVoice) {
                speakText.voice = voice;
            }
        });

        //set picth and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak 
        synth.speak(speakText);

    }
};

//event listeners

//text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
//pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener('change', e => speak());