# 27: Example application &mdash; English irregular verbs quiz
> creating a simple English irregular verbs quiz in TypeScript

## Description

This directory contains the creation of a simple web application that presents the user with a quiz of English irregular verbs.

The application is developed iteratively, with many concepts being prototyped in isolation in standalone PoCs.

The application consists of a backend and frontend components.

In the backend, NestJS is used for simplicity and to evaluate and learn the possibilities of the framework.

In the frontend, vanilla TypeScript with Bootstrap as the CSS framework.

### Backend

The backend application will feature three resources:
+ `/questions` &mdash; returns a given number of random questions
+ `/answers` &mdash; used to check the user's answers, return the errors and evaluate the quiz.
+ `/stats` &mdash; to return a few stats to the user such as avg of user's grades, verbs that user commonly fails, verbs recently failed,... (start simple and iteratively add more capabilities)

The backend will use SQLite for persistence.

#### Backend Tasks

- [] Import the list of irregular verbs from markdown
- [] Import the list of irregular verbs from JSON
- [] Import the JSON into the SQLite database
- [] Think about the payload structure for the resources
- [] Learn about NestJS
- [] Prototype NestJS, SQLite integration

### Frontend (TBD)

## Prototypes index

### [01 &mdash; Hello, verbs importer!](01-hello-verbs-importer)
Imports the list of irregular verbs from a markdown file and creates a JSON from it