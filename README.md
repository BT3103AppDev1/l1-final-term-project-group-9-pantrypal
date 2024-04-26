# PantryPal

## About
In the face of escalating food waste challenges, with Singapore alone discarding over 2,000 tonnes of food daily (SG101, 2022), the need for innovative solutions has never been more critical. Our proposal introduces PantryPal, an innovative platform aimed at revolutionising how individuals manage their leftover food resources. By reducing waste, saving time preparing a meal in the kitchen, and fostering community engagement through shared culinary experiences, PantryPal addresses this pressing societal challenge while promoting sustainable practices.

Our system is designed to cater to a diverse user base, including environmentally-conscious individuals, busy professionals, people with dietary restrictions, and food enthusiasts. Users can register and manage their profiles, input leftover ingredients to obtain AI-generated recipes, save and manage favourite recipes in a personal collection, and interact with a community of like-minded individuals through recipe sharing and liking.

Following a SCRUM framework and a total of three 2-week sprints, we completed all 21 user stories in our Product Backlog, with 1 new feature added before Sprint 3 which was not initially planned in our mid-term requirements. We closely followed important SCRUM events such as sprint planning, weekly stand-ups, sprint review and retrospective. We made use of artefacts to ensure that we were on task and on track to meeting our end goal. We kept track of our Product backlog, Sprint backlogs, Velocity Chart and Sprint burndown charts on Google Sheets. For our storyboard containing smaller tasks, we used Github Projects and used a Miro board for our Sprint Retrospective. 

After the completion of all the PantryPal user stories, we created a total of 97 automated test cases across 22 different components with Vitest. Leveraging GitHub Workflow, we also created a CI/CD pipeline to enable automated testing, build and also deployment. 

In conclusion, the successful development and deployment of PantryPal exemplify our commitment to tackling food waste through technological innovation. Our platform not only simplifies meal planning and reduces food waste but also cultivates a community of users who are passionate about sustainable living. We invite users who share our vision of a more sustainable world to join us in this journey to maximise impact. Together, we can transform the way we think about and utilise our food resources.

## Links
Website: https://pantrypal-e1225.web.app/

Report: https://docs.google.com/document/d/1sBYRNxE0Yrr5owWkquDM1H5IOaIg2pSf6eANqiQeJkc/edit?usp=sharing

SCRUM Artefacts: https://docs.google.com/spreadsheets/d/1YmsZ2pfBofQhoxQOZtnoy6yAnzAnQzqcCA1MogU8HpU/edit?usp=sharing

Video: [https://youtu.be/jU9gwtz15cQ](https://youtu.be/qeTImnWxWUE)

## Tech Stack
Frontend: JavaScript, HTML, CSS, Vuetify
Backend: Node.js
APIs: OpenAI

## How To Use Locally
### Frontend
To clone and run this application, you will need [Git](https://github.com/git-guides/install-git) and [Node.js](https://nodejs.org/en) (which comes with npm) installed on your computer. 
From your command line:
```
# Clone this repository
git clone https://github.com/BT3103AppDev1/l1-final-term-project-group-9-pantrypal.git

# Go into the frontend folder
cd pantrypal-frontend

# Install dependencies
npm i

# Run the frontend app
npm run dev
```
### Backend
Our current implementation makes use of the deployed API (using Cloud Function on Firebase) to integrate frontend with the openAI backend . There is no need to run the chatgpt-backend locally.
However, if you would like to test our backend code. From your command line, open new window:
```
cd chatgpt-backend

# Install dependencies
npm i

# Run the backend app
node index.js
```
Server should be running in port 3000.
