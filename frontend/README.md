This node package exists solely for live-reload of our flask app via gulp + browsersync.

Gulp does the following
    - Watches for front end asset change (js, css, html)
    - Concatenates js into single file `all.js`
    - Fixes common javascript linting errors
    - Minifies js and places into dist folder as `all.min.js`
    - Reloads browser via browsersync
