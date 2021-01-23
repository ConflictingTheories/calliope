# Current features

#### Plugins & Extensible Short Codes

You can also use custom Shortcode and perform your own expansion based on the short codes. Expand it with plugins and tap into all the fun.

Some areas which are coming soon for plugins:

- IPFS Support for Streaming & Hosting
- Embedded Widgets & Galleries
- Crypto

Ex. Pass Through Params and Make Custom Plugin Shortcodes

[[ CustomShortCodes customParam1="Custom Params" ]]

Ex. IPFS-Hosted Video Streaming

[[ ipfsStream ipfsHash="QmQjDRKG8pZaeBnQi9zLqupCgY9D2Mth6noF4GMdZR6CVQ" ]]


### Embedded Media

Media can be added through normal Markdown entry - and can reference local or remote files.

![Remote](https://pa1.narvii.com/6494/8026f94d8d5e388c6a971b70ac606123e53dea22_hq.gif)


### Source Code Highlighting

You can highlight source code if you add it

 ~~~js
console.log("It works!");
 ~~~

 ~~~jsx
const element = (props) => (<Section ...props />)
 ~~~


#### $\KaTeX$ Support
You can also add inline math using $\href{https://katex.org/}{\KaTeX}$.

$\sum_i^{n}x^{\ln{2^y}}$

---

# Features Coming Soon

The following are the features I am working on getting ready:

- ✔️ Mobile Support 📱
- ✔️ Resizable Images 🖼️
- ✔️ Support for Inline HTML 🌐
- ✔️ Better Configuration & Instructions :gear:
- ✔️ Admin Section & Application
- ✔️ Plugins Like galleries and Custom Embeds 🔌
- ✔️ Reloadable Live-Preview & Live Editing
- ✔️ 404 Page & Page Navigation for Non-Post Content
- ✔️ Better Admin Panel Controls / Features
- ✔️ Faster Loading & Internal Navigation
- ✔️ Zip Archive Export
- ✔️ DNS Name Configuration via Namecheap

More Complex Features (Will come later)
- :construction: Better Themes and More Robust Effects
- :construction: Publish / Edit Buttons
- :construction: Injectable Posts / Nested Content via Reference
- :construction: Deployment to Git / S3 / Others
- :construction: Permissions & Roles
