---
date: 2020-01-16T23:15:01.872Z
title: React With Tests in Under 5 Minutes
description: How I get up and devving as quickly as possible.
---
## Working assumptions
- You can get around a terminal environment (`cd`, `mkdir`, etc).
- You have `git`, `node`, and `npm` installed.
- You can edit text files.

## TL;DR
- Make a folder.
- Initialize `git` and `npm`.
- Add and populate `.gitignore`.
- Install `parcel-bundler`, `babel`, `jest`, `react-testing-library`, and `react`.
- Create and populate `babel.config.js`.
- Update `packge.json` scripts.
- Stub out your application entry point.
- Create a HTML file for Parcel to bind to.
- Sanity check your setup.
- Stub out your React application.
- Profit.

[Reference Repository](https://github.com/cbuchert/react-from-scratch-in-5-minutes)

// TODO: Write a better hook in the intro.

Here's how I get a React project up to dev on, on the quick.

## Newing up the project

Let's start by creating a new folder for the project. Let's call our project `new-project`. Newing up a home for our new project starts by opening up the terminal and navigating to the location wherein you'd like to store your project. You can create your the husk of your new project with the following commands:

```
mkdir new-project
cd new-project
```

At this point, running `pwd` should print something like this: `/Users/[username]/projects/new-project`. Note: I generally work from a `projects` folder in my home directory (`~/projects/`), 

Now, let's initialize `git` and our folder as a new NPM package (without over-exercising our enter key):

```
git init
npm init -y
```

Great. Now, let's go ahead and add a `.gitignore` file in the root of our `new-project` folder so we don't commit the mass of the universe to our repo:

```
touch .gitignore
```

With the `.gitignore` created, open it up and populate it with the folders you probably dont' want to commit. Some IDEs throw their own project configuration directories in there as well which you'll want to ignore from source control (JetBrains adds a folder called `.idea`, for example). When you're done modifying the `.gitignore` file, its contents should look something like this:

**`.gitignore`**
```
node_modules/
```

## Installing and configuring dependencies

Good show. Now, let's build in the basics for getting a bare-bones React project up and running super quick. Time to install some dependencies. Specifically:

1. `parcel-bundler` - lets us run our React code without heaps of configuration.
1. `babel` - our transpiler.
1. `jest` - our testing library.
1. `react-testing-library` - our JSX renderer for use in unit testing.
1. `react` - React and ReactDOM because we're working in React. Surprise.

Back to the terminal. From the `new-project` folder:

```
npm i -D parcel-bundler babel-jest @babel/preset-env @babel/preset-react jest react-test-renderer @testing-library/react @testing-library/dom
npm i react react-dom
```

With our dependencies installed, we need to do a tiny bit of configuration for `babel`. To do this, we need to first create a file called `babel.config.js` in the root of our `new-project` folder. From the command line, this can be accomplished by running:

```
touch babel.config.js
```

At this point, we're following along with [Jest's documentation](https://jestjs.io/docs/en/tutorial-react) for testing React code. Specifically, we need to populate `babel.config.js` with the following Node-flavored JavaScript:

**`babel.config.js`**
```
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ],
};
```

Babel is configured. Now we need to configure Jest. Edit `package.json` in the root of your `new-project` folder and update your `scripts` section to look like this:

```
"scripts": {
  "test": "jest"
},
```

## Setting up `parcel-bundler`

We're going to create a new folder to host our source code to live in and create a stub for our React app:

```
mkdir src
cd src
touch index.jsx
```

For the moment, let's add the following console log to `index.jsx` to help us know everything is wired up correctly when we fire it up the first time:

```
console.log("sanity check.");
```

Now, let's navigate back to the root of the `new-project folder` and create a folder and an HTML file inside it for Parcel to serve from:

```
cd ..
mkdir public
cd public
touch index.html
```

Stub out `index.html` using your favorite new document boilerplate. Personally, I like the one that `Emmett` uses by default (type `!` followed by the `tab` key). Modify any little bits that feel important to you, then add a `div` with a class of `app` and a `script` tag that references the `index.jsx` file we made earlier. When you're done, `index.html` should look something like this:

**`public/index.html`**
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="app"></div>
	<script src="../src/index.jsx"></script>
</body>
</html>
```

Now, if you have any scruples and aren't familiar with Parcel this should look like the world's biggest no-no. Suspend your disbelief for a moment. That twitch you have that's saying "You shouldn't be referencing an outside resource from within the public folder", while right, is misfiring right now. If you have the background for this to bother you, I'd highly recommend a deep dive into [Parcel's docs](https://parceljs.org/getting_started.html). For those of you willing to suspend your disbelief, the TL;DR is this: Parcel will not be serving from our `public` folder. It creates its own folder from which it serves. All we're doing here is providing a reference to our app's entry point (`src/index.jsx`). Take a deep breath. We're going to be OK.

Let's go ahead and fire it up! From the terminal, after making sure we're in the root of our project directory (`new-project`), we can run the following:

```
npx parcel public/index.html
```

Parcel will do its magic and serve you up a page in a pre-configured dev environment which it will inform you that you can access at [`http://localhost:1234`](http://localhost:1234).

**Note:** If you're having trouble with this, the most common reason that I've encountered is that port 1234 is currently in use by another process. If worst comes to worst and you don't know how to use `netstat` or find errant processes, try restarting your computer.

Opening your browser, going to [`http://localhost:1234`](http://localhost:1234), and opening the JavaScript console will display the sanity check we logged out in `src/index.jsx`:

```
sanity check.                     index.jsx:1
```

This is good news! Everything is wired up. If things aren't working out for you to this point, you might be a Windows developer or you need to check the plumbing.

Let's go ahead and stop our Parcel dev server by pressing `ctrl+c` on the keyboard from within the terminal. This should stop the process.

Running Parcel has created two new folders for us which we don't want to commit to source control, so let's go ahead and update our `.gitignore` to reflect our good life choices. When you're done, it should look like this:

```
.cache/
node_modules/
dist/
```

We can totally run `npx parcel public/index.html` every time we want to start our dev server, but that gets a little wearing after a while so let's add a script to `package.json` to do it for us. When we're done, the `scripts` key in our `package.json` should look something like this:

```
"scripts": {
  "test": "jest",
  "dev": "parcel public/index.html"
},
```

Now, when we want to spin up our dev server we can go to the terminal, navigate to our project folder (`new-project`), and type `npm run dev`. Sweet. Good breaking point. Let's commit. From the terminal:

```
git add .
git commit -am "Initial commit."
```

## Stubbing out your React app

Now that we've got the scaffolding for our development environment in place, let's go ahead and stub out the beginnings of our React app. Let's start by creating a new folder inside of `src` called `components` and a file inside of it called `App.jsx`. `App.jsx` will become our new sanity check:

```
cd src
mkdir components
cd components
touch App.jsx
cd ..
```

Let's set the contents of `App.jsx` to return some boilerplate to work off:

**`src/components/App.jsx`**
```
import React, { Fragment } from "react";

const App = () => <Fragment>
    Sanity check.
  </Fragment>

export default App;
```

Now that we have a component to render, let's build the entry point for our React application. Open up `src/index.jsx`, junk the sanity check console log, and make yours look like mine:

**`src/index.jsx`**
```
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

ReactDOM.render(<App/>, document.getElementById("app"));
```

Now, let's start up that dev server again and check out our React app in the browser:

```
npm run dev
```

And there you go! You're ready to start devving. You can start writing unit tests (any file that ends with `.test.*`. You can add components to your heart's content. Should you at some point decide to switch from Parcel to another bundler like Webpack, you can cross that bridge when you get to it. In the meantime, time to stop hosing around with project setup and start building!
