
var questions = [
  {question: "What was the first full length CGI movie?", choices: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"], 
          answer: 2, image:"assets/images/0.PNG"},
  {question: "Which of these is NOT a name of one of the Spice Girls?", choices: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"], 
          answer: 1, image:"assets/images/1.PNG"},
  {question: "Which NBA team won the most titles in the 90s?", choices: ["New York Knicks", "Portland Trailblazers", "Los angeles Lakers", "Chicago Bulls"], 
          answer: 3, image:"assets/images/2.PNG"}
];
  
    var number = 10;

    var intervalId;
    var questionCounter = 0;

    function run() {

      number = 10;

      intervalId = setInterval(decrement, 1000);

      $("#question0").show();
      $("#startBtn").hide();

      
 
        var j = questionCounter;
        var question = questions[j];
        // console.log("question: " + question.question);

        $("#question0").html("<h3>" + question.question + "</h3>");

        for(var i=0; i<question.choices.length; i++){
          var answerOption = $("<div>"); 
          answerOption.addClass("answerChoice");
          answerOption.text(question.choices[i]);
          answerOption.attr("data-index", i);
          $("#question0").append(answerOption);


        }

      $(".answerChoice").on("click", function(event) {
        var userSelect = $(this).data("index");
        // console.log($(this));
        console.log(userSelect);
        console.log("question.question.answer: " + question.answer);

        $("#question0").empty();

          if(userSelect == question.answer) {
              // user picks the correct answer
              // $("#question0").empty();
              correctAnswer++;

              // show "Correct!"
              var newDiv = $("<div>");
              newDiv.append("Correct!");
              $("#question0").append(newDiv);

              // show image
              showImage();
             
          } else {
              // user picks the incorrect answer
              incorrectAnswer++;

              // show "Nope" 
              var newDiv = $("<div>");
              newDiv.append("Nope!");
              $("#question0").append(newDiv);
              // show "The correct answer was: XXX"
              var newDiv2 = $("<div>");
              newDiv2.append("The Correct Answer was: " + question.choices[question.answer]);
              $("#question0").append(newDiv2);
              // show image
              showImage();
          }
          // go to next questoin
          // stop();
          // questionCounter++;
          // run();
      })

      // added the hover effect when user hover the answer
      $(".answerChoice").hover(function() {
        $(this).css("background-color", "red");
      }, function() {
        $(this).css("background-color", "");
      })

      function showImage() {
        var newImg = $("<img>");
        newImg.attr("src", question.image);
        $("#question0").append(newImg);

      }



    } // end of run()

    function decrement() {

      number--;

      $("#show-number").html("<h2> Time Remaining: " + number + " Seconds </h2>");

      if (number <= 0 ) {
        console.log("questionCounter: " + questionCounter);
        console.log("questions.length: " + questions.length);
        if( questionCounter < questions.length-1 ) {
          stop();
          questionCounter++;

          // show next question
          run();
          
        } else {
          // stop the game
          stop();
          // show the correct/incorrect/unswered answer counter
          hideQuestion();
          showAllDone();
        }
      }
    }

    function hideQuestion() {
      $("#question0").hide();
    }

    function hideAnswer() {
      $("#correctAnswer").hide();
      $("#incorrectAnswer").hide();
      $("#unanswer").hide();
    }

    function showAllDone() {

      $("#show-number").hide();

      // show All Done!
      $("#log").text("All Done!");
      $("#correctAnswer").show();
      $("#incorrectAnswer").show();
      $("#unanswer").show();
      $("#doneBtn").hide();

      var unanswer = 0;
      var correctAnswer = 0;
      var incorrectAnswer = 0;


      $("#correctAnswer").html("<span> Correct Answers: " + correctAnswer + "</span>");
      $("#incorrectAnswer").html("<span> Incorrect Answers: " + incorrectAnswer + "</span>");
      // $("#unanswer").html("<span> Unanswer: " + unanswer + "</span>");
      unanswer = questions.length - correctAnswer - incorrectAnswer;
      $("#unanswer").html("<span> Unanswer: " + unanswer + "</span>");
    }

    function start() {
      console.log("inside start()");

      hideAnswer();
      $("#doneBtn").hide();
      $("#startBtn").click(run);
      $("#doneBtn").click(stop);
    }

    function stop() {

      clearInterval(intervalId);

    }
    
    $(document).ready(function() {

    start();

  })