 # Jekyll Project Structure 
 
## If you are just getting started with ruby and this project it is a great place to hangout
___
### We would be taking reference of [this](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio) repository

## 1. [_data]((https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/_data))
    This directory con contain .yml file as here or .ymal, .json, .csv or .tsv file. Jekyll by defualt supports the loading data from this file located in directory.

    Consider the code from [fellow.yml] file :
        - name: Shubham Aggarwal
          github: shubham0324
        
    and peice of code from discription.html file
        <p class="title"> {{ site.data.fellows.name }}</p> 

    you will see following code in dev console for above line 
        <p class="title">Shubham Aggarwal</p>

    In short, we can access any content inside the .yml file using site.data.filename. {{% something %}} -this is called liquid template. Generally in Liquid you output content using two curly braces e.g. {{ variable }} and perform logic statements by surrounding them in a curly brace percentage sign e.g. {% if statement %}. To learn more about Liquid, check out the official Liquid Documentation.

    Now consider a situation where we gonna add details of new mate joining us. Instead of modifying HTML, the loop will take care of the modification and automatically update the side.
Thinking how we access data throw .yml files checkout [this discussion on stackoverflow](https://stackoverflow.com/questions/21453960/accessing-data-in-jekyll-loop-in-loop).

## 2. [_includes](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/_includes)
    You can incorporate the content of the file store in this directory with the help of {% include filename.extension %} tag into another file.
    
     Consider the code from index.html file :
        {% include navbar.html %}

        {% include profile.html %}

        What the above code gonna do is it will copy all the content of navbar.html which is in _include directory and inject it in place of {% include navbar.html %} this way you write fewer lines of code and your codebase is much cleaner.

        include_relative

            Consider if you two file a.html and b.html in the same directory you can include the content of a.html in b.html using {% include_realtive a.html %}.

There is a lot more you can learn about includes. If you want to head [here](https://daverupert.com/2017/07/jekyll-includes-are-cool/).

I think probably you have a question can we change the name of directories for example instead of _include or _data something else? My friend congratulations you are going in the right direction  check out [this discussion on stackoverflow](https://stackoverflow.com/questions/39734133/jekyll-include-a-file-from-directory-outside-of-includes/39735088)


## 3. [_layouts](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/_layouts)
    Before moving ahead I have a question for you when you were developing your first multipage website in plain .html and .css weren't you just copying and pasting the code of the navbar and footer in each .html file. No? Don't lie dude. So basically that is what files under this directory are meant to serve so you don't have to repeat yourself. Have a question why not just use the {% include %} tag? I had a similar feeling but by doing this you are still including the same line and you are fundamentally violating the principle of DO NOT REPEAT YOURSELF. Here we have two files in defualt.html we had included the navbar and footer file and the whole directory will act as a template and everything that will be injected in it will be done by replacing {% content %}.

    Wondering how to wrap a specific template around your .html file. Consider following piece of code from about.html
        ---
        permalink: /about.html
        layout: default
        ---
    The above syntax is called Front Matter. Any file that contains a YAML front matter block will be processed by Jekyll as a special file. the layout variable specifies which template to use while building the about.html file. permalink specify the URL to view the website. 

Learn more about the front matter [here](http://simpleprimate.com/blog/front-matter)

## 4. [_sass](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/_sass)
    It contains all the stylesheets required in a project. We had to create a special file all.scss to link all other .scss into it and link all.scss to the template in short all.scss contains all of the style sheets that we will use. For example, We imported description.scss at the top. These define the styles that we used for the site. 

## 5. _site
    It is not a good idea to include in the project structure when publishing your code on services like GitHub because it's just a static folder the Jekyll created where there is a final version of your whole web pages (i.e. every file gets included and you get a multiline line final .html file) lies. If you want to host your project online like on GitHub pages all you need is to put the _site folder on the server. It is good to add it in .gitignore just because that is what hero's do right? When you run an application on a server Jekyll automatically recreate the folder for you.
Check [this stackoverflow discusion](_site : https://stackoverflow.com/questions/31871433/why-put-the-site-directory-of-a-jekyll-site-in-gitignore) to know more.

## 6. [_assets](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/assets) 
    It contains all the stylesheets, javascript or other static files like images that you would require in your project.

## 7. [projects](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/tree/main/projects)
    if you put a file like project.html inside it Jekyll will allow you to view it on localhost:port/project/project.html. Markdown files are also supported with some conditions. This tells us about every important concept of code refactoring and what default URL Jekyll will provide to view a file on the web.

## 8. [_config.yml](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/blob/main/_config.yml)
    It is a configuration file that I like to call the command centre and your Jekyll will provide you with a project as per the command or technically speaking configurations specified.


## 9. [index.html/.md](https://github.com/MLH-Fellowship/pod-4.1.2-portfolio/blob/main/index.html)
    Jekyll looks for this file and loads it on by default on '/' in the browser. It is the page you will get to see when you will land on the website.


We scratch over the surface go to give the reader a piece of basic information and help him get started with development. Still filling thirsty for more check out the following links to quench your thirst for knowledge :
    - [Official Documentation](https://jekyllrb.com/docs/)
    - [More about permalinks](https://www.digitalocean.com/community/tutorials/how-to-control-urls-and-links-in-jekyll)
    - [Medium easy explanation](https://r3id.medium.com/jekyll-file-structure-f28c496f8dc0#:~:text=%20Jekyll%20File%20Structure%20%201%20_config.yml.%20Specify,with%20a...%205%20Other%20Files%2FFolders.%20%20More%20)