let time = 60;
let warnings = 0;
let timerInterval;

function startExam() {

    let name = document.getElementById("studentName").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    document.getElementById("login").style.display = "none";
    document.getElementById("exam").style.display = "block";

    document.getElementById("nameDisplay").innerText = name;

    startCamera();
    startTimer();

    // Detect when student leaves the exam tab
    document.addEventListener("visibilitychange", detectTabChange);
}


function startCamera() {

    navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(function(stream) {

        document.getElementById("camera").srcObject = stream;

    })
    .catch(function() {

        alert("Camera permission is required for exam monitoring.");

    });
}


function startTimer() {

    timerInterval = setInterval(function() {

        time--;

        document.getElementById("timer").innerText = time;

        if (time <= 0) {

            clearInterval(timerInterval);

            alert("Time is over!");

            submitExam();
        }

    }, 1000);
}


function detectTabChange() {

    if (document.hidden) {

        warnings++;

        document.getElementById("warning").innerText =
            "Warnings: " + warnings;

        alert("Warning! Please stay on the exam page.");

    }
}


function submitExam() {

    clearInterval(timerInterval);

    let score = 0;

    let q1 = document.querySelector(
        'input[name="q1"]:checked'
    );

    let q2 = document.querySelector(
        'input[name="q2"]:checked'
    );

    if (q1 && q1.value === "HTML") {
        score++;
    }

    if (q2 && q2.value === "Artificial Intelligence") {
        score++;
    }

    document.getElementById("exam").style.display = "none";

    document.getElementById("result").style.display = "block";

    document.getElementById("score").innerText =
        "Your Score: " + score + " / 2";
}
