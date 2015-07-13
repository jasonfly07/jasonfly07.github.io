---
layout: post
title: Lumen, Candela and All That
---

![_config.yml]({{ site.baseurl }}/images/luminance1.png)

###Alosmt ervey wrod in tihs scetnnee is mssepielld, but you usdernnatd it aynawy.  
Thus is the effect of your brain auto-correcting the words. So long as they slightly resemble the correct one (i.e., the *first* and the *last* character are in the right place), you will be able to understand it. Mostly. 

This is an easy one: **Golgoe** is most likely **Google**.  
But sometimes it's impossible to recover the word without context: **trhee** is **there** or **three**?

[Here's an article](http://wonderopolis.org/wonder/does-your-brain-autocorrect/) on this subject if you're interested.

###Demo
I've seen this trick on Reddit and other sites a few times, and decided to write a simple script that does the scrambling.  
[Click here to give it a try](http://jasonfly07.github.io/scrambler.html). 


###Implementation
The underlying idea is that given a word, we have to scramble the middle part (without the first and the last character). Namely, given a string `str`, we should shuffle the order of charactes in `str[1:-1]`.  
There are, however, 2 exceptions to this rule:  

1. Non-word characters should not be included. For example, if `str` is *"Eureka!"*, we should ignore both the quotation and exclamation marks. This means that we need to locate where **alphanumeric** characters start and end in a word.  

2. Words to be scrambled should be longer than 3-character. This should be pretty obvious. Beware that this is after taking 1. into account, so `"hi!"` is really just a 2-character word and cannot be scrambled.  

Finally, since we want the words to be as scrambled as possible, each time a word is scrambled, it's compared with the orignal one; if the scrambled word turns out to be identical as before, shuffle it again. However, some words like `been` cannot be rendered different from its original form, so we only reshuffle it 5 times.  