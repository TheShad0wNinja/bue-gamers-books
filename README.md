<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technology-used">Technology Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## About The Project

![bookover-screenshot](https://i.imgur.com/pvGy4Rn.png)

This is a simple point tracker system for an event that was managed by the BUEGAMERS club in The British University in Egypt.
The event's Name was BookOver, reason for the title being written as that on the website.

### Technology Used
- Frontend:
  - [Nextjs / Reactjs](https://nextjs.org/)
  - [Tailwind](https://tailwindcss.com/)
  - [ DaisyUI ](https://daisyui.com/)
- Backend: 
  - [Nextjs](https://nextjs.org/)
  - [ NextAuth ](https://next-auth.js.org/)
- Database:
  - [ Mongodb (Atlas) ](https://www.mongodb.com/)

## Getting Started
This is how to get a local copy up and running.
### Prerequisites
- Have NPM installed
### Installation
1. Prepare a MongoDB Atlas cluster with it's connection link
2. Clone the repo
```
git clone https://github.com/TheShad0wNinja/bue-gamers-books
```
3. Install the npm packages
```
npm install
```
4. Create an .env file
5. Add your MongoDB connection link to the .env
```.env
MONGODB_URI=YOUR_LINK
```
6. Add your admin username and password the .env
```.env
ADMIN_USER=YOUR_ADMIN_USERNAME
ADMIN_PASS=YOUR_ADMIN_PASSWORD
```
7. Add your authentication secret string to the .env
```.env
NEXTAUTH_SECRET=A_SECRET_FOR_AUTH
```
8. To run the local dev enviroment
```
npm run dev
```

## Usage
- Register user with student id, name, and phone number
- Point system that allows tracking of user's total accumelated points
- Show a leaderboard containing the users and their points
- Ability to add or remove points from user easily
- Admin login to prevent any other outsider from editing the leaderboard