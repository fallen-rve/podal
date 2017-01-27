## Features
* [Webpack](http://gulpjs.com/)
* [Sass](http://sass-lang.com/)
* [Babel](http://foundation.zurb.com/)

## Pre-Installation

* [Node](http://nodejs.org/)

## Installation

1) [Download](https://github.com/fallen-rve/podal/archive/master.zip) the files

2) From the command line, change directories to podal

```bash
cd podal
```

3) Install Node dependencies

```bash
npm install
```

4) Start the Webpack Server
```bash
npm run dev
```

5) Navigate to [http://localhost:8080](http://localhost:8080)

## NPM Tasks

From the command line, type any of the following npm scripts to perform an action:

`npm run dev` - Starts the Webpack Server. This will handle transpiling your Javascript using Babel.
`npm run watch` - Starts the Sass watcher. This will compile your scss into css for you.
`npm run build` - Starts the build process. This will compile and minify your Javascript and Css files in the dist directory.
