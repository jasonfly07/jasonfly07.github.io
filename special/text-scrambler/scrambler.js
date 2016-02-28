$(document).ready(function() {
	$('#buttonScramble').click(function() {
		var input = document.getElementById("inputText").value;
		document.getElementById("outputText").innerHTML = scrambleText(input);
  });
  $('#buttonClear').click(function() {
    document.getElementById("inputText").value      = "";
    document.getElementById("outputText").innerHTML = "";
  });
});

var scrambleText = function(str) {
    // Split lines
    var lines = str.split("\n");

    var output = "";
    
    // Iterate through each line
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Split words 
      var words = line.split(" ");
      
      // Iterate through each word
      for (j = 0; j < words.length; j++) {
        var word = words[j];

        // Special case for word <= 3 characters
        if (word.length <= 3) {
          output = output.concat(word," ");
          continue;
        }

        // Ignore any non-alphanumeric characters on either sides (head & tail)
        // and find the first and last index of alphanumeric characters
        var wordReversed = word.split("").reverse().join("");
        var firstID = word.match(/\w/).index;
        var lastID  = word.length - 1 - wordReversed.match(/\w/).index;

        // Split the word into 3 parts
        var wordHead = word.substring(0, firstID);
        var wordBody = word.substring(firstID, lastID+1);
        var wordTail = word.substring(lastID+1);

        // Ignore wordBody that are 1-3 characters long
        var finalWord = "";
        if (wordBody.length <= 3) finalWord = word;
        
        else {
          var firstChar   = wordBody.substring(0, 1);
          var middleChars = wordBody.substring(1, wordBody.length-1);
          var lastChar    = wordBody.substring(wordBody.length-1);

          // Scramble the middle part
          var middleCharsScrambled = middleChars;
          for (k = 0; k < 5; k++) {
            middleCharsScrambled = middleChars.shuffle();
            if(middleCharsScrambled != middleChars) break;
          }

          // Reconstruct the word
          wordBody  = firstChar.concat(middleCharsScrambled, lastChar);
          finalWord = wordHead.concat(wordBody, wordTail);
        }
        output = output.concat(finalWord, " ");
      }
      output = output.concat("\n");
    }
    return output;
}


// Scramble string. 
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
