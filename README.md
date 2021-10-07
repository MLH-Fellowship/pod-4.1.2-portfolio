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

If you want to test it locally or add some new features, run the below commands. Make sure to have Ruby and Bundler installed.

```
bundle install --path vendor/bundle
bundle exec jekyll serve
```

## Setting up environment variables
- The project uses GitHub Personal Access Token to fetch repository details from the GitHub API
- You can generate an access token by following the steps in the given link:
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- Once the token is generated, add a new file with the name `.env` in the root of the project
- Add the following line to the above created file

```
GITHUB_ACCESS_TOKEN=your-generated-token
```
- Or you can set the environment variables via your terminal using the command

```
export GITHUB_ACCESS_TOKEN=your-generated-token
```