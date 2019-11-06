---
date: 2019-11-06T23:25:01.872Z
title: React With Tests in Under 5 Minutes
description: How I get up and devving as quickly as possible.
---
Here's how I get a web development (in this case React) project up and running to dev on.

Let's start by creating a new folder for the project. I generally work from a `projects` folder in my home directory. Let's call our project `new-project`. Newing up a home for it starts by opening up the terminal and navigating to the location of your choosing, and looks something like this:

```
mkdir new-project
cd new-project
```

Now, let's initialize `git` and our folder as a new NPM package (without over-exercising our enter key):

```
git init
npm init -y
```

Great. Now, let's go ahead and add a `.gitignore` file so we don't commit the mass of the universe to our repo:

```
touch .gitignore
```

With the `.gitignore` created, open it up and populate it with the folders you probably dont' want to commit. The IDE I use is made by JetBrains, so there's a little extra there for me. When you're done modifying the `.gitignore` file, its contents should look something like this:

```
.idea/
node_modules/
```

Good show. Now, let's build in the basics for getting a bare-bones React project up and running super quick. Time to install some dependencies. Back to the terminal:

```
npm i -D parcel-bundler jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer @testing-library/react @testing-library/dom
```
