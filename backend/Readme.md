### Information

## Server

Server Name: localhost
Port: 3001

## Database

Database Name: farm
Database URL: mongod://localhost:27017/farm
Database URL Mongo Atlas: mongodb+srv://htx:vrC115qG5M0DV8VH@cluster0-4e7a2.mongodb.net/

Database directory: /data

### Import database thuốc bvtv

```bash
Source: /backend/utils/importDatabaseThuocBvtv.js
Command: node importDatabaseThuocBvtv.js
```

### Import database phân bón

```bash
Source: /backend/utils/importDatabsePhanBon.js
Command: node importDatabasePhanBon.js
```

### Import farm database

Database Source: /backend/docs/database/farm

```
sudo mongorestore -d farm ./docs/database/farm

```

### Start node server

Install nessesary libraries

```
npm install
```

Start node server

```
npm start
```

Start server on Docker container
```
npm run docker:dev
```

### Generate api docs

## Generate api docs and open

```
npm run docs
```

## Generate api docs

```
npm run apidoc
```

## Open api doc

```
npm run postdoc
```

## Migrate database

- #### Import data for testing

```bash
cd backend
npm run migrate_up
```

- #### Remove all testing data

```bash
cd backend
npm run migrate_down
```
