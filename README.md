# GarageFlow

A React application for tracking garage repair jobs.

## Live demo

[Try GarageFlow](https://rrobledo23.github.io/GarageFlow/)

Demo data is saved only in your current browser. Use fictional
customer details when trying the app.

## Features

- Add customer names, vehicle details, and repair descriptions.
- Edit and remove individual jobs.
- Mark jobs as completed or reopen them.
- Search by customer name or vehicle.
- Filter jobs by status.
- View total, pending, and completed job counts.
- Keep jobs saved between visits using browser localStorage.

## Built with

- React
- JavaScript
- CSS
- Vite

## Run locally

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open the Local address shown in the terminal.

## Project checks

Check code with ESLint:

    npm run lint

Create a production build:

    npm run build

Preview the production build locally:

    npm run preview

## Data storage

Jobs are stored in the current browser using localStorage.
They do not sync between computers or browsers.
Clearing the site's browser data removes its saved jobs.

## What I practiced

React state, controlled inputs, conditional rendering, array
operations, editing records, search, filtering, and localStorage.