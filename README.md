Overview
========

Application server for Berkeley PR project.

- Simple flask server with two mocked URL endpoints
    - localhost:5000/rankings
    - localhost:5000/players/du19fj3o2
- Gulp and package.json for Browsersync
- This server will be used mostly for frontend development
- Real API development in progress. Can be found at https://github.com/chr1sbest/berkeley_pr_api 


Setup
=======

Make sure you have pip, node, and npm installed, then cd into the root directory of this project and run:

```
pip install -r requirements.txt
npm install
```

To run the application with Browsersync
run `gulp`
