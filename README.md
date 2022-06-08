# Course Material for Node.js (Udemy course w/Jonas Schmedtmann)

This repo contains starter files and the finished project files for all the projects contained in the course (complete repo size is **288MB**).

Use starter code to start each section, and **final code to compare it with your own code whenever something doesn't work**!

Plus, I made all the [course slides available for download](theory-lectures.pdf), to make it easier to follow along the theory videos.

Course video on [Udemy](https://specs.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080918?course_portion_id=200158&learning_path_id=3007614#content).

# Notes

* Node.js is a JS runtime; it's like an environment in which a program written in JS can be executed, but outside of any browser whatsoever
    * Single threaded, **Don't block!**
        * Don't use sync versions of functions
        * Don't perform complex calculations (ex. loops inside loops)
        * Be careful with JSON in large objects
        * Don't use too complex regular expressions (ex. nested qualifiers)
    * Based on event-friven, non-blocking I/O model
    * Not good for heavy server-side processing (better to use PHP, Python, or Ruby on Rails for this)
* Can use in terminal by running "node" enter
    * Opens a Node REPL in terminal
    * Tabx2 shows all the global methods you can use with node
    * _ references previous result
    * MethodName.tabx2 shows all methods for that (ex. String.tabx2)
    * "node fileName" will run that file in terminal (ex. node Index.js)
* Synchronous: each statement is processed one after another line-by-line (each line of code waits for the result of the previous line)
    * Considered blocking code because each line blocks the execution of the rest of the code
* Asynchronous: heavy-work in worked on in the background and then, once that work is done, a callback function that is registered before is called to handle the result
    * The rest of the code can still be executing without being blocked by the heavy task running in the background
    * fs.readFileSync vs. fs.readFile# node.js