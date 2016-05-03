---
layout: post
title: Building a Solver for The Witness
---

![_config.yml]({{ site.baseurl }}/images/witness/witness1.jpg)

### 0. Too Lazy to Witness 

In case you haven't heard about it, [**The Witness** is an excellent video game.](http://kotaku.com/the-witness-the-kotaku-review-1754919626) You basically wander alone on a dreamy island and try to solve the puzzles littered around; it's like Professor Layton, but with all the NPCs turned into stones. On top of being a great puzzle/exploration hybrid, The Witness is able to teach its players without any word and exposition. I bought it on day one, and it's well worth it's full price.

All the puzzles in The Witness take the form of path-searching on a rectangular maze. By drawing a path from start to finish, you complete the puzzle by satisfying specific rules. These rules can roughly be divided into 2 groups: **symbolic** and **environmental**. The former comes with symbols on the maze to satisfy (e.g., a black hexagon has to be traversed by the path), while the latter hides its rules and clues in the environment (e.g., the path is indicated by the reflection of sunshine).

It's a joy to figure out the rules of both, but after a while I found myself looking forward to environmental puzzles more than the symbolic ones. A lot of these symbolic puzzles, ranging from simple path-finding to complex Hamiltonian-cycle problems, can be solved with brute-force approaches. As I sat there, cutting up small Tetris pieces to figure out a particular torturous Tetris-fitting puzzle, I wonder if this process can be automated. 

This was when I decided to build a solver to handle some of these puzzles for me. [**The preliminary version is complete, and you can try it here.**](http://jasonfly07.github.io/the-witness-solver-js/) The following sections will detail some of the design process, as well as some interesting observations I had when working on it. If you want to check out the (messy) codes, [click here.](https://github.com/jasonfly07/the-witness-solver-js)

### 1. Terminology 

![_config.yml]({{ site.baseurl }}/images/witness/witness2.jpg)

Since The Witness has no words, I have to come up names for various elements of the puzzle for my own convenience. Skip this part if you don't feel like reading encyclopedia. 

The body of the puzzle is a **node map**. The node map consists of all the paths and their intersections. The intersection is a **node**, while the short path between 2 nodes is a **side**. (BTW, the correct terms for them in graph theory are *vertices* and *edges*).

On top of a node map, there's also a **block map**. These are just for storing the special blocks between nodes and sides, and it's completely empty if we're just dealing with a simple maze. It's possible to merge node map & block map into a single matrix, but I decide to keep them separated for simplicity's sake.

**Heads** and **tails** are the start and end of a puzzle. Judging from the game, tails can only be placed on the border, while there's no restriction for heads.

**Essential nodes** and **essential sides** are represented by black hexagons, which need to be traversed exactly once with the solution path.

**Black/white blocks** have to be in different segments. A **segment** is formed by the solution path, and has to touch the border at least on one side.

(This part will be expanded when more types of elements are supported in the solver)

### 2. Algorithm & Strategy

Ok, now that we have all the names available, we can delve into 

We're not done with the first part yet. Since the document (from the current perspective) is a quadrilateral object, we want to find the 4 corners around it. An intuitive way is to use some corner detection algorithms to directly locate the corners, but this will not work if the document has rounded corners, such as credit cards.  

A more robust way to do this is to detect the 4 lines around the borders, and compute the intersections of these lines that fall within the image.  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf2.png)

1. Apply edge detection to the foreground mask. We should now have all the line segments around the borders.
2. Use Hough transform to identify all the line segments. Matlab provides both `hough()` and `houghlines()` that can be called back-to-back.  
3. Locate the intersections of these lines. By pruning out the points of intersection that are outside image boundaries, we should ideally be left with the 4 corners of the document.  

Now that we have the 4 corners of the document, we're ready to move on to the second part.  

### 3. Normalize the Perspective  

Since images are essentially 2-dimensional matrices, if we multiply every point on it with a 2D transformation matrix, we can shift the image around, rotate it, or skew its scale. This is best illustrated with the following diagram:  

![_config.yml]({{ site.baseurl }}/images/document-scanner/projective.png)

The rightmost one, **projective** trasform (or **homography**), is what we're looking for, as it's the most general form of 2D linear transformation. Applying an arbitrary homography matrix to a normal image will usually turn it into a funny quadrilateral, like this:  
 
![_config.yml]({{ site.baseurl }}/images/document-scanner/cmu.png)

What we want to achieve is the opposite of that: namely, given an arbitrary quadrilateral (represented with 4 points), we want to project it back to its rectangular form (another set of 4 points). This task is called **homography estimation**. 
Since how it's computed is beyond the scope of this article, [here's a detailed handout on the process.](http://cseweb.ucsd.edu/classes/wi07/cse252a/homography_estimation/homography_estimation.pdf)  

After homography transformation, here's the final result:  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf3.png)

Looking good! We can cut out the postcard to get a cleaner result, but I decide to keep the whole image to demonstrate how it's skewed after such transformation.  

### 4. More Test Results  

Let's test this pipeline with a few other examples. How about a post-it note?   

![_config.yml]({{ site.baseurl }}/images/document-scanner/lenny.png)

Or a membership card:  

![_config.yml]({{ site.baseurl }}/images/document-scanner/costco.png)

Another membership card:  

![_config.yml]({{ site.baseurl }}/images/document-scanner/giant.png)

Although these results look great, I imagine you can easily break the algorithm with slightly more complex images.  

And...that wraps up the whole pipeline! I'm sure those commercial apps use more sophisticated ways to handle corner cases, but the basic idea is the same.  

### 5. FAQ  

**Why segmenting out the card first? Can't you simply apply Hough transform to the grayscale image and locate all the lines?**  
That'll work. If we first detect all the lines (as shown below), compute all points of intersections, and fit a convex hull to them, we can still obtain the quadrilateral.  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf4.png)

However, there's one scenario that will potentially break this approach: if there's a diagonal line lying on the document, that line will likely intersect with one of the borders **outside the quadrilateral**.    

**Is there a way to detect the lines other than Hough transform?**  
I've also tried RANSAC + linear square fit, and the results are comparable. I eventually pick Hough transform simply because it's fewer lines in Matlab.   

**I ran your Matlab script with my own image; it doesn't work at all!**  
There're mainly 2 factors that will mess up the segmentation: the resolution of Hough transform and the threshold on gradient magnitude. Try tweaking those values, or resize your image to similar resolution as the postcard example.  

Besides that, there might be other bugs/design overlook, and you're more than welcome to test the pipeline yourself and improve its robustness.  

