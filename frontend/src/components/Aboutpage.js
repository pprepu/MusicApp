import React from 'react'

import {
  SubPage,
  TextParagraph,
  Heading,
  SubHeading,
  Link,
} from '../globalStyles'

const AboutPage = () => {
  return (
    <SubPage>
      <Heading>
        What is this app?
      </Heading>
      <TextParagraph>
        This is a web application made by me, Pekka Prepula, to demonstrate some of the technologies I'm familiar with and
        my coding style overall. Thus, it's important to also head to <Link href="https://github.com/pprepu/MusicApp" target="_blank">the github-repository</Link> to check more closely what the
        actual code looks like.
      </TextParagraph>
      <TextParagraph>
        The purpose of the app is to teach how to recognize musical intervals, which refer to the distance between the frequencies of
        musical notes. It would be a daunting task to sufficiently present my view and understanding about the importance of intervals in music,
        but in general, they are the fundamental building pieces of musical harmony which, in part, is typically an essential
        component of music itself.
      </TextParagraph>
      <TextParagraph>
        I also have some further ideas/hopes for expanding the topics the app would be eventually teaching, but for now, the focus is solely
        on musical intervals.
      </TextParagraph>
      <Heading>
        How was this app created?
      </Heading>
      <TextParagraph>
        The backend for this app was built with Node.js using a RESTful approach with express as the web framework.
        The database used for users and their practice sessions is a MongoDB database managed with Mongoose, an ODM library for Node.js (and MongoDB) and a small package called mongoose-unique-validator to check for uniqueness in values within certain fields.
        Furthermore, user administration is implemented with tools, such as bcrypt for password security management and JSON web tokens for token based authentication.
      </TextParagraph>
      <TextParagraph>
        The frontend was built with the React-library using hooks to control some simple component states and React-Redux to control the general state of the whole application. Hooks are also used with React-Redux to distribute the saved state in the Redux-store to different components.
        Communication with the backend is established with the Axios library. Styles were implemented using the Styled-components library built for creating component level styling and using responsive design principles.
      </TextParagraph>
      <TextParagraph>
        In the code, stylistic uniformity in both backend and frontend is achieved by using a static analysis tool ESLint.
      </TextParagraph>
      <SubHeading>
        Testing
      </SubHeading>
      <TextParagraph>
        Integration tests for the backend were created using both Jest and Supertest.
      </TextParagraph>
      <TextParagraph>
        Unit and integration testing for the frontend was implemented with the Jest-library, but it was enhanced with both the React Testing Library and Jest-dom to be able to test the rendered React-components as well.
        Also, Deep-freeze library was used to check the immutability of reducers used with Redux and Redux-mock-store was helpful in controlling the state of the Redux-store during testing.
      </TextParagraph>
      <TextParagraph>
        Finally, end-to-end tests were created with Cypress.
      </TextParagraph>
      <SubHeading>
        Continuous integration
      </SubHeading>
      <TextParagraph>
        Effort has been put into creating a system for getting the software efficiently to production.
      </TextParagraph>
      <TextParagraph>
        First of all, deployment has been made easier by creating straightforward npm-scripts to help with its different stages.      </TextParagraph>
      <TextParagraph>
        However, more important is the implementation of Github Actions in the code repository. These actions are currently used to automate linting, testing in both backend and frontend (including end-to-end testing), code coverage analysis (by codecov) and deployment to heroku, where the app itself is currently hosted.
        Furthermore, badges about the current workflow status and code coverage can be found in the github-repo <Link href="https://github.com/pprepu/MusicApp#readme" target="_blank">README.</Link>
      </TextParagraph>
    </SubPage>
  )
}

export default AboutPage