# Calliope Site Generator

![Calliope](content/media/calliope.png)

## What is Calliope?
Calliope is a Static site generator and webserving platform. It provides two functions - static generation and live serving. The server is done to help make it quick for you to check changes locally without pushing anything out, and these sites are primarily focused at the moment on small blog and post-driven content. In the future Calliope will provide more plugins and themes (it already has two) and will hopefully begin to expand on the markdown support and provide its own form of shortcode plugins.

For now, everything is read out of the `/content` directory and posts are read from markdown files found with `/content/posts`. These are rendered according to the selected theme which can configured through the `.env` file. Note that a sample has been provided, but for windows you will need to slightly adjust the script to work on Powershell -- replace `export <variable_name>=<value>` with `$env:<variable_name>="<value>"`.

When you serve the static files, keep in mind that you will need to provide a web server (I suggest `npm install -g http-server` myself) or via a service like Netlify. If you use the server it will host it for you and make it available on your local machine.

**Note** - You will need to set the variables for your system and then make sure you have them active in your shell otherwise you may find some errors.

## Static vs Served

You can serve your content via NodeJS and this will read posts and content directly from the filesystem, or you can compile and bundle a static version of your site and host it using a service such as S3, Netlify, etc.

_To Serve:_

        yarn
        yarn build                      # Build API / Admin
        yarn run                        # Run Server

_To Compile:_

        yarn
        yarn build-static              # Compile Static Assets & Manifests
        cd build && http-server        # Serve Static files

_To Deploy:_ (Coming Soon - tools to help deploy -- For Now I recommend https://netlify.com and using https://github.com)

## LICENSE

Apache-2.0