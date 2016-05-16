---
layout: post
title: Random Sampling inside a Sphere
---

![_config.yml]({{ site.baseurl }}/images/sphere-random-point/random-sphere.png)

How do we **randomly sample a point inside a sphere**? This is a problem I've encountered more than once in my work (and in an interview, too!). Occasionally I'd forget the formula or how to arrive at it, so I decide to write a blog post that details this interesting problem.

If you haven't seen this problem before, note that "randomly" here implies **uniform distribution**, which means every spot inside the sphere is equally likely to be picked. To solve this problem, you're usually given a random number generator (RNG) that uniformly outputs a number in $$[0, 1]$$.

We'll start with the easier 2D version of this problem: **randomly sample a point inside a circle**. We'll assume the origin of the circle is at $$(0, 0)$$, and the radius is $$R$$.

### 0. The Wrong Approach 

![_config.yml]({{ site.baseurl }}/images/sphere-random-point/random-comparison.png)

The most *intuitive* thing to do is to generate a random point via polar coordinates: using the uniform RNG, generate a random $$r$$ in $$[0, R]$$ and a random $$θ$$ in $$[0, 2π]$$.

Visualizing the results, you'll notice that points will cluster around the center, which is not desired. The reason this happens: imagine there are 2 rings on this circle, $$r_1$$ and $$r_2$$. $$r_1$$ is formed by $$r \in [0, 0.1R]$$, and $$r_2$$ has $$r \in [0.9R, R]$$. Even though the area of $$r_2$$ is clearly larger than $$r_1$$, the two rings are equally likely to be picked. Therefore, the density of points in $$r_2$$ will be lower than $$r_1$$.

There are a couple of methods to properly sample uniform points on a circle, and they are listed below. 

### 1. Rejection Sampling

The first approach is simple: we randomly sample a point inside a square that encloses the circle (random $$x$$ and $$y$$ in $$[-R, R]$$), and discard any point outside the circle. 

This is called **rejection sampling**. It's fast and reliable in practice; the only problem is that it's undeterministic, which means you might get unlucky and hit 100 out-of-circle points in a row, even though the probability of that is astronomically small.

### 2. Random Point inside a Small Triangle

