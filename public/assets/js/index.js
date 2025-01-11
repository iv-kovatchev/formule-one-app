import { races } from '../../data/races.js';
import { drivers } from '../../data/drivers.js';
import { tracks } from '../../data/tracks.js';

const mediaQuery = window.matchMedia("(max-width: 1024px)");

//Helper method for getting next race from races.js
const getNextRace = () => {
  const now = new Date();

  return races.map(race => ({
    ...race,
    race_time:new Date(race.race_time)
  })).filter(race => race.race_time > now).sort((a, b) => a.race_time - b.race_time)[0];
}

//Helper method for getting last race from races.js
const getLastRace = () => {
  const now = new Date();

  return races.map(race => ({
    ...race,
    race_time:new Date(race.race_time)
  })).filter(race => race.race_time < now).sort((a, b) => b.race_time - a.race_time)[0];
}

//Creating the next race title in the home page navbar
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

//Creating the next race timer in the home page navbar
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

//Helper method for creating the last race driver container
const createLastRaceDriverContainer = (driver, container, imgPlace) => {
  //image place
  const imagePlace = document.createElement('img');
  imagePlace.src = `/assets/images/medals/${imgPlace}`;
  imagePlace.alt = 'last-race-place-medal';

  //driver name
  const driverName = document.createElement('h2');
  driverName.textContent = driver.name;

  const driverNameContainer = document.createElement('div');
  driverNameContainer.className = 'driver-name-container';
  driverNameContainer.appendChild(imagePlace);
  driverNameContainer.appendChild(driverName);

  //driver image
  const driverImage = document.createElement('img');
  driverImage.src = `/assets/images/drivers/${driver.image}`;
  driverImage.alt = 'last-race-place';

  const driverPlaceDiv = document.createElement('div');
  driverPlaceDiv.className = 'last-race-driver-box';

  driverPlaceDiv.appendChild(driverNameContainer);
  driverPlaceDiv.appendChild(driverImage);

  container.appendChild(driverPlaceDiv);
}

//Creating the last race podium section
const createLastRacePodium = (race) => {
  let lastRacePodiumTitle = document.querySelector('#last-race-title');
  let lastRacePodiumDiv = document.querySelector('#last-race-podium');

  const firstPlaceDriver = drivers.find(driver => driver.id === race.first_place_driver_id);
  const secondPlaceDriver = drivers.find(driver => driver.id === race.second_place_driver_id);
  const thirdPlaceDriver = drivers.find(driver => driver.id === race.third_place_driver_id);

  const img = document.createElement('img');
  img.className = 'last-race-flag';
  img.src = `/assets/images/flags/${race.flag}`;
  img.alt = 'last-race-flag';

  const nameFirstPart = document.createElement('h1');
  nameFirstPart.textContent = 'Last race:';
  const nameSecondPart = document.createElement('h1');
  nameSecondPart.textContent = race.name + ` (${tracks.find(track => track.id === race.track_id).name})`;

  lastRacePodiumTitle.appendChild(nameFirstPart);
  lastRacePodiumTitle.appendChild(img);
  lastRacePodiumTitle.appendChild(nameSecondPart);

  if(mediaQuery.matches) {
    createLastRaceDriverContainer(firstPlaceDriver, lastRacePodiumDiv, 'first-place.png');
    createLastRaceDriverContainer(secondPlaceDriver, lastRacePodiumDiv, 'second-place.png');
    createLastRaceDriverContainer(thirdPlaceDriver, lastRacePodiumDiv, 'third-place.png');
  }
  else {
    createLastRaceDriverContainer(secondPlaceDriver, lastRacePodiumDiv, 'second-place.png');
    createLastRaceDriverContainer(firstPlaceDriver, lastRacePodiumDiv, 'first-place.png');
    createLastRaceDriverContainer(thirdPlaceDriver, lastRacePodiumDiv, 'third-place.png');
  }
}

//Displaying all section in the home page
const displayNextRace = () => {
  const nextRace = getNextRace();
  const lastRace = getLastRace();

  createRaceTitle(nextRace);
  createNextRaceTimer(nextRace);
  createLastRacePodium(lastRace);
}

document.addEventListener('DOMContentLoaded', () => {
  displayNextRace();
});