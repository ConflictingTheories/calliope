# Migrating to ReactJS
~ 2020-04-15T02:35:06+00:00 ~

One of the projects I am working with was originally drafted in AngularJS, but I am going to be migrating it to ReactJS. It has come the time to make the migration to a new framework which going to be supported and promotes more maintainable code, and unfortunately AngularJS is EOL next year.

I see this as a chance to update the system, make it more modern as the landscape has changed quite a bit over the last few years, and iron out some inefficiencies from the first design (namely unnecessary complexity).

While it wont be extremely simple to rebuild the system due to the two-way binding in AngularJS and the one-way nature of ReactJS, but I am looking forward to performance benefits and the improved maintainability.

AngularJS was great at what it did, but it does result in a lot of file management, back-and-forth, and frankly obscure relationships sometimes. I built a system to manage the programmatic addition of modules, but it did little to reduce the amount of touch points AngularJS requires. While I do not use Angular much at the moment, it too had many touch points, though it managed the modules much better through the build system. This also provided noticeable performance benefits with the AOT compilation.

React has proven a joy to extend, but it does present its own challenges (especially when things you want to do aren’t done declaratively) and it can be a bit confusing when you shift between typescript, TSX, javascript, and JSX files when it comes to syntax and linting as well as flexibility. I originally wanted to start with TSX and Typescript exclusively, but the very rigidity it imposed reduced my ability to play with certain components which did not have their own Typescript props clearly defined and made easily available – rather than fight with trying to please the perfectionist in me, I chose to swap between TSX and JSX where necessary, but focus on Typescript over Javascript for non-react based classes.

Hopefully this migration proves to be simple – my only concern at this point will be some of the front-end library support which was designed for AngularJS and two-way data-binding.