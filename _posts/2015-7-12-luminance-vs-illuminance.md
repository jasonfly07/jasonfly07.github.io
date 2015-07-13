---
layout: post
title: Luminance, Illuminance, and All That
---

![_config.yml]({{ site.baseurl }}/images/luminance1.png)

What's the difference between **luminance** and **Illuminance**?  

Which unit should I use to describe the brightness of my light bulb? **Lumen**, **Candela**, or **Lux**?  

If you find yourself ask these questions, this article is for you. The following provides a summary of these [confusing terms](https://en.wikipedia.org/wiki/Candela#SI_photometric_light_units). 
In short, there're really only **4 quantities** (and their accompanying units) that you need to know, and we'll go through them one by one.  

Let's start with a lamp. (and Elizabeth the cat)  

###1. Luminous Flux

![_config.yml]({{ site.baseurl }}/images/luminance2.png)

When you buy a light bulb, the first (and probably the only) thing you want to know is *how much light comes out of the light bulb*. This is expressed with **luminous flux** (or luminous power), which measures **the total amount of power of visible light emitted from the light source**.     
The unit is **lumen**.  

###2. Luminous Intensity

![_config.yml]({{ site.baseurl }}/images/luminance3.png)

Ok, so now we know how much light the lamp emits in total, but what if we just want to know *how much light it's emitting at a particular direction*? This can be represented with **luminous intensity**, which is simply **luminous flux per unit solid angle**.  

The unit is lumen/sr, or **candela**.  

###3. Illuminance  

![_config.yml]({{ site.baseurl }}/images/luminance4.png)

Forget about the lamp here; what if we want to know *how much light falls on the desk*? (the light can come from the lamp or other light sources) This can be measured with **illuminance**, which is **luminous flux over per unit area**.  

The unit is lumen/m^2, or **lux**.

###4. Luminance  

![_config.yml]({{ site.baseurl }}/images/luminance5.png)

Why do we care how much light falls on a surface? Because that's how we see every object in the world! **Luminance** is the measure of *how much light can be detected by our eyes looking at a surface at a particular angle*, or roughly *how bright the surface appears to Elizabeth*. The formal definition of luminance is **luminous flux per unit solid angle per unit area**.

The unit is lumen/(m^2·sr), or cd/m^2.  

###Summary

Here's the final chart depicting all 4 quantities:  

![_config.yml]({{ site.baseurl }}/images/luminance6.png)

###F.A.Q.  

**So...we use illuminance to measure light hitting a surface, and luminance for light coming from a surface to our eyes? Why use 2 different quantities for them?**  
Illuminance is indepedent of the surface, so it doesn't matter whether a light is hitting a desk or a wall; the illuminance is the same.  
On the other hand, since different objects have different relfection or refraction rates, luminance off a desk is probably different from luminance off a wall.

**Does the everyday term "brightness" correspond to any of these quantities?**  
Brightness is sort of related to luminance, but it's not used as a quantitative measure. We mostly use the term "brightness" as a subjective, qualitative measure of how bright something appears, which is often affected by contrast. For example, your phone screen looks super bright in a dark room, while you can barely see it in direct sunlight.  

**Wait, if luminous flux measures the amount of power, why isn't the unit watt?**  
Not the amount of power, it's the amount of power of **visible light to our eyes**, which is only a small part of the total spectrum of electromagnetive waves. [Radiant flux](https://en.wikipedia.org/wiki/Radiant_flux), on the other hand, actually measures all radiant energy, so the unit is in Watt.

**Remind me which quantity I should keep in mind when purchasing light bulbs again?**  
Lumen. By the way, people used to compare lights by watts, but light manufacturers are able to make lights with higher lumen at the same watts.  

###References  
[1] [https://www.wikiwand.com/en/Luminous_flux](https://www.wikiwand.com/en/Luminous_flux).


