# Portfolio Template

This is a Jekyll website template designed for Prep Fellows.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fbe1b783-4a3d-4f50-be1f-35af11484329/deploy-status)](https://app.netlify.com/sites/prep-pod-4-1-2/deploys)


## Make your own!

1. Use the Template button.
2. Update `_config.yml` to contain your information.
    1. Change `url` to the URL you'll be hosting it at
    2. Make sure it has the /
3. Use something like Netlify or GitHub Pages to deploy (note, this only works on username.github.io, not username.github.io/repo-name)

## Add your portfolio

Head to `_data` and fill out either `projects.yml`, `experience.yml` and `education.yml`.

Project example.
```yaml
- title: Online Shopping Application
  event: MLH Prep - Batch 4.5
  date: Fall 2021
```

Experience example.
```yaml
- role: MLH Prep Fellow
  company: MLH Fellowship
  dates: Summer 2021
  logo: fellowship.svg
```

Education example.
```yaml
- course: Prep Fellow
  institute: MLH Fellowship
  dates: Fall 2021
  logo: fellowship.svg
```
## Add project posts

1. Make a new `.md` file inside of `projects`.
2. Add the header to your markdown file (see below) and change the title to the name of your blog post.
3. Write your project page! Can be a README from GitHub or your Devpost page.
4. Add the `page-name` field to your `projects.yml` (see below).

Top of post markdown file post.
```
---
title: Project
layout: page
---
```

`projects.yml` with the `page-name` field.

```yaml
- title: Online Shopping Application
  event: MLH Prep - Batch 4.5
  date: Summer 2021
  page-name: project
```

## Development

### Build on Docker

```
sudo docker-compose up
```

### MacOs

Ruby is often already installed in Mac.
You can check the version and if it's installed with:
```
 ruby-v
```
You can check bundler with:
```
bundler-v
```
If you don't have it, you can install with:
```
 brew install ruby
 gem install bundler
```
To run:
```
 bundle config set --local path 'vendor/bundle'
 bundle exec jekyll serve
```

### Arch Linux ([Refer to arch wiki](https://wiki.archlinux.org/title/ruby#Setup))

Arch usually comes pre-installed with ruby.

Check if installed by running `ruby -v`

If not, install it by running `sudo pacman -S ruby`

By default in Arch Linux, when running `gem`, gems are installed per-user (into `~/.local/share/gem/ruby/`), instead of system-wide (into `/usr/lib/ruby/gems/`).

So to access your gems, add the following two lines to one of these files: (`.profile`, `zshenv`, `bash_profile`)

```
export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"
export PATH="$PATH:$GEM_HOME/bin"
```

Then restart or run `source ~/.profile`

Install bundler by running `gem install bundler`

Change directory to project home and setup environment by running `bundle install --path vendor/bundle`

Finally start your local dev server `bundle exec jekyll serve --livereload`