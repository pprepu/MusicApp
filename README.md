# MusicApp

The app can be found at: [MusicApp @heroku](https://musicapp-react.herokuapp.com/)

## What is this app?

The purpose of the app is to teach how to recognize musical intervals, which refer to the distance between the frequencies of musical notes. It would be a daunting task to sufficiently present my view and understanding about the importance of intervals in music, but in general, they are the fundamental building pieces of musical harmony which, in part, is typically an essential component of music itself.

I also have some further ideas/hopes for expanding the topics the app would be eventually teaching, but for now, the focus is solely on musical intervals.

## How was this app created?

The backend for this app was built with Node.js using a RESTful approach with express as the web framework. The database used for users and their practice sessions is a MongoDB database managed with Mongoose, an ODM library for Node.js (and MongoDB) and a small package called mongoose-unique-validator to check for uniqueness in values within certain fields. Furthermore, user administration is implemented with tools, such as bcrypt for password security management and JSON web tokens for token based authentication.

The frontend was built with the React-library using hooks to control some simple component states and React-Redux to control the general state of the whole application. Hooks are also used with React-Redux to distribute the saved state in the Redux-store to different components. Communication with the backend is established with the Axios library. Styles were implemented using the Styled-components library built for creating component level styling and using responsive design principles.

In the code, stylistic uniformity in both backend and frontend is achieved by using a static analysis tool ESLint.

### Testing

Integration tests for the backend were created using both Jest and Supertest.

Unit and integration testing for the frontend was implemented with the Jest-library, but it was enhanced with both the React Testing Library and Jest-dom to be able to test the rendered React-components as well. Also, Deep-freeze library was used to check the immutability of reducers used with Redux and Redux-mock-store was helpful in controlling the state of the Redux-store during testing.

Finally, end-to-end tests were created with Cypress.

### Continuous integration

Effort has been put into creating a system for getting the software efficiently to production.

First of all, deployment has been made easier by creating straightforward npm-scripts to help with its different stages.

However, more important is the implementation of Github Actions in the code repository. These actions are currently used to automate linting, testing in both backend and frontend (including end-to-end testing), code coverage analysis (by codecov) and deployment to heroku, where the app itself is currently hosted. Furthermore, badges about the current workflow status and code coverage can be found below.

![GitHub Actions](https://github.com/pprepu/MusicApp/actions/workflows/pipeline.yml/badge.svg)
[![codecov](https://codecov.io/gh/pprepu/MusicApp/branch/master/graph/badge.svg)](https://codecov.io/gh/pprepu/MusicApp)
