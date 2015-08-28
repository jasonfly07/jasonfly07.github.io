---
layout: post
title: Build Your Own Document Scanner
---

![_config.yml]({{ site.baseurl }}/images/document-scanner/evernote.png)

I've been using a lot of the document scanning function in Evernote lately. If you have never used it (or Apps with similar functions) before, what it does is look for the document in the picture and modify it so the document looks like it's captured by a scanner.  
Since conceptually it seems easy enough to implement, I decide to give it a try and build my own document scanner.  

Here's the whole implementation in Matlab. 

###0. The Problem  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf0.jpg)

Let's start with this picture of a postcard. The task is to *cut out* the card and *modify* it as if it's viewed from the top down.  
There are 2 parts to this problem:  
A. How do we **find the boundary** of the document from an image?  
B. Once we know where it is, how do we **normalize the perspective** viewing the document?  

###1. Segmenting Out the Document  
The first part of the problem can be thought of as a segmentation problem: the image consists of the document (foreground) and the surface it's placed on (background), and we have to **extract the foreground** out of the image.  

Segmentation is a tricky task in the realm of computer vision. Simple, naive methods often aren't robust enough, while more sophisticated approaches are usually slow and require a lot of parameter tuning. The following approach is by no means the most ideal way of performing segmentation in this context, but it should produce decent enough results.  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf1.png)

1. Convert the image to grayscale & blur it a bit for denoising.  
2. Compute the **gradient magnitude** of the grayscale image. This will essentially reveal all 
   the **edges** on the image.  
3. Apply a threhshold to the gradient magnitude and produce a gradient mask. This will prune out some weak edges, as well as give us a better idea of how these edges are connected.  
4. Find all the **connected components** and remove the small ones. This is done so we can (hopefully) completely remove any background edges.  
5. Find the **convex hull** of the remaining connected components. The region inside the hull is naturally the foreground.   

The result is a nice, clean mask!  

###2. Find the Corners  
We're not done with the first part yet. Since the document (from the current perspective) is a quadrilateral object, we want to find the 4 corners around it. An intuitive way is to use some corner detection algorithms to directly locate the corners, but this will not work if the document has rounded corners, such as credit cards.  

A more robust way to do this is to detect the 4 lines around the borders, and compute the intersections of these lines that fall within the image.  

![_config.yml]({{ site.baseurl }}/images/document-scanner/sf2.png)

1. Apply edge detection to the foreground mask. We should now have all the line segments around the borders.
2. Use Hough transform to identify all the line segments. Matlab provides both `hough()` and `houghlines()` that can be called back-to-back.  
3. Locate the intersections of these lines. By pruning out the intersection points that are outside image boundaries, we should ideally be left with the 4 corners of the document.  

Now that we have the 4 corners of the document, we're ready to move on to the second part.  

###3. Normalize the Perspective  

Since images are essentially 2-dimensional matrices, if we multiply every point on it with a 2D transformation matrix, we can move the image around, rotate the image, or skew its scale. This is best illustrated with the following diagram:  

![_config.yml]({{ site.baseurl }}/images/document-scanner/projective.png)

The rightmost one, **projective** trasform (or **homography**), is what we want to use, as it's the most general form of 2D linear transformation. Applying an arbitrary projective matrix to a normal image will usually turn it into a funny quadrilateral, like this:  
 
![_config.yml]({{ site.baseurl }}/images/document-scanner/cmu.png)

What we want to achieve is the opposite of that: namely, given an arbitrary quadrilateral (represented with 4 points), we want to project it back to its rectangular form (another set of 4 points). This task is called **homography estimation**. 
Since how it's computed is beyond the scope of this article, [here's a detailed document on the process.](http://cseweb.ucsd.edu/classes/wi07/cse252a/homography_estimation/homography_estimation.pdf)  






