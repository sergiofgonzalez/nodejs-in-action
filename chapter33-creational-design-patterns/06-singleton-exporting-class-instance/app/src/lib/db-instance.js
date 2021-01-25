class Database {
  constructor(dbName, connectionDetails) {
    this.dbName = dbName;
    this.connectionDetails = connectionDetails;
  }
  /* ... other db methods here ... */
}

export const dbInstance = new Database('myDb', 'myConnectionDetais');