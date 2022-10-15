# Calliope Site Generator

![Calliope](/app/storage/media/calliope.png)

## What is Calliope?
Calliope is a Static site generator and webserving platform. It provides two functions - static generation and live serving. The server is done to help make it quick for you to check changes locally without pushing anything out, and these sites are primarily focused at the moment on small blog and post-driven content. In the future Calliope will provide more plugins and themes (it already has two) and will hopefully begin to expand on the markdown support and provide its own form of shortcode plugins.

For now, everything is read out of the `/app/storage` directory and posts are read from markdown files found with `/app/storage/posts`. These are rendered according to the selected theme which can configured through the `.env` file. Note that a sample has been provided, but for windows you will need to slightly adjust the script to work on Powershell -- replace `export <variable_name>=<value>` with `$env:<variable_name>="<value>"`.

When you serve the static files, keep in mind that you will need to provide a web server (I suggest `npm install -g http-server` myself) or via a service like Netlify. If you use the server it will host it for you and make it available on your local machine.

**Note** - You will need to set the variables for your system and then make sure you have them active in your shell otherwise you may find some errors.

## Demonstration

You can see the `/output` folder which has been generated using Calliope for your reference, or alternatively you can check out https://www.calliope.site for a live demonstration using both Netlify and Github to hot it.

## Static vs Served

You can serve your content via NodeJS and this will read posts and content directly from the filesystem, or you can compile and bundle a static version of your site and host it using a service such as S3, Netlify, etc.

_To Serve:_

        cd app
        yarn 
        yarn deploy                       # Build API / Admin & Export
        yarn serve                        # Serve Static Website (port 8080)

_To Compile:_

        yarn
        yarn build                       

_To Run Live / Admin_

        yarn
        yarn build
        yarn start


_To Deploy:_ (Coming Soon - tools to help deploy -- For Now I recommend https://netlify.com and using https://github.com)

## Dependencies (to deploy)

The Following Technologies are required to run and deploy Calliope:

- Docker / Docker-Compose

## Deployment

Please see the following instructions for deploying locally.

First, set your configurations for your environment variables in the `.env` file (see `.env-sample`) and then proceed with the following depending on your OS:

### Windows

Please run the following:

        > . scripts/windows/install.ps1
        > . scripts/windows/migrate.ps1 # Please note Database must be ready
        > . scripts/windows/seed.ps1 # Ditto

### Linux / Mac

Please run the following:

        $ bash scripts/nix/install.sh
        $ bash scripts/nix/migrate.sh # Please note Database must be ready
        $ bash scripts/nix/seed.sh # Ditto

The above will initialize the Database - then you can perform manual updates and migrations from there. Additionally:

### Windows

Please run the following:

        > . scripts/windows/refresh.ps1 # Build New Frontend
        > . scripts/windows/build.ps1 # Build New Image
        > . scripts/windows/start.ps1 # Replace Image


### Linux / Mac

Please run the following:

        $ bash scripts/nix/refresh.sh # Build New Frontend
        $ bash scripts/nix/build.sh # Build New Image
        $ bash scripts/nix/start.sh # Replace Image


## Usage

Once the deployment has finished, it should if successful, now be running and accessible from your Browser:

        http://localhost/

**Note**: Also exposed via the default port: `8081`

### Best Practices

- You should work in a new branch for a new feature/task. All new changes must go through a pull request system. This ensures that code is thorough tested.

- Always fetch before doing any work. Then if new code is there, pull it in - it shouldn't conflict hopefully. If it does, carefully check the code and fix the conflicts.

- When you have changes you wish to make, you will make

- Make sure you are committing with good frequency so as to make the gits useful but also trackable.

## LICENSE

Please see [LICENSE](LICENSE) for more details.
