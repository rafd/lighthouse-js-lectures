var morseLookup = {
  "s": "...",
  "o": "---"
};

var englishLookup = {
  "...": "s",
  "---": "o"
}

function englishCharToMorseChar(char) {
  return morseLookup[char.toLowerCase()];
};

function morseCharToEnglishChar(morse) {
  return englishLookup[morse.toLowerCase()];
};

function mapChars(string, splitChar, fn, joinChar) {
  return string.split(splitChar).map(fn).join(joinChar);
};

function textToMorse(string) {
  return mapChars(string, "", englishCharToMorseChar, " ");
};

function morseToText (morseString) {
  return mapChars(morseString, " ", morseCharToEnglishChar, "");
};

console.log(textToMorse("SOS"));

console.log(morseToText("... --- ..."));
