
/**
 * Information related to the creation of a DB connection
 */
interface IConnection {
  server: string;
  port: number;
}

/**
 * Information returned in case of an error
 */
interface IError {
  code: number;
  message: string;
}

/**
 * Single row of data from the DB
 */
interface IDataRow {
  id: number;
  name: string;
  surname: string;
}


function getCustomerData(connection: IConnection, accessKey: string) : Promise<IDataRow[]> {
  return new Promise<IDataRow[]>(
    (
      resolve: (result: IDataRow[]) => void,
      reject: (reason: IError) => void) => {
        console.log(`Connecting to db://${connection.server}:${connection.port}`);
        console.log(`Querying data with key ${accessKey}`);
        if (accessKey.length % 2 === 0) {
          console.log(`Returning data`);
          return resolve(
            [
              {id: 1, name: 'foo', surname: 'bar'},
              {id: 2, name: 'foobar', surname: 'baz'},
              {id: 3, name: 'baz', surname: 'bar'}
            ]
          );
        }
        console.log(`An error was found`);
        reject({code: 666, message: 'the key was a bit odd'});
  });
}

getCustomerData({server: 'dev', port: 5000}, 'abc')
  .then((rows) => {
    for (const row of rows) {
      console.log(row);
    }
  })
  .catch((err) => {
    console.error(`An error has occurred:`, err);
  });

