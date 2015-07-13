---
layout: post
title: Luminance, Illuminance, and All That
---

![_config.yml]({{ site.baseurl }}/images/luminance1.png)

*What's the difference between **luminance** and **Illuminance**?*  

*Which unit should I use to describe the brightness of my light bulb? **Lumen**, **Candela**, or **Lux**?*  

If you find yourself ask these questions, this article is for you. The following provides a summary of these [confusing terms](https://en.wikipedia.org/wiki/Candela#SI_photometric_light_units). 
In short, there're really only **4 quantities** (and their accompanying units) that you need to know:  
1. Luminous Flux.  
2. Luminous Intensity.  
3. Luminance.  
4. Illuminance.  

We'll go through them one by one.  

Let's start with a lamp. (and a cat)  

![_config.yml]({{ site.baseurl }}/images/luminance1.png)



###
I've seen this trick on Reddit and other sites a few times, and decided to write a simple script that does the scrambling.  
[Click here to give it a try](http://jasonfly07.github.io/scrambler.html). 


###Implementation
The underlying idea is that given a word, we have to scramble the middle part (without the first and the last character). Namely, given a string `str`, we should shuffle the order of charactes in `str[1:-1]`.  
There are, however, 2 exceptions to this rule:  

1. Non-word characters should not be included. For example, if `str` is *"Eureka!"*, we should ignore both the quotation and exclamation marks. This means that we need to locate where **alphanumeric** characters start and end in a word.  

2. Words to be scrambled should be longer than 3-character. This should be pretty obvious. Beware that this is after taking 1. into account, so `"hi!"` is really just a 2-character word and cannot be scrambled.  

Finally, since we want the words to be as scrambled as possible, each time a word is scrambled, it's compared with the orignal one; if the scrambled word turns out to be identical as before, shuffle it again. However, some words like `been` cannot be rendered different from its original form, so we only reshuffle it 5 times.  