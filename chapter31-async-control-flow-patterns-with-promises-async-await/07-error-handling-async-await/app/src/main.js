
function delayError(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`Error after ${ millis } ms`)), millis);
  });
}


async function playingWithErrors(throwSyncError) {
  try {
    if (throwSyncError) {
      throw new Error('This is a synchronous error');
    }
    await delayError(1000);
  } catch (err) {
    console.error(`ERROR: ${ err.message }`);
  } finally {
    console.log(`Done!`);
  }
}


playingWithErrors(false);
