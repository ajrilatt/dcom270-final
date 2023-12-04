/*
Adam Rilatt, Erin Sinatra, Cole Byerly, Luca Cammarota
22 November 2023
PDM Final Project -- Holiday Jeopardy Game Page Functions
*/

// By AR unless otherwise noted

// Javascript object by AR
// Questions by ES
const questions = {
  "christmas": [
    {
      "question": "What day is Christmas?",
      "options": [
        "December 20",
        "December 31",
        "December 25",
        "December 8"
      ],
      "correct": 2
    },
    {
      "question": "Where does Santa live?",
      "options": [
        "The South Pole",
        "New York City",
        "San Francisco",
        "The North Pole"
      ],
      "correct": 3
    },
    {
      "question": "What is not an alternative name for Santa Claus?",
      "options": [
        "Kris Kringle",
        "Saint Nicholas",
        "Joey Christmas",
        "Father Christmas"
      ],
      "correct": 2
    },
    {
      "question": "What usually goes on top of a Christmas tree?",
      "options": [
        "A Star",
        "A Tomato",
        "A Shoe",
        "A Flower"
      ],
      "correct": 0
    },
    {
      "question": "What plant do people kiss under?",
      "options": [
        "Fern",
        "Mistletoe",
        "Rose",
        "Eucalyptus"
      ],
      "correct": 1
    }
  ],
  "hanukkah": [
    {
      "question": "How many nights does Hanukkah last?",
      "options": [
        "Seven",
        "Five",
        "Eight",
        "Twelve"
      ],
      "correct": 2
    },
    {
      "question": "At what time of the day is the menorah lit?",
      "options": [
        "At Sunrise",
        "After Sunset",
        "At Noon",
        "At Midnight"
      ],
      "correct": 1
    },
    {
      "question": "What game is associated with Hanukkah?",
      "options": [
        "Baseball",
        "Hockey",
        "Poker",
        "Dreidel"
      ],
      "correct": 3
    },
    {
      "question": "What is the gift money given away during Hanukkah called?",
      "options": [
        "Gelt",
        "Marbles",
        "Coins",
        "Straws"
      ],
      "correct": 0
    },
    {
      "question": "What does Hanukkah mean in Hebrew?",
      "options": [
        "Together",
        "Lights",
        "Dedication",
        "Peace"
      ],
      "correct": 2
    }
  ],
  "kwanzaa": [
    {
      "question": "What are the three colors of Kwanzaa?",
      "options": [
        "Blue, Yellow, Green",
        "Orange, Red, Yellow",
        "Red, Black, Green",
        "Black, Orange, Yellow"
      ],
      "correct": 2
    },
    {
      "question": "What language is the word \"Kwanzaa\"?",
      "options": [
        "Finnish",
        "Swahili",
        "Italian",
        "Samoan"
      ],
      "correct": 1
    },
    {
      "question": "What is the Swahili word for \"Unity\"?",
      "options": [
        "Umoja",
        "Amani",
        "Furaha",
        "Sikukuu"
      ],
      "correct": 0
    },
    {
      "question": "What does the word \"kwanzaa\" mean?",
      "options": [
        "The Last",
        "The First",
        "The Fruit",
        "The Family"
      ],
      "correct": 1
    },
    {
      "question": "What day does Kwanzaa start?",
      "options": [
        "December 25",
        "December 16",
        "December 30",
        "December 26"
      ],
      "correct": 3
    }
  ],
  // NOTE: the category "all" has 3 options instead of 4.
  "all": [
    {
      "question": "What holiday does the Grinch steal?",
      "options": [
        "Christmas",
        "Kwanzaa",
        "Hanukkah"
      ],
      "correct": 0
    },
    {
      "question": "What holiday is the Festival of Lights?",
      "options": [
        "Christmas",
        "Kwanzaa",
        "Hanukkah"
      ],
      "correct": 2
    },
    {
      "question": "Elvis sings he is going to have a \"Blue ...\"",
      "options": [
        "Christmas",
        "Kwanzaa",
        "Hanukkah"
      ],
      "correct": 0
    },
    {
      "question": "What holiday enjoys deep-fried jelly donuts called sufganiyot?",
      "options": [
        "Christmas",
        "Kwanzaa",
        "Hanukkah"
      ],
      "correct": 2
    },
    {
      "question": "What holiday is cultural and not religious?",
      "options": [
        "Christmas",
        "Kwanzaa",
        "Hanukkah"
      ],
      "correct": 1
    }
  ]
};

let user_score = 0;
let questions_remaining = 20;
let score_stats = {
  "first_completed_category": null,
  // TODO: more stats go here... ER?
};

// A quick-and-dirty sleep function.
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Called on page ready, this function targets each category column on the page
// and fills it with a header and five questions.
function generate_game_grid() {
  
  for (let category of ["christmas", "hanukkah", "kwanzaa", "all"]) {

    // This is the column into which we will put our question buttons.
    let target_category = $("#column-" + category);

    let buttons = "";

    // To start, we add a non-clickable button which serves as a header.
    // Because our categories are lowercase, we'll capitalize the column title
    // here.
    let column_title = category.charAt(0).toUpperCase() + category.slice(1);
    buttons += `
      <div class="base-button">
        ${column_title}
      </div>
    `;

    // We add the next five elements in a similar manner, generating unique
    // IDs which will be used to load the content corresponding to the particular
    // button the user selects.
    for (let i = 0; i < 5; ++i) {

      let question_id = category + "-" + i.toString();
      buttons += `
        <div id="${question_id}" class="base-button click-button" onclick="generate_question_slide('${question_id}')">
          ${(i + 1) * 100}
        </div>
      `;
      
    }

    // Fill the target column with the header and the five questions.
    target_category.html(buttons);
    
  }
  
}

