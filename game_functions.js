/*
Adam Rilatt, Erin Sinatra, Cole Byerly, Luca Cammarota
22 November 2023
PDM Final Project -- Holiday Jeopardy Game Page
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
  ],
  // Final Jeopardy
  // NOTE: This isx structured the same as actual categories for convenience
  "final": [
    {
      "question": "What holiday uses the phrase \"Habari Gani\" on the first day?",
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
// TODO: format the output of this HTML in the CSS stylesheet
function generate_question_slide(question_id) {

  // NOTE: question_id is in the form "holiday-number", where the holiday
  // corresponds to a column and the number [0-4] corresponds to the index of
  // the question within the JSON question array. We extract these parts by
  // splitting on the dash.
  let category = question_id.substring(0, question_id.indexOf("-"));
  let question_num = parseInt(question_id.substring(question_id.indexOf("-") + 1));
  let question = questions[category][question_num];

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
  
  $("#question-slide-container").html(slide).show();
  
}

//function process_answer(answer_id) {
//  
//  let 
//  
//  if (grade_answer()) {
//    reveal_answer();
//  }
//  
//}

// Takes an index of a question answer, checks whether it's correct, and awards
// the correct number of points based on the index of the question.
// TODO: pipe results into a function that updates display values. This can be 
// done by wrapping grade_answer() and reveal_answer() in a process_answer()
// function
function grade_answer(category, question_index, answer_index) {
  
  questions_remaining -= 1;
  
  let question = questions[category][question_index];
  let num_points = (question_index + 1) * 100;
  
  if (question["correct"] === answer_index) {
    user_score += num_points;
  }
  
}

// Takes the index of the correct answer option and the index of the user's
// answer selection. The correct answer is shown in green; an incorrect answer
// is highlighted in red; the score is updated; and the corresponding question
// in the game grid is blanked out / made unselectable.
// TODO: implement with jQuery
function reveal_answer(category, question_index, answer_index) {
  
  // TODO: combination of category and question_index can be used to uniquely
  // target the game grid button corresponding to this question-- is it worth
  // passing a jQuery reference to the game grid button instead?
  
  // TODO: All question slides will have the same ID so the slide element can
  // be easily targeted; then the potential answer selections can also be
  // targeted. Is it better to pass a jQuery reference to the slide, a reference
  // to the correct answer, and a reference to the selected answer?
  
}

$(document).ready(function() {
  generate_game_grid();  
});
