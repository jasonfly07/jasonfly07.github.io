---
layout: post
title: Build Your Own Document Scanner
---

![_config.yml]({{ site.baseurl }}/images/document-scanner/evernote.png)

I've been using a lot of the document scanning function in Evernote lately. If you have never used it (or Apps with similar functions) before, what it does is look for the document in the picture and modify it so the document looks like it's captured by a scanner. 
Since conceptually it seems easy enough to implement, I decide to give it a try and build my own document scanner in Matlab.  
  
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

###2. Finding the Corners  
We're not done with the first part yet. Since the document (from the current perspective) is a quadrilateral object, ideally we should find its 4 corners in preparation for the geometric transformation in the second part. An intuitive way is to use some corner detection algorithms to directly locate the 4 corners, but this will not work if the document has rounded corners, such as credit cards.  
A better way to do this is to detect the 4 lines around the borders, and compute the intersections of these lines that fall within the image.  

6. Apply edge detection to the foreground mask. We should now have all the line segments around the borders.
7. Use Hough transform to identify all the line segments. Matlab provides both `hough()` and `houghlines()` that can be called back-to-back.  
8. Locate the intersections of these lines. By pruning out the intersection points that are outside image boundaries, we should ideally be left with the 4 corners of the document.  

