### Information
## Server

Server Name: localhost
Port: 3001

## Database

Database Name: farm
Database URL: mongod://localhost:27017/farm
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

