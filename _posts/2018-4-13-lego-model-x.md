---
layout: post
title: Lego Model X
---

![_config.yml]({{ site.baseurl }}/images/witness/witness1.jpg)

### 0. Inspiration

In case you haven't heard about it, [The Witness is an excellent video game.](http://kotaku.com/the-witness-the-kotaku-review-1754919626) You basically wander alone on a dreamy island and try to solve the puzzles littered around; it's like Professor Layton, but with all the NPCs turned into stones. On top of being a great puzzle/exploration hybrid, The Witness is able to teach its players without any word and exposition. I bought it on day one, and it's well worth it's full price.

All the puzzles in The Witness take the form of path-searching on a rectangular maze. By drawing a path from start to finish, you complete the puzzle by satisfying specific rules. These rules can roughly be divided into 2 groups: **symbolic** and **environmental**. The former comes with symbols on the maze to satisfy (e.g., a black hexagon has to be traversed by the path), while the latter hides its rules and clues in the environment (e.g., the path is indicated by the reflection of sunshine).

It's a joy to figure out the rules of both, but after a while I found myself looking forward to environmental puzzles more than the symbolic ones. A lot of these symbolic puzzles, ranging from simple path-finding to complex segmentation problems, can be solved with brute-force approaches. As I sat there cutting up small Tetris pieces to figure out a particular torturous Tetris-fitting puzzle, I wonder if this process can be automated. 

This was when I decided to build a solver to handle some of these puzzles for me. [**The preliminary version is complete, and you can try it here.**](http://jasonfly07.github.io/the-witness-solver-js/)

The following sections will detail some of the design process, as well as some interesting observations I had when working on it. If you want to check out the (messy) codes, [click here.](https://github.com/jasonfly07/the-witness-solver-js)

*Finally, this project is still work in progress. As more types of puzzle elements are supported, this article will be expanded accordingly.*
