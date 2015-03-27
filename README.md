## Website Performance Optimization portfolio project

My challenge, which I accepted, was to optimize this online portfolio for speed! I've done so to the best of my ability, largely by delaying the loading of render-blocking js and css, and streamlining the code to do calculations as few times as possible. Check out perfmatters.js and views/main.js, both of which have comments in them to explain my changes.

### Getting started

To make this site easier to look at, I've deployed it to an AWS instance which you can reach by going to [pixiespace.com/portfolio/](http://pixiespace.com/portfolio/). From there, you can click all the links and look at all the pages. This repository contains the 'beautified' code for readability. To look at the minified code, check out my other repo, [frontend-nanodegree-mobile-portfolio](https://github.com/shevyf/frontend-nanodegree-mobile-portfolio)

####Part 1: Optimize PageSpeed Insights score for index.html

This page was slowed down by having unnecessary js and css load which held up rendering the page. The css required for above-the-fold rendering was moved into style tags at the beginning, and the rest was added to the page after it rendered by a section of javascript added at the end of the body section. The print-specific css was marked as media="print" to prevent the page from waiting to load it before constructing the render tree.

The google analytics script and the perfmatters don't affect the page at all, so they were marked as async.

####Part 2: Optimize Frames per Second in pizza.html

This was pretty challenging and I'm still uncertain whether I've reached the target.

Most of the issues were around calculations which were repeated over and over in for-loops which actually only needed to be done once. For example, instead of looking up getElementsById('.movers') in every update loop, I did that once and saved the result to an array which could be looped over instead. Again, check the code in the dev repo for more information.

I also resized the pizza image for the background rather than have it be resized in the browser. This does mean an additional request, but I hoped it would cut down on the paint times on each frame. Alas, that doesn't seem to have worked, as the whole screen is being repainted for each frame anyway. I attempted to use the css transform style, but this seemed to save me no rendering or painting time and instead increased my script time massively. 

Overall, the average frame rate on my home PC is under 60fps but on slower machines like my ancient work laptop, it's less consistent. Let me know what you think.

####Part 3: Using NodeJS and Grunt to automate tasks

I have set up Grunt to run in the folder which contains my portfolio and portfoliodev folders which I have been working from. In order to let you look how I've set that up, I've copied Gruntfile.js and packages.json into my repo, however running grunt from *within* the repo will not work correctly at this time.

Grunt has automated for me:

- linting my JS and CSS
- minifying JS, CSS and HTML
- Compressing images
- Copying production files to my production folder

I would still like to achieve some degree of git automation through grunt, for example pulling or pushing both repos at the same time.
