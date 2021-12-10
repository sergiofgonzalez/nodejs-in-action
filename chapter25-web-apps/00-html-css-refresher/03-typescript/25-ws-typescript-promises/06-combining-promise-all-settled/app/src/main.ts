function getValue(val: number = 0): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      if (result % 10 == 0) {
        reject(`the number ${ result } can be divided by 10!`);
      }
      resolve(result);
    }, 1000);
  });
}

interface ClassifiedResults {
  failed: number;
  succeeded: number;
  total: number;
}

function generateTotal(iterations: number): Promise<ClassifiedResults> {
  return Promise.allSettled(
    Array(iterations)
      .fill(null)
      .map(() => getValue())
  )
    .then((settledResults) => {
      console.log(`All promises settled:`, settledResults);
      const classifiedResults: ClassifiedResults = settledResults
        .reduce((acc, current) =>{
          return current.status === 'fulfilled' ? { ...acc, succeeded: acc.succeeded + 1, total: acc.total + current.value } : { ...acc, failed: acc.failed + 1 };
        }, { failed: 0, succeeded: 0, total: 0 });
      console.log(`classified results:`, classifiedResults);
      return classifiedResults;
    })
    .finally(() => console.log(`Finished!`));
}

function doProcess() {
  Promise.all(
    Array(3)
      .fill(null)
      .map(() => generateTotal(10))
  )
    .then((promiseAllResult) => {
      console.log(`promiseAllResult:`, promiseAllResult);
      const grandTotal = promiseAllResult.reduce((acc, currItem) => acc + currItem.total, 0);
      console.log(`grandTotal:`, grandTotal);
    });
}


doProcess();
