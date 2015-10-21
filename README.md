Prefix Notation
====
Build Status:
- master: [![Build Status](http://build.flippydisk.com/buildStatus/icon?job=PNote)](http://build.flippydisk.com/job/PNote/)

Project template built from FlippyUI. pnote includes:

- A Git Clone from [FlippyUI pnote](https://github.com/Psykoral/pnote)
- Project specific Grunt runner.
- bower.json and package.json for common dependencies.
- AMD Javascript sources specific to pnote.
- Reference Design Library: http://flippydisk.com/pnote/

Local Development
-------
- git clone https://github.com/Psykoral/pnote.git
- ./update.sh
	- Windows users run this with GitBash.exe
	- *nix & Mac users you might need to chmod +x this file to allow it to be executable.
- grunt live - Runs the Example site
- grunt jsdoc - Runs JSDoc API documentation
	- Run after 'grunt live', keep that server running then go to http://localhost/jsdoc/
- grunt test - Runs Jasmine tests in the console (also runs on 'grunt live')
- grunt livetests - Runs Jasmine tests in a browser

Distribution Package
-------
The distribution package is the end result of building this project:

    dist/
    ├── css/
       ├── pnote.css
    ├── js/
       ├── pnote.js
    ├── img/
       ├── banner.png
       ├── favicon.ico

Community
-------

Want to use FlippyUI? See our [Contributing](https://github.com/Psykoral/pnote/blob/master/CONTRIBUTING.md) documentation.

Developed under the [MIT License](https://github.com/Psykoral/pnote/blob/master/LICENSE.txt).
