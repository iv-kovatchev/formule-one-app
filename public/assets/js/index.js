import { races } from '../../data/races.js';

const getNextRace = () => {
  const now = new Date();

  return races.map(race => ({
    ...race,
    race_time:new Date(race.race_time)
  })).filter(race => race.race_time > now).sort((a, b) => a.race_time - b.race_time)[0];
}

const createRaceTitle = (race) => {
  let raceTitleDiv = document.querySelector('#next-race-title');

  const img = document.createElement('img');
  img.className = 'next-race-flag';
  img.src = `/assets/images/flags/${race.flag}`;
  img.alt = 'next-race-flag';

  const title = document.createElement('h2');
  title.textContent = race.name;

  raceTitleDiv.appendChild(img);
  raceTitleDiv.appendChild(title);
}

const createNextRaceTimer = (race) => {
  const daysEl = document.querySelector('#next-race-timer-days');
  const hoursEl = document.querySelector('#next-race-timer-hours');
  const minutesEl = document.querySelector('#next-race-timer-minutes');
  const secondsEl = document.querySelector('#next-race-timer-seconds');

  const updateTimer = () => {
    const now = new Date();
    const difference = race.race_time - now;

    if(difference <= 0) {
      clearInterval(timeInterval);
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString();
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  updateTimer();
  const timeInterval = setInterval(updateTimer, 1000);
}

const displayNextRace = () => {
  const nextRace = getNextRace();

  createRaceTitle(nextRace);
  createNextRaceTimer(nextRace);
}

document.addEventListener('DOMContentLoaded', () => {
  displayNextRace();
});