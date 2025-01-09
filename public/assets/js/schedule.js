import { races } from '../../data/races.js';
import { drivers } from '../../data/drivers.js';

const selectEl = document.querySelector('#years');
const racesListEl = document.querySelector('#races-list');

function getAllRacesForCurrentYear() {
    const selectedYear = Number(selectEl.value);
    return races.filter(race => {
        const raceDate = new Date(race.race_time).getFullYear();
        return raceDate === selectedYear;
    });
}

selectEl.addEventListener('change', (event) => {
    const currentYearRaces = getAllRacesForCurrentYear();
    displayAllRaceWidgets(currentYearRaces);
});

function createDriverRow(driver, medal) {
    const driverRow = document.createElement('div');
    driverRow.className = 'race-widget-driver-row';

    const img = document.createElement('img');
    img.className = 'race-medal';
    img.src = `/assets/images/medals/${medal}`;
    img.alt = 'race-medal';

    const name = document.createElement('h3');
    name.textContent = driver.name;

    driverRow.appendChild(img);
    driverRow.appendChild(name);

    return driverRow;
}

const generateDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `Race date: ${day}/${month}/${year}`;
}

const buildWidget = (race) => {
    const widget = document.createElement('section');
    widget.className = 'race-widget';

    const img = document.createElement('img');
    img.className = 'race-flag';
    img.src = `/assets/images/flags/${race.flag}`;
    img.alt = 'next-race-flag';

    const raceTitle = document.createElement('h2');
    raceTitle.textContent = race.name;

    const raceHeaderRow = document.createElement('div');
    raceHeaderRow.className = 'race-widget-header';
    raceHeaderRow.appendChild(img);
    raceHeaderRow.appendChild(raceTitle);

    const raceDate = document.createElement('h3');
    raceDate.textContent = generateDate(race.race_time);

    widget.appendChild(raceHeaderRow);
    widget.appendChild(raceDate);

    const firstDriver = drivers.find((driver) => driver.id === race.first_place_driver_id);
    const secondDriver = drivers.find((driver) => driver.id === race.second_place_driver_id);
    const thirdDriver = drivers.find((driver) => driver.id === race.third_place_driver_id);

    if(firstDriver === undefined || secondDriver === undefined || thirdDriver === undefined) {
        const noResult = document.createElement('h2');
        noResult.textContent = 'No result';
        noResult.className = 'no-result';
        widget.appendChild(noResult);
    }
    else {
        const firstDriverElement = createDriverRow(firstDriver, 'first-place.png');
        const secondDriverElement = createDriverRow(secondDriver, 'second-place.png');
        const thirdDriverElement = createDriverRow(thirdDriver, 'third-place.png');

        widget.appendChild(firstDriverElement);
        widget.appendChild(secondDriverElement);
        widget.appendChild(thirdDriverElement);
    }

    racesListEl.appendChild(widget);
}

const displayAllRaceWidgets = (races) => {
    racesListEl.innerHTML = '';

    for(let race of races) {
        buildWidget(race);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const asd = document.querySelector('#years');

    console.log(asd.value);

    const currentYearRaces = getAllRacesForCurrentYear();
    displayAllRaceWidgets(currentYearRaces);
});