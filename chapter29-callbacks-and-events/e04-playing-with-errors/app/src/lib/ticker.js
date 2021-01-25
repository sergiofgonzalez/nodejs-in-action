import { EventEmitter } from 'events';



export function ticker(millis, done) {
  const eventEmitter = new EventEmitter();
  let remainingMillis = Math.max(0, millis);
  let numTicksEmitted = 1;
  if (Date.now() % 5 == 0) {
    const error = new Error('Time is divisible by 5!');
    process.nextTick(() => {
      eventEmitter.emit('error', error);
      return done(error);
    });
    return eventEmitter;
  } else {
  /* the extra tick should be emitted asynchronously to prevent Zalgo! */
    process.nextTick(() => eventEmitter.emit('tick'));

    const recurrentLogic = () => {
      if (Date.now() % 5 == 0) {
        const error = new Error('Time is divisible by 5!');
        eventEmitter.emit('error', error);
        return done(error);
      }

      if (remainingMillis >= 50) {
        eventEmitter.emit('tick');
        numTicksEmitted++;
      }

      remainingMillis -= 50;
      if (remainingMillis <= 0) {
        done(null, numTicksEmitted);
      } else {
        setTimeout(recurrentLogic, Math.min(remainingMillis, 50)); 
      }
    };

    setTimeout(recurrentLogic, Math.min(remainingMillis, 50));
    return eventEmitter;
  }
}