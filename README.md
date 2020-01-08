# Quest Log

Quest Log is an app for procrastinators and slackers. If you tend to put off tasks to enjoy a movie or video game, then you might enjoy Quest Log.

When logging in, the user creates a character with a name and description. This character will live or die based on how the user handles their tasks. On completion of a task, the character regains some health. On failing a task, the character will lose some health. If the character's health reaches 0, they'll die and the user will be required to create a new character.

Users are formed up in a guild that can see each other's Quests and health points. They can reach out to help you when in trouble, or shame you when you slack.

# Installation

## Clone the project

Clone the project to your computer with
`git clone git@github.com:klb417/quest-log.git`.

## Install dependencies

Install all dependencies needed to run Quest Log. Run `npm install` inside the newly created directory.

## Set up the database

Copy the `database.json.example` file to `database.json`.

## Start the app

Inside the project root directory, run `json-server -p 5002 api/database.json` in your terminal.

Once that runs successfully, open a second terminal tab/window, and run `npm start`.
