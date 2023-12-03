/*
Adam Rilatt, Erin Sinatra, Cole Byerly, Luca Cammarota
03 December 2023
PDM Final Project -- Holiday Jeopardy Scoreboard Functions
*/

// By AR unless otherwise noted

// NOTE: These rank statistic options are indexed by the 'rank' parameter
// passed in the URL.
// TODO: Add more ranks -- ER?
const stat_options = [
  {
    "name": "Cheapskate",
    "description": "finished the 100 questions first"
  }
];

// Extract the player score and rank statistic from the URL, then update
// the page to contain that information.
function update_score() {
  
  let args = new URLSearchParams(window.location.search);
  
  let score = parseInt(args.get("score"));
  let rank_index = parseInt(args.get("rank"));
  let rank = stat_options[rank_index];

  $("#player-score").html(`
      Your Score:<br />
      ${score}
  `);

  $("#player-stat").html(`
     <em>${rank["name"]}</em>: ${rank["description"]}
  `);
  
}

$(document).ready(function() {
  update_score();
});