// Takes a string which contains the ID of a question in the game grid.
// Returns an HTML structure containing a formatted question slide.
function generate_question_slide(question_id) {

  // NOTE: question_id is in the form "holiday-number", where the holiday
  // corresponds to a column and the number [0-4] corresponds to the index of
  // the question within the JSON question array. We extract these parts by
  // splitting on the dash.
  let [category, question_num] = question_id.split("-");
  let question = questions[category][parseInt(question_num)];

  // Building the individual questions...
  let options = "";
  for (let i = 0; i < question["options"].length; ++i) {

    // NOTE: The answer_ids are superkeys of the question_ids and can be used by
    // the call to process_answer() to target the corresponding question button
    // (it will have to be disabled once the question has been answered). It can
    // also be used to target the selected answer, and can also be parsed and
    // combined with question data to target the correct answer button.
    let answer_id = question_id + "-" + i.toString();
    options += `
      <div id="${answer_id}" class="base-button click-button question-option" onclick="process_answer('${answer_id}')">
        ${question["options"][i]}
      </div>
    `;
  }

  // Building the overall slide and inserting the questions.
  let slide = `
    <div id="question-slide">
      <div class="base-button question-prompt">
        ${question["question"]}
      </div>
      ${options}
    </div>
  `;
  
  $("#question-slide-container").html(slide).fadeIn("slow");
  
}

async function process_answer(answer_id) {
  
  // grade_answer() assigns points based on correctness. If the answer is
  // correct, it displays a positive animation on the score to draw the user's
  // eye.
  grade_answer(answer_id);

  // reveal_answer() highlights the correct answer in green and an incorrect
  // answer in red; it also changes the size of the incorrect buttons to
  // emphasize the correct answer.
  reveal_answer(answer_id);

  // Give the user some time to view their results.
  await sleep(2000);

  remove_question(answer_id);

  // Close the question slide.
  kill_modal();

  if (questions_remaining < 1) {

    // TODO: Add an animation here, then redirect once it's done.
    await sleep(2000);
    
    scoreboard_redirect(score_stats);
    
  }

}

// Given the HTML id of the user-selected answer, determines whether the answer
// is correct and awards points.
function grade_answer(answer_id) {
  
  let [category, question_num, answer_num] = answer_id.split("-");
  let question = questions[category][parseInt(question_num)];
    
  let num_points = (parseInt(question_num) + 1) * 100;
  
  if (question["correct"] === parseInt(answer_num)) {
    user_score += num_points;
    $("#point-counter").html(user_score);
  }

  questions_remaining -= 1;
  
}

// Display answer details. The correct answer is shown in green; an incorrect
// answer is highlighted in red.
function reveal_answer(answer_id) {

  let delay_ms = 500;
  
  let [category, question_num, answer_num] = answer_id.split("-");
  let question = questions[category][parseInt(question_num)];
  let question_id = category + "-" + question_num;
  let correct_id = question_id + "-" + question["correct"].toString();

  // Convert all buttons to non-clickable first to convey to the user that
  // their action is complete.
  // NOTE: using removeAttr() to remove an inline HTML onclick is technically
  // not supported on Internet Explorer, but it's deprecated, so we don't care.
  $(".question-option").removeClass("click-button").removeAttr("onclick");

  // To make all incorrect questions smaller...
  $(".question-option").not("#" + correct_id).animate({
    "font-size": "1rem",
  }, delay_ms);
  
  $("#" + correct_id).animate({
      "color": "#0e0",
  }, delay_ms);  

  if (correct_id !== answer_id) {
    $("#" + answer_id).animate({
      "color": "#e00",
    }, delay_ms);
  }

}

// Marks the question that was just answered as complete by removing the point
// value and making it an unselectable button.
function remove_question(answer_id) {

  let [category, question_num, answer_num] = answer_id.split("-");
  let question_id = category + "-" + question_num;

  $("#" + question_id).removeClass("click-button")
                      .removeAttr("onclick")
  
}

// Clears the question slide from the screen.
function kill_modal() {
  $("#question-slide-container").fadeOut("slow");
}

// Given an object with statistics about the player's performance, generates
// a "player type" label, encodes that label into a URL for the scoreboard page,
// then redirects the user to that page to view their results.
function scoreboard_redirect(stats) {

  // TODO: replace rank field dummy value with actual statistic
  let scoreboard_url = `score.html?score=${user_score}&rank=${0}`;
  window.location.href = scoreboard_url;
  
}

$(document).ready(function() {
  generate_game_grid();
}

                  
                  // Snow by CB
  //Configure below to change URL path to the snow image
  var snowsrc="snow.gif"
  // Configure below to change number of snow to render
  var no = 10;
  // Configure whether snow should disappear after x seconds (0=never):
  var hidesnowtime = 0;
  // Configure how much snow should drop down before fading ("windowheight" or "pageheight")
  var snowdistance = "pageheight";

///////////Stop Config//////////////////////////////////

  var ie4up = (document.all) ? 1 : 0;
  var ns6up = (document.getElementById&&!document.all) ? 1 : 0;

  function iecompattest(){
  return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
  }

  var dx, xp, yp;    // coordinate and position variables
  var am, stx, sty;  // amplitude and step variables
  var i, doc_width = 800, doc_height = 600; 
  
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
  snowsrc=(snowsrc.indexOf("")!=-1)? "snow.gif" : snowsrc
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

  function snowIE_NS6() {  // IE and NS6 main animation function
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
