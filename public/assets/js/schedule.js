import { races } from '../../data/races.js';
import { drivers } from '../../data/drivers.js';

document.querySelector('#years').addEventListener('change', (event) => {
    console.log(event.target.value);
});

function createDriverRow(driver) {
    console.log(driver);

    return 2;
}

const buildWidget = (race) => {
    const races = document.querySelector('#races-list');

    const widget = document.createElement('section');

    const img = document.createElement('img');
    img.className = 'race-flag';
    img.src = `/assets/images/flags/${race.flag}`;
    img.alt = 'next-race-flag';

    const raceTitle = document.createElement('h2');
    raceTitle.textContent = race.name;

    const raceRow = document.createElement('div');
    raceRow.appendChild(img);
    raceRow.appendChild(raceTitle);

    const firstDriver = drivers.find((driver) => driver.id === race.first_place_driver_id);
    const secondDriver = drivers.find((driver) => driver.id === race.second_place_driver_id);
    const thirdDriver = drivers.find((driver) => driver.id === race.third_place_driver_id);

    const firstDriverElement = createDriverRow(firstDriver);
    const secondDriverElement = createDriverRow(secondDriver);
    const thirdDriverElement = createDriverRow(thirdDriver);

    widget.appendChild(raceRow);
    races.appendChild(widget);
}

const displayAllRaceWidgets = () => {
    for(let race of races) {
        buildWidget(race);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const asd = document.querySelector('#years');

    console.log(asd.value);

    displayAllRaceWidgets()
});