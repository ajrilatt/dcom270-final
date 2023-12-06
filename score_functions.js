/*
Adam Rilatt, Erin Sinatra, Cole Byerly, Luca Cammarota
03 December 2023
PDM Final Project -- Holiday Jeopardy Scoreboard Functions
*/

// By AR unless otherwise noted

// Rank statistic names by ER
// NOTE: These rank statistic options are indexed by the 'rank' parameter
// passed in the URL.
const stat_options = [
  "You got the Christmas Spirit!",
  "Spin that Dreidel! You're on a Roll!",
  "You Know Your Kwanzaa!",
  "Challenge Yourself!",
  "High Roller!"
];

// Given a numeric score from 0-6000, generate a string to describe that score.
function gen_score_label(score) {

  // NOTE: These are listed in the correct order so that else { } blocks aren't
  // needed.
  if (score < 2000)
    return "Hope you learned something new!";

  if (score < 4000)
    return "Happy Holidays to You!";

  return "You put in the work this Holiday Season!";
  
}

// Extract the player score and rank statistic from the URL, then update
// the page to contain that information.
function update_score() {
  
  let args = new URLSearchParams(window.location.search);
  
  let score = parseInt(args.get("score"));
  let rank_index = parseInt(args.get("rank"));
  let rank = stat_options[rank_index];

  $("#player-score").html(`
      Your Score:<br />
      ${score}<br />
      ${gen_score_label(score)}
  `);

  $("#player-stat").html(`
     <em>${rank}</em>
  `);
  
}

$(document).ready(function() {
  update_score();
}

// Snow by CB
  let snowsrc="media/snow.gif"
  // Configure below to change number of snow to render
  let no = 10;
  // Configure whether snow should disappear after x seconds (0=never):
  let hidesnowtime = 0;
  // Configure how much snow should drop down before fading ("windowheight" or "pageheight")
  let snowdistance = "pageheight";

///////////Stop Config//////////////////////////////////

  let ie4up = (document.all) ? 1 : 0;
  let ns6up = (document.getElementById&&!document.all) ? 1 : 0;

  function iecompattest(){
  return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
  }

  let dx, xp, yp;    // coordinate and position variables
  let am, stx, sty;  // amplitude and step variables
  let i, doc_width = 800, doc_height = 600; 
  
  if (ns6up) {
    doc_width = self.innerWidth;
    doc_height = self.innerHeight;
  } else if (ie4up) {
    doc_width = iecompattest().clientWidth;
    doc_height = iecompattest().clientHeight;
  }

  dx = new Array();
  xp = new Array();
  yp = new Array();
  am = new Array();
  stx = new Array();
  sty = new Array();
  snowsrc=(snowsrc.indexOf("")!=-1)? "media/snow.gif" : snowsrc
  for (i = 0; i < no; ++ i) {  
    dx[i] = 0;                        // set coordinate variables
    xp[i] = Math.random()*(doc_width-50);  // set position variables
    yp[i] = Math.random()*doc_height;
    am[i] = Math.random()*20;         // set amplitude variables
    stx[i] = 0.02 + Math.random()/10; // set step variables
    sty[i] = 0.7 + Math.random();     // set step variables
    if (ie4up||ns6up) {
      if (i == 0) {
        document.write("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: "+ i +"; VISIBILITY: visible; TOP: 15px; LEFT: 15px;\"><a href=\"\"><img src='"+snowsrc+"' border=\"0\"><\/a><\/div>");
      } else {
        document.write("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: "+ i +"; VISIBILITY: visible; TOP: 15px; LEFT: 15px;\"><img src='"+snowsrc+"' border=\"0\"><\/div>");
      }
    }
  }

  function snowIE_NS6() {  
    doc_width = ns6up?window.innerWidth-10 : iecompattest().clientWidth-10;
    doc_height=(window.innerHeight && snowdistance=="windowheight")? window.innerHeight : (ie4up && snowdistance=="windowheight")?  iecompattest().clientHeight : (ie4up && !window.opera && snowdistance=="pageheight")? iecompattest().scrollHeight : iecompattest().offsetHeight;
  if (snowdistance=="windowheight"){
    doc_height = window.innerHeight || iecompattest().clientHeight
  }
  else{
    doc_height = iecompattest().scrollHeight
  }
    for (i = 0; i < no; ++ i) {  // iterate for every dot
      yp[i] += sty[i];
      if (yp[i] > doc_height-50) {
        xp[i] = Math.random()*(doc_width-am[i]-30);
        yp[i] = 0;
        stx[i] = 0.02 + Math.random()/10;
        sty[i] = 0.7 + Math.random();
      }
      dx[i] += stx[i];
      document.getElementById("dot"+i).style.top=yp[i]+"px";
      document.getElementById("dot"+i).style.left=xp[i] + am[i]*Math.sin(dx[i])+"px";  
    }
    snowtimer=setTimeout("snowIE_NS6()", 10);
  }

  function hidesnow(){
    if (window.snowtimer) clearTimeout(snowtimer)
    for (i=0; i<no; i++) document.getElementById("dot"+i).style.visibility="hidden"
  }
    

if (ie4up||ns6up){
    snowIE_NS6();
    if (hidesnowtime>0)
    setTimeout("hidesnow()", hidesnowtime*1000)
    }
// End snow
});
