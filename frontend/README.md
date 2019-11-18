# HTX 4.0 Frontend Web Application - Management Systems
## Technological information
- OS: Linux (preferred), Window, MAC
- Node.js v8.10.0
- MongoDb v3.6.3
## Development environment
- Hostname: *localhost*
- Frontend development port: *5000*
- Backend development port: *3001*
## Installation
Install Frontend dependencies and packages
```
$ npm install
```

Install Backend (APIs) dependencies and packages for the first time (running this command once after cloning the repository from github)
```
$ npm run install:backend
```

## Start development environment
**Prerequisites**: 

- Turn off all of your running processes which is running on port *3001* and *5000*
- Turn on MongoDb service and running MongoDb on port *27017*

**Available scripts**:

Start development environment: (both FE and BE)
```
$ npm run dev
```

Start frontend development environment:
```
$ npm run dev:frontend
```

Start backend development environment:
```
$ npm run dev:backend
```

**Available script for admin only:**

Build, minify frontend source code for production mode:
```
$ npm run build
```

## Run config linter for development

` npm run eslint `

For more document about linter rules, following repos:
(https://github.com/yannickcr/eslint-plugin-react)
(https://github.com/airbnb/javascript)