The second approach switches back to polar coordinates: once we pick a random $$θ$$, we can treat the selected slice as an infinitesimal triangle $$OAB$$, with $$O$$ as the origin and $$A$$ & $$B$$ on the border. The three sides of this triangle are: $$R$$, $$R$$, and $$Rdθ$$. Now we can convert this problem into [random point picking on a triangle](http://mathworld.wolfram.com/TrianglePointPicking.html). 

By generating a random $$r1$$ on $$\overline{OA}$$ and a random $$r2$$ on $$\overline{OB}$$ (both in $$[0, R]$$), we can form a quadrilateral $$OACB$$ and use $$C$$ as our random point. If $$C$$ is outside the triangle, we fold it back. 

In fact, since $$\overline{AB}$$ is next to 0, all four points of the quadrilateral are virtually on the same line, and we simply sum up $$r1$$ and $$r2$$ to generate the random point (and fold it back if needed).

### 3. Inverse CDF

The third approach again uses polar coordinates, but this time we'll take a closer look at the area of the circle to develop a more general approach.

Since an infinitesimal area of the circle is 

$$dA = 2πrdr$$

we can tell that the area of a small piece of the circle is proportional to the radius. Because we want our "sampling density" to match this distribution, you can imagine that the probability density function (PDF) would be in the form of:

$$f(r) = Cr$$

The cumulative distribution function (CDF) is thus

$$F(r) = \frac{1}{2}C{r^2} + k$$

We can compute $$C$$ & $$k$$ with the definition of CDF:

$$F(r) = (\frac{r}{R})^2$$

It's great that we have the PDF and CDF of our desired distribution, but how do we generate random variables with this particular distribution, when all we have is a uniform RNG?

Well, it turns out that in statistics, there's a handy method to achieve this: **probabilty integral transform**. It basically means that, an arbitrary continuous random variable can be transformed into a uniform random variable, and vice versa.

So, if we have $$U$$ as a uniform random variable, and $$X$$ being an arbitrary random variable (it could be Gaussian, exponential, anything), the following will hold: 

$$F(X) \sim U$$

$$F^{-1}(U) \sim X$$

The first equation means that, if we plug a random variable into its own CDF, the output would be a uniform distribution. The second equation means that, if we plug $$U$$ into the inverse of the CDF of $$X$$, the output would be $$X$$. In my opinion, these concepts are not the most intuitive ideas to grasp; [this particular thread offers some great explanation.](https://www.quora.com/What-is-an-intuitive-explanation-of-the-Probability-Integral-Transform-aka-Universality-of-the-Uniform)

Since our goal here is to obtain $$X$$ with $$U$$, we'll do exactly what the second equation suggests, and find the inverse CDF. Using $$u$$ as a pseudo variable:

$$F(r) = (\frac{r}{R})^2 = u$$

$$r = F^{-1}(u) = R \sqrt{u}$$

That equation above is exactly how we're going to generate a random $$r$$: we just find the square root of our uniform random number, multiply it by $$R$$, and that would be the random $$r$$ that achieves uniform distribution across the whole circle.

### 4. Random Point on a Sphere

We can now apply the approach above to the 3D case (or any N-dim case). Again, the sphere we're looking at has its origin at $$(0, 0, 0)$$ with radius $$R$$.

Before moving on to the problem of sampling points **inside** a sphere, let's first look at sampling points **on** the sphere, since they are closely-related.

Using spherical coordinates, the infinitesimal surface area of the sphere is:

$$dA = {R^2}\sin{φ}dφdθ$$

Here's an image in case you don't remeber where this equation comes from.

![_config.yml]({{ site.baseurl }}/images/sphere-random-point/random-spherical.png)

You can tell by the equation that it's similar to the 2D case, only this time it's proportional to $$\sin{φ}$$ instead of $$r$$. (Note that $$R^2$$ here is a constant, since we're dealing with surface area)

$$f(φ) = C\sin{φ}$$

$$F(φ) = -C\cos{φ} + k$$

Using the definition of CDF, we can find out that $$C = \frac{1}{2}$$ and $$k = \frac{1}{2}$$:

$$F(φ) = -\frac{1}{2}\cos{φ} + \frac{1}{2}$$

Now we can solve for the inverse CDF:

$$φ = \cos^{ - 1}{(1-2u)}$$

The result is plotted at the top of this article.

### 4. Random Point inside a Sphere

Finally, let's look at the original problem! Sampling random points inside the sphere is simply an extension of the surface version: once we pick a random point on the surface, we can use it as a direction, and couple it with a random radius $$r$$.

Similar to the 2D case, the infinitesimal volume of the sphere would depend on $$r$$: (the fact that it's $$r^2$$ instead of $$r$$ also makes sense, since it's 3D now)

$$dV = {r^2}\sin{φ}dφdθdr$$

We can deduct the CDF with similar steps:

$$F(r) = (\frac{r}{R})^3$$

$$r = F^{-1}(u) = R \sqrt[3]{u}$$

### 5. FAQ

**How about we just apply rejection sampling to the 3D version?**  
You can. However, note that the success rate in each run is lower than the 2D version:

$$P(inside\ circle \mid inside\ box) = \frac{πR^2}{4R^2} \approx 0.785$$

$$P(inside\ sphere \mid inside\ cube) = \frac{\frac{4}{3}πR^3}{8R^3} \approx 0.523$$

The volume ratio of a hypersphere (N-dim sphere) to a hypercube (N-dim cube) is one of the characteristics of [curse of dimensionality](https://www.wikiwand.com/en/N-sphere).

**I still don't really understand probability integral transform. Why would plugging a random variable into its own CDF result in a uniform distribtion? What's the intuition behind it?**  

Here's my take on it: say the class takes an exam, and distribution of the scores $$X$$ is the exponential distribution with $$λ = 0.05$$ (don't ask):

![_config.yml]({{ site.baseurl }}/images/sphere-random-point/random-exp-1.png)

Recall that on a CDF, $$F(x)$$ simply means how much percentage is **below** $$x$$. For example, $$F(30) = 0.77$$ means that 77% of the students have scores lower than 30 (hey, this was actually the case in one of my undergrad course!). For simplicity's sake, let's divide up the CDF into 5 intervals, each with 20% on the y-axis. You can see it in the figure above.  

To achieve a uniform distributed output, we want equal amount of students in each range of scores. For example, any student with score in $$[4.46, 10.21]$$ is inside the 20% - 40% segment (orange), while scores in $$[18.32, 32.18]$$ is inside the 60% - 80% segment (green).

![_config.yml]({{ site.baseurl }}/images/sphere-random-point/random-exp-2.png)

Note that the green segment has a wider range of score than the orange segment. Does that mean the score of a random student is more likely to land in the green segment instead of the orange segment? No! Becasue according the distribution of the scores on the PDF, there're far more students having scores in $$[4.46, 10.21]$$ than $$[18.32, 32.18]$$! So the probabilty and the range sort of cancel out each other, and you would get a nice uniform distribution in the end.
