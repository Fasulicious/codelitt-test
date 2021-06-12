# CODELITT CHALLENGE

## OVERVIEW
This is a simple crud as requested by the codelitt challenge

## Requirements
- npm
- node
- docker
- docker-compose

## How to install
1.  Clone the repo
    ```
    git clone git@gitlab.com:codelittinc/node-rest-interview-project-fidel-ugaldi.git
    git checkout challenge
    ```

2.  (Optional) Create .env file following .env.example if you want to run it locally for development

3.  Install dependencies
    ```
    npm install
    ```

4.  (Optional) Verify test and coverage
    ```
    npm run test
    npm run coverage
    ```

5.  Deploy:

5.1 Locally
    ```
    npx knex migrate:latest
    npm run dev
    ```

5.2 Stage or Production:
    ```
    docker-compose up
    ```

6.  Server wille be listening on port 3000 locally and port 8000 for prod.