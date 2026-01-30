# Requirements

This document describes the actions voor a blogsite named rsdk.dev

## Tags

I want to use tags in my blogposts. This tags needs to function as filtering. I want to use the following tags; 

* Power Apps
* Power Automate
* Power Pages
* Copilot Studio
* Github Copilot
* Dataverse
* Playwright

## Blog 

### Preparation

Create a seperate folder where my blogs are being saved, /docs/blogs

Every blogpost needs to have its own folder. In that folder there is a index.md (the post) and a subfolder with name /assets (this is for all attachments regarding the blogpost).

Every blogpost index.md has the following items in the frontmatter;

* title
* description
* image
* status (concept or published) 
* date
* tags (commaseperated multiple values, see chapter Tags)

Create some dummy blogposts for me 

### Overview page

Create a new page with name "Blog", be sure to add it to the Navigation too.

Use the design file .github/design/blogs.html for the layout.

Always show 6 items, from the /blogs folder. 

Sort them by the date defined in the frontmatter.

Use the image defined in the frontmatter image to add to the item in the list.

Add load more function to load more items. 

When i click an item i will be navigated to the blog details page, see next chapter



### Details page

The details page is the index.md file in the blogs/{blog-name} folder. 

Use the design file .github/design/blogs-details.html for the layout of this page

Always use the items image (defined in the frontmatter) in the header of the blogposts detail page











## About me

Create a new page with name "About me", be sure to add it to the Navigation too.

Use the design file .github/design/about-me.html for the layout, but take a look at the /Blogs page, keep it in the same width and add a footer (like on the /Blogs page)








## Sessions

Create a seperate folder where my sessions are being saved, /docs/sessions

Every sessions has it's own .md file. 

Every session .md file has the following items in the frontmatter;

* title
* description
* status (concept or published) 
* date
* tags (commaseperated multiple values, see chapter Tags)

