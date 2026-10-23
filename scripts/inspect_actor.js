import fs from 'fs';

const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const actorIdx = html.indexOf('pup-actor');
console.log('pup-actor index:', actorIdx);
if (actorIdx !== -1) {
  console.log('pup-actor snippet:', html.slice(actorIdx - 100, actorIdx + 500));
}

const laneIdx = html.indexOf('pup-lane');
console.log('pup-lane index:', laneIdx);
if (laneIdx !== -1) {
  console.log('pup-lane snippet:', html.slice(laneIdx - 100, laneIdx + 500));
}

const stopMatches = [...html.matchAll(/class="[^"]*pup-stop[^"]*"/g)];
console.log('pup-stop count:', stopMatches.length);
stopMatches.forEach(m => console.log(m[0]));
