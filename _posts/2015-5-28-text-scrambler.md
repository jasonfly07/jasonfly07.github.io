---
layout: post
title: Text Scrambler & Brain Auto-correct
---

![_config.yml]({{ site.baseurl }}/images/stop.jpg)

###Alosmt ervey wrod in tihs scetnnee is mssepielld, but you usdernnatd it aynawy.  
Thus is the effect of your brain auto-correcting the words. So long as they slightly resemble the correct one (i.e., the *first* and the *last* character are in the right place), you will be able to understand it. Mostly. 

This is an easy one: **Golgoe** is most likely **Google**.  
But sometimes it's impossible to recover the word without context: **trhee** is **there** or **three**?

[Here's an article](http://wonderopolis.org/wonder/does-your-brain-autocorrect/) on this subject if you're interested.

###Demo
I've seen this trick on Reddit and other sites a few times, and decided to write a simple script that does the scrambling.  
[Click here to give it a try](http://jasonfly07.github.io/special/text-scrambler/scrambler.html). 


###Implementation
The underlying idea is that given a word, we have to scramble the middle part (without the first and the last character). Namely, given a string `str`, we should shuffle the order of charactes in `str[1:-1]`.  
There are, however, 2 exceptions to this rule:  

1. Non-word characters should not be included. For example, if `str` is *"Eureka!"*, we should ignore both the quotation and exclamation marks. This means that we need to locate where **alphanumeric** characters start and end in a word.  

2. Words to be scrambled should be longer than 3-character. This should be pretty obvious. Beware that this is after taking 1. into account, so `"hi!"` is really just a 2-character word and cannot be scrambled.  

Finally, since we want the words to be as scrambled as possible, each time a word is scrambled, it's compared with the orignal one; if the scrambled word turns out to be identical as before, shuffle it again. However, some words like `been` cannot be rendered different from its original form, so we only reshuffle it 5 times.  

```python
# A simple program to scramble words. 
# Takes input from "scramble_input.txt" and store the result in "scramble_output.txt"

import re
import random

def main():
  # Store the text file as lines in "lines"
  txtFile = open("scramble_input.txt", "r")
  lines = []
  for line in txtFile:
    lines.append(line)


  outputFile = open("scramble_output.txt", "w")
      
  # Iterate through lines
  for line in lines:
    words = line.split()
      
    # Iterate through words
    for word in words:

      # Special case for word <= 3 characters
      if len(word) <= 3:
        scrWord = word
        outputFile.write(scrWord + " ")
        continue

      # Ignore any non-alphanumeric characters on either sides (head & tail)
      # (with regular expression "\w")
      # and find the first and last index of alphanumeric characters
      firstID = re.search("\w",word).start(0)
      lastID  = len(word) - 1 - re.search("\w",word[::-1]).start(0)

      wordHead = word[:firstID]
      wordBody = word[firstID:lastID+1]
      wordTail = word[lastID+1:]

      # print wordHead, wordBody, wordTail

      # Ignore wordBody that are 1-3 characters long
      if len(wordBody) <= 3:
        scrWord = word
      else:
        firstChar   = wordBody[:1]
        middleChars = wordBody[1:-1]
        lastChar    = wordBody[-1:]

        # Shuffle the middle part until it's different from the original substring
        # run it no more than 5 times; it's impossible to fulfill this criterion with
        # words like "been"
        for i in range(0, 5):
          l = list(middleChars)
          random.shuffle(l)
          middleShuffled = ''.join(l)
          if middleShuffled != middleChars:
            break

        # Reconstruct the word
        wordBody = firstChar + ''.join(l) + lastChar
        scrWord = wordHead + wordBody + wordTail

      # Write the final word to the file
      outputFile.write(scrWord + " ")

    # Don't forget to change line
    outputFile.write("\n")

  outputFile.close()


if __name__ == "__main__":
  main()
```