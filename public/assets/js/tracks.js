import { tracks } from '../../data/tracks.js';

const displayTracks = () => {
  const tableBody = document.querySelector('#tracks-table tbody');

  tracks
  .map((track) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${track.id}</td>
      <td>
        <a href="/tracks/${track.id}">
            ${track.name}
        </a>
      </td>
      <td class="location-table-row">
        <img src="../../assets/images/flags/${track.flag}" alt="track-flag">
        <p>
            ${track.location}
        </p>
      </td>
    `;

    tableBody.appendChild(tableRow);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayTracks();
});