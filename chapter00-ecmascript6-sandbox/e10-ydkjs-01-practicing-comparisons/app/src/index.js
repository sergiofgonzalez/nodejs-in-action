'use strict';


const dayStart = '07:30';
const dayEnd = '17:45';

function scheduleMeeting(startTime, durationMins) {
  function toMinsSinceZeroDark(hhmmTimeStr) {
    const [startHour, startMin] = hhmmTimeStr.split(':');
    return Number(startHour * 60 + startMin);
  }

  const meetingStartMins = toMinsSinceZeroDark(startTime);
  if (meetingStartMins < toMinsSinceZeroDark(dayStart))
    return false;
  else {
    const meetingEndMins = meetingStartMins + durationMins;
    if (meetingEndMins > toMinsSinceZeroDark(dayEnd)) 
      return false;
    else
      return true;
  }
}

module.exports = scheduleMeeting;