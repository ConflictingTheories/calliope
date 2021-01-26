
![Calliope](/_calliope/app/storage/media/calliope.png)

# Calliope Starter Template

This is the Starter Template and is the main Branch to get started using Calliope. It is focused on being the easiest tool to get started with when using calliope. If you want to read more about the project development and other features - check out the [Readme](/_calliope/readme.md) in the `_calliope` folder.

### Layout
All you site content can be managed from `_site` while the core application and server resides inside of `_calliope`. There is a starter script inside of the `_site` folder to help boostrap your static facing website. For docker or live hosting - you can access more functionality inside the main `_calliope/*` folder.

### Getting Started
To generate your static website the following should be sufficient (note you may need some development dependencies on your system such as `node` and `yarn`)

1. `mkdir website`
2. `git clone https://github.com/ConflictingTheories/calliope website`
3. `cd website\_site`


__Add Content:__
You content lives inside of the `_site/content` folders. Here you can put your pages and posts and media files you wish to compile into your static site. (For more control - look at using the admin panel for customization and more advanced editing - including Live Preview, Zip Generation, and more.)

__Configure Environment:__
Once you have some content and are ready to build you site, it is time to make sure you have configured the final settings correctly. Here is where you would configure your `.env` file and make your configurations for calliope to build your site. Once you have configured your `.env` (see the sample for help)

0. Source your Env file, and the finally build you site with the following,
1. `. build.ps1`

This should generate your new website inside of the `_site/output` folder and here you can host and deploy your site statically.

To Test you can statically serve it or deploy it to your favourite host. If you are using `http-server` you can do the following.

ex. `http-server _site/output` --> Then open browser to (http://localhost:8080)


## License

For License and more information on Calliope, please see the [LICENSE](./_calliope/LICENSE) file inside of the `_calliope` folder.