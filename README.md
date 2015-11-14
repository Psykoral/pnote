# Prefix Notation

Build Status:
* master: [![Build Status](https://travis-ci.org/Psykoral/pnote.svg?branch=master)](https://travis-ci.org/Psykoral/pnote)
	* Note: PhantomJS on Linux is having issues, causing the build to fail.

Project template built from FlippyUI. pnote includes:

* A Git Clone from [FlippyUI Grunt Starter Kit](https://github.com/Psykoral/grunt-starter-kit)
* Project specific Grunt runner.
* bower.json and package.json for common dependencies.
* AMD Javascript sources specific to pnote.
* Reference Design Library: http://flippydisk.com/pnote/

## Local Development

### Prerequisites

* Install [Git](https://git-scm.com/)
* Install [NodeJS](https://nodejs.org)
* Install [Grunt](http://gruntjs.com/getting-started)

		npm install -g grunt-cli

* Install [Bower](http://bower.io/)

		npm install -g bower

* Install [PhantomJS](http://phantomjs.org/download.html)

		npm install -g phantomjs

### Running PNote

* Clone Pnote
	<pre>git clone https://github.com/Psykoral/pnote.git</pre>
* Run all NPM and Bower items
	<pre>./update.sh</pre>
	* Windows users run this with GitBash.exe
	* *nix & Mac users you might need to chmod +x this file to allow it to be executable.
* <pre>grunt live</pre>
	* Runs the Example site
* <pre>grunt jsdoc</pre>
	* Runs JSDoc API documentation
	* Run after 'grunt live', keep that server running then go to http://localhost/jsdoc/
* <pre>grunt test</pre>
	* Runs Jasmine tests in the console (also runs on 'grunt live')
* <pre>grunt livetests</pre>
	* Runs Jasmine tests in a browser

## Distribution Package

The distribution package is the end result of building this project:

    dist/
    ├── css/
       ├── pnote.css
    ├── js/
       ├── pnote.js
    ├── img/
       ├── banner.png
       ├── favicon.ico

## Community

Want to use FlippyUI? See our [Contributing](https://github.com/Psykoral/pnote/blob/master/CONTRIBUTING.md) documentation.

Developed under the [MIT License](https://github.com/Psykoral/pnote/blob/master/LICENSE.txt).
