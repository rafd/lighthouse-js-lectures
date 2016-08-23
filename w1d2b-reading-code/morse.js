var table = {
  "s": "...",
  "o": "---",
  "...": "s",
  "---": "o"
};

function charToMorse (char) { // char = "S"
  return table[char.toLowerCase()];
};

function morseCharToChar (morse) {
  return table[morse.toLowerCase()];
};

function textToMorse (string) {
  var out = ""; // "...---..."
  var chars = string.split(""); // === ["S", "O", "S"]

  for(var i = 0; i < string.length; i++) { // i = 0, 1, 2
    out += charToMorse(chars[i]);
  }

  return out;
};

function morseToText (string) {
  var out = "";
  var chars = string.split("");

  // forEach serves the same purpose as the for-loop in textToMorse
  // but is generally preferred when you're just looping over each item once
  string.split(" ").forEach(function(c) {
    out += morseCharToChar(c);
  });

  return out;
};
  
console.log(textToMorse("SOS"));

console.log(morseToText("... --- ..."));
