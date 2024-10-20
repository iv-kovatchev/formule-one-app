import { drivers } from '../../data/drivers.js';
import { teams } from '../../data/teams.js';

const displayDrivers = () => {
  const tableBody = document.querySelector('#standings-table tbody');

  drivers
  .sort((d1, d2) => d2.season_points - d1.season_points)
  .map((driver) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${driver.name}</td>
      <td>${getTeamName(driver.team_id)}</td>
      <td>${driver.season_points}</td>
    `;

    tableBody.appendChild(tableRow);
  });

  console.log(tableBody);
  console.log(drivers);
}

const getTeamName = (teamId) => {
  return teams.find((team) => team.id === teamId).name;
}

document.addEventListener('DOMContentLoaded', () => {
  displayDrivers();
});