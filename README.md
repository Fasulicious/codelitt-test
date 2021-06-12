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

## Considerations

Project is up at 68.183.110.145:8000

GET routes:
    ```
    /user
    /user/:id
    /user/tag/:tag
    ```

POST route:
    ```
    /user
    ```

PATCH route:
    ```
    /user/:id
    ```
DELETE route:
    ```
    /user/:id
    ```

Keep in mind when create a new user:
-   type property only accepts values of ['contractor', 'employee']
-   tag property only accepts values of ['c_sharp', 'angular', 'general_frontend', 'seasoned_leader']
-   role property only accpets values of ['software_engineer', 'project_manager']

## Next Steps

-   Add a documentation about the endpoints, it could be with swagger but I rather use apidocs.
-   Connect the project with some online logger service as logdna for monitoring.
-   Register our database in some service such as redash, for easy monitoring.