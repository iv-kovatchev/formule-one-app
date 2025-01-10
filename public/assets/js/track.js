import { tracks } from '../../data/tracks.js';

const trackTitleContainer = document.querySelector('#track-title');
const circuitInformationContent = document.querySelector('#circuit-data-content');
const circuitImageContent = document.querySelector('#circuit-image-content');

const displayTrackTitle = (track) => {
  const img = document.createElement('img');
  img.src = `/assets/images/flags/${track.flag}`;
  img.alt = 'track-flag';

  const title = document.createElement('h1');
  title.innerText = track.name;

  trackTitleContainer.appendChild(img);
  trackTitleContainer.appendChild(title);
}

const displayTackInformation = (track) => {
  const location = document.createElement('h4');
  location.innerText = `Location: ${track.location}`;
  const length = document.createElement('h4');
  length.innerText = `Length: ${track.length} km`;
  const turns = document.createElement('h4');
  turns.innerText = `Turns: ${track.turns}`;
  const laps = document.createElement('h4');
  laps.innerText = `Laps: ${track.laps}`;
  const raceLapRecord = document.createElement('h4');
  raceLapRecord.innerText = `Race lap record: ${track.race_lap_record}`;

  circuitInformationContent.appendChild(location);
  circuitInformationContent.appendChild(length);
  circuitInformationContent.appendChild(turns);
  circuitInformationContent.appendChild(laps);
  circuitInformationContent.appendChild(raceLapRecord);
}

const displayTrackImg = (track) => {
  const img = document.createElement('img');
  img.src = `/assets/images/tracks/${track.image}`;
  img.alt = 'circuit-img';

  circuitImageContent.appendChild(img);
}

document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href;
  const parts = url.split('/');
  const lastNumber = parts[parts.length - 1];
  const track = tracks.find(track => track.id === Number(lastNumber));

  console.log(track);

  displayTrackTitle(track);
  displayTackInformation(track);
  displayTrackImg(track);
});