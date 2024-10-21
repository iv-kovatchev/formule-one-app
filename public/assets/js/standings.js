import { drivers } from '../../data/drivers.js';
import { teams } from '../../data/teams.js';

const pathname = window.location.pathname;

const displayDrivers = () => {
  const tableBody = document.querySelector('#standings-table tbody');
  let counter = 1;

  drivers
  .sort((d1, d2) => d2.season_points - d1.season_points)
  .map((driver) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${counter}</td>
      <td>${driver.name}</td>
      <td>${getTeamName(driver.team_id)}</td>
      <td>${driver.season_points}</td>
    `;

    tableBody.appendChild(tableRow);

    counter++;
  });
}

const displayConstructors = () => {
  const tableBody = document.querySelector('#standings-table tbody');
  let counter = 1;

  teams
  .sort((t1, t2) => t2.points - t1.points)
  .map((team) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${counter}</td>
      <td>${team.name}</td>
      <td>${team.points}</td>
    `;

    tableBody.appendChild(tableRow);

    counter++;
  });
}

const getTeamName = (teamId) => {
  return teams.find((team) => team.id === teamId).name;
}

document.addEventListener('DOMContentLoaded', () => {
  if(pathname === '/standings/drivers') {
    displayDrivers();
  }
  else {
    displayConstructors();
  }
});