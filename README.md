# Peak Performance Tracker

This is a full stack web application for athletes who want to organize and track their performance training.

This is a full-stack application that utilizes HTML, CSS, JavaScript, React.js in the front end and Node.js, Express.js, and postgreSQL in the back end.

I built this project so I would have an application that I could send to my friends, family, and training clients that would allow them to better organize and track their training sessions over time.  I also wanted to have an application I could use to track and organize my own training.  In addition to being able to track and organize training, I am currently working on stretch features that will provide users with training programs if they do not have their own.

## Live Deployment Link

Try the application at: https://peak-performance-tracker.herokuapp.com/

## Stack

HTML, CSS, JavaScript, React.js, Node.js, Express.js, Postgresql, Babel, Webpack, React datepicker

## Features
1. User can log training sessions
2. User can view training session log
3. User can input personal records (PR's)
4. User can view PR's
5. User can view PR analytics graphs

## Stretch Features For the Future
1. User can click exercise name to view exercise information
2. User can click exercise name to view video demonstration
3. User can have a training program generated for them
4. User can edit training values
5. User can receive lifting technique critiques

## Preview

https://user-images.githubusercontent.com/20606439/137221190-277c1270-00b9-424d-be49-ab474dacf9b7.mov

https://user-images.githubusercontent.com/20606439/137221234-58b1af42-949e-4fa9-8585-86270aaf3c85.mov

https://user-images.githubusercontent.com/20606439/137221266-33dd2190-5915-4372-a456-2dcd65758ab4.mov

## Requirements
- Node.js 10 or higher
- NPM 6 or higher
- MongoDB 4 or higher

## Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:ryan-byrnes/peak-performance-tracker.git
    cd peak-performance-tracker
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Start the postgresql server

    ```shell
    sudo service postgresql start
    ```
    
1. Import data

    ```shell
    npm run db:import
    ```

1. Start up the database

    ```shell
    pgweb --db=finalProject
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
