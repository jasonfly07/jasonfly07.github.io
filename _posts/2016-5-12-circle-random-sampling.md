---
layout: post
title: Random Sampling inside a Sphere
---

![_config.yml]({{ site.baseurl }}/images/luminance1.png)

How do we **randomly sample a point inside a sphere**? This is a problem I've encountered more than once in my work (and in an interview, too!). Occasionally I'd forget the formula or how to arrive at it, so I decide to write a blog post that details this interesting problem.

If you haven't seen this problem before, note that "randomly" here implies **uniform distribution**, which means every spot inside the sphere is equally likely to be picked. To solve this problem, you're usually given a random number generator (RNG) that uniformly outputs a number in [0, 1].

We'll start with the easier 2D version of this problem: **randomly sample a point inside a circle**. We'll assume the origin of the circle is at (0, 0), and the radius is R.

### 0. The Wrong Approach

The most *intuitive* thing to do is to generate a random point via polar coordinates: using the uniform RNG, generate a random r in [0, R] and a random θ in [0, 2π].

Visualizing the results, you'll notice that points will cluster around the center, which is not desired. This is because (TODO)

### 1. Rejection Sampling

The idea is simple: we randomly sample a point inside a square that encloses the circle, and discard any point that's outside the circle. 

This is called **rejection sampling**. It's fast and reliable in practice; the only problem is that it's undeterministic, which means you might get unlucky and hit 100 out-of-circle points in a row, even though the probability of that is astronomically small.

### 2. Random Point on a Small Triangle

(TODO)

### 3. Probability Integral Transform

