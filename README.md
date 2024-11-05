# MyAnimeVault
 An anime browsing and social platform developed using React, Typescript, MobX, Chakra UI, and Golang that leverages the AniList API and allows users to explore, rate, and track their favorite anime series with a sleek and modern UI. The platform enables registered users to curate anime lists and manage their watch progress, providing a seamless interface to organize and enjoy their anime journey.

## Youtube Demo
 [![Bug Tracker Demo](https://img.youtube.com/vi/tl8NMqteznU/0.jpg)](https://www.youtube.com/watch?v=tl8NMqteznU)
   
## Tech Stack
### Frontend
* React.js | Typescript | Chakra Ui | MobX
### Backend
* Golang | Gin Framework | PostgreSQL
### Deployment
* Render

## What I Learned
### Npm
* Used the npm cli to download packages build the appliation
### React
* Created reusable components
* Navigation using React Router
* Made Api calls using custom Axios agent and interceptors
### Styling
* Learned about Chakra Ui's diverse component library 
* Used Chakra's built in breakpoints to make components responsive for different screen sizes
### Central State Management
* Used MobX to create stores for different parts of the application (commonStore, userStore, animeStore, etc..)
* Used MobX actions to load content and make api calls throughout the application.
### Authentication
* Implemented JWT Bearer authentication for my api to ensure only authorized users could call my endpoints.
* Used Auth and Refresh Tokens to allow users to call the api without having to reauthenticate every time.
### Gin Framework and PostgresSQL
* Learned about the Gin Framework engine and how to create API endpoints and handlers.
* Handwrote SQL tables and queries for maximum performance and customization.
### Render
* Used Renders built in PostgreSQL database for my production database.
* Deployed the app using Render and used it's environment variables to store my app secrets such as connection strings.
### Continuous Integration
* Implemented a CI/CD pipeline using Render that automatically deploys my application when I push changes to my main branch.
* Created a development branch where I create features and use Pull Requests to merge commits into the main branch and update the production application.
