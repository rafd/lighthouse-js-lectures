var morseLookup = {
  "s": "...",
  "o": "---"
};

var englishLookup = {
  "...": "s",
  "---": "o"
};

function englishCharToMorseChar(char) {
  return morseLookup[char.toLowerCase()];
};

function morseCharToEnglishChar(morse) {
  return englishLookup[morse.toLowerCase()];
};

function englishToMorse(string) {
  var out = "";
  var chars = string.split("");

  for(var i = 0; i < string.length; i++) {
    out += englishCharToMorseChar(chars[i]);
  }

  return out;
};

function morseToEnglish(string) {
  var out = "";
  var chars = string.split("");

  for(var i = 0; i < string.length; i++) {
    out += morseCharToEnglishChar(chars[i]);
  }

  return out;
};

console.log(englishToMorse("SOS"));

console.log(morseToEnglish("... --- ..."));
