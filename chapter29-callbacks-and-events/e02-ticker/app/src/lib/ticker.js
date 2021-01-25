import { EventEmitter } from 'events';

export function ticker(millis, done) {
  const eventEmitter = new EventEmitter();
  let remainingMillis = Math.max(0, millis);
  let numTicksEmitted = 0;
  const recurrentLogic = () => {
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