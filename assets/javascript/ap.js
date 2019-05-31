$(document).ready(function () {
    //Theme Music
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/images/themesong.mp3")

    // Theme Button
    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    });
    //I need to change these objects to arrays and objects inside arrays
    var trivia = {
        questions: {
            q1: "To get over Richard, what did Monica start making?",
            q2: "What was the name of the self help book that the girls loved?",
            q3: "What was wrong with the couch Ross returned to the store?",
            q4: "How many long-stemmed roses did Ross send to Emily?",
            q5: "What was Phoebe in charge of at Rachel's suprise party?",
            q6: "What was the name of Joey's stalker?",
            q7: "Which of the girls did Joey mistakenly see in the shower?",
            q8: "What is the name of the laundrette the girls use?",
            q9: "What was the first book Joey kept in the freezer?",
            q10: "What does Rachel tell Ross he should name the cat he was buying with Julie?",
        },
        choices: {
            q1: ["Marmalade", "Pancakes", "Jam", "Candy"],
            q2: ["Be Your Own Person", " Be Your Own Cleansing Pool", "Be Your Own Windkeeper", "Be Your Own Lightning Bearer"],
            q3: ["It had a stain", "The colour was wrong", "It was torn", "It was cut in half"],
            q4: ["100", "72", "52", "86"],
            q5: ["cups and ice", "balloons and ice", "cups and food", "ice and food"],
            q6: ["Denise", "Shannon", "Erika", "Tanya"],
            q7: ["Monica", "Phoebe", "Emily", "Rachel"],
            q8: ["Laundry Room", "Suds N Stuff", "Launderama", "Klean It"],
            q9: ["The Shinning", "Little Women", "Pride and Prejudice", "IT"],
            q10: ["Michael", "Paolo", "Mark", "Joshua"],
        },
        answers: {
            q1: "Jam",
            q2: "Be Your Own Windkeeper",
            q3: "It was cut in half",
            q4: "72",
            q5: "cups and ice",
            q6: "Erika",
            q7: "Monica",
            q8: "Launderama",
            q9: "The Shinning",
            q10: "Michael",
        },
        pictures: {
            q1: "../images/jam.jpg",
            q2: "../images/windkepper.jpg",
            q3: "../images/pivot.jpg",
            q4: "../images/emily.jpg",
            q5: "../images/cupandice.jpg",
            q6: "../images/stalker.jpg",
            q7: "../images/jm.jpg",
            q8: "../images/laundry.jpg",
            q9: "../images/shinning.jpg",
            q10: "../images/rossrach.jpg",
        },
    };
    var game = {
        pick: "",
        index: "",
        timer: 30,
        timerOn: false,
        timerId: "",
        usersGuesses: "",
        rightCount: 0,
        wrongCount: 0,
        unansweredCount: 0,
        questLeft: trivia.length,
        timeRemaining: 10,
        holder: [],
    };

    //This will hide the game until user presses start
    $("#reset").hide();
    //This is the start button page
    $("#start").on("click", trivia.startGame, function () {
        trivia.rightCount = 0;
        trivia.wrongCount = 0;
        trivia.unanswerCount = 0;
        clearInterval(game.timerId);
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < trivia.length; i++) {
            holder.push(trivia[i]);
        }
    })

    // function runTimer() {
    //     if (!game.timerOn) {
    //         game.timerId = setInterval(trivia.runTimer, 1000);
    //     }
    // }

    //Run timer
    function runTimer() {
        game.timerId = setInterval(function() {
            game.timeRemaining--;
            $("#timeleft").html("<h3>Time Remaining: " + game.timeRemaining + "</h3>");
            console.log(game.timeRemaining)
            if(game.timeRemaining === 0) {
                console.log("stop the timer");
                clearInterval(game.timerId);
                game.timeRemaining = 30;
                $("#timeleft").html("<h3>Time Remaining: " + game.timeRemaining + "</h3>");
            }
        }, 1000);
        // game.timer--;
        // if (timer === 0) {
        //     unanswerCount++;
        //     stop();
        //     $("#answerblock").html("<p>Time is up! The correct answer is: " + trivia.choices[trivia.answers] + "</p>");
        //     hidepicture();
        // }
    }
    function stop() {
        running = false;
        clearInterval(intervalID);
    }
    function displayQuestion() {
        index = Math.floor(Math.random() * trivia.length);
        game.pick = trivia[index];
    }
    $("#questionblock").html("<h2>" + trivia.questions.q1 + "</h2>")
    for (var i = 0; i < trivia.choices.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerChoice");
        userChoice.html(trivia.choices[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoices);
    }
    //Create jQuery elements that represent answers also give answers Id's
    //Add eventlistners to those elements based off Id's
    $(".answerchoice").on("click", function () {
        usersGuesses = parseInt($(this).attr("data-guessvalue"));

        if (usersGuesses === trivia.answers) {
            stop();
            correctCount++;
            usersGuesses++;
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
        } else {
            stop();
            wrongCount++;
            usersGuesses = "";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + trivia.choices[trivia.answers] + "</p>");
            hiddenpicture();
        }
    })

    function hiddenpicture() {
        $("#answerblock").append("<img src=" + trivia.pictures + ">");
        trivia.splice(index, 1);

        setTimeout(function () {
            $("#answerblock").empty();
            timer = 30;
            if ((wrongCount + rightCount + unansweredCount) === questLeft) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + rightCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#reset").show();
                rightCount = 0;
                wrongCount = 0;
                unansweredCount = 0;
            } else {
                runTimer();
                displayQuestion();
            }
        }, 3000);
    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            trivia.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
})



