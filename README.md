# Blacksmith Frontend Developer Test

## Getting Started

You need to have Node.js v16 and NPM installed in your machine, these are the dependencies to run the test.

This test is using a `.env` file to create the [Browsersync](https://www.browsersync.io/) proxy, you can use this if you'd like or not depending on your preference. A `.env.example` file has been provided which can be used to set up your own `.env` file. Within this file you'll see the following:

```
DEVELOPMENT_DOMAIN=website.local
```

Place your local development url within this area, and include your port if necessary ie. `website.local:8888`.

After installing your NPM dependencies, within the project, you can run the following commands to work with the developer tools bootstrapped to the project.

```
# Start development environment and watch file changes using Browsersync
npm start

# Build all assets of the project for production.
npm run build
```

## Structure

We're using [Gulp](https://gulpjs.com/) to generate our static files into the `dist` folder.

Any assets that need to be added to the project will need to be added into the `src` folder within the project.

- Project is structured in PHP, as a result you'll need to set up a local web server to review the output of the files and make modifications using Browsersync
- CSS/SASS files are imported through `index.scss` within the `/src/scss` folder. All CSS is being compiled with auto-generated prefixes for all CSS elements using [CSSNext](https://cssnext.github.io/)
- JS files are imported through `index.js` within the `/src/js` folder. All JS is being compiled to a browser compatible format using [Babel](https://babeljs.io/). As a result, you can employ the use of ES6+ features if desired.
- Images are also being minified and can be placed within the `/src/images` folder to take advantage of this feature of the project.

## Test Objective

The objective of this test is to correct any issues present within the established codebase when comparing the structured code against the design mockups provided.

You are allowed to use any and all dependencies that you deem necessary for accomplishing the goal of completing the page. Dependencies can be added in any manner you wish to add them.

## Test Instructions

1.) Review the provided design mockups provided in the `design-mockups` folder within the root of this project. You will find three files (`mobile.jpg`, `mobile-nav.jpg` and `desktop.jpg`) which will indicate the expected finalized outcome of the page.

2.) Apply fixes to the implementation of the page based on the design provided. There will be AT LEAST one issue present per major template part element within the build, but there may be other issues as well beyond this. Issues/problems with the site will be specifically found in `/template-parts`, `/src/sass`, and `/src/js`

3.) The Company Culture section is a new addition to this page. The files have been created and included, but you will need to provide markup and styling in order to match the design.

4.) We need an anchor system on the main navigation. Make sure to link the "Company" item to the newly created Company Culture section. The page should scroll smoothly to that section on click.

5.) Fix the "To Top" button on the main footer. It should scroll to the top of the page, similarly to the anchor system on the main navigation.

## Submission

When completed, ensure that you run `npm run build`, keep the generated `dist` folder in your submission, remove the `node_modules` folder from the project and compress the project into a zip file. Submissions can be sent by email to the recruiter that you've been working with.
