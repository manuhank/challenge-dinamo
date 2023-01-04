# challenge-dinamo

This script is ment to register a giving folder contentent into a mySQL database.
In order to run this application, you will need:
 - [node](https://nodejs.org/es/download/) 16 or greater
 - Either [docker-desktop (optional)](https://www.docker.com/products/docker-desktop/) or a local instance of [mySQL](https://www.mysql.com/downloads/)

## Setup

### Quick start

If you have docker installed, you can quickly start the project by running :
 1. `npm run setup`
 2. `npm run setup:db`
(wait for each step to finnish)

### Configuration
If instead you have another instance of mySQL, create a `.env` file using `.env.example` as example, with your instance configuration.
Then, with your DB running execute:
 1. `npm intall`
 2. `npm run setup:db`

## Usage

Simply run `npm start path`, replacing "path" with a valid path. 
Example: `npm start "."`

If no path is provided, the script will start from the root of the fs.

