let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')  

export function createEventId() {
 console.log(todayStr);
  return String(eventGuid++)
}

