var table = {
  "s": "...",
  "o": "---",
  "...": "s",
  "---": "o"
};

var charToMorse = function (char) {
  return table[char.toLowerCase()];
};

var morseCharToChar = function (morse) {
  return table[morse.toLowerCase()];
};

var mapChars = function (string, splitChar, fn, joinChar) {
  return string.split(splitChar).map(fn).join(joinChar);
};

var textToMorse = function (string) {
  return mapChars(string, "", charToMorse, " ");
};

var morseToText = function (morseString) {
  return mapChars(morseString, " ", morseCharToChar, "");
};

console.log(textToMorse("SOS"));

console.log(morseToText("... --- ..."));
