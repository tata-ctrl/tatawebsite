const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function() {
nav.classList.toggle('slide');
});
const quizData = [
    {
        question: "Apa ibukota Indonesia?",
        choices: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
        correctAnswer: 0
    },
    {
        question: "Berapa jumlah provinsi di Indonesia?",
        choices: ["30", "32", "34", "36"],
        correctAnswer: 2
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        choices: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
        correctAnswer: 0
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    const currentQuiz = quizData[currentQuestion];

    questionEl.textContent = currentQuiz.question;
    choicesEl.innerHTML = "";

    currentQuiz.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => selectChoice(index);
        choicesEl.appendChild(button);
    });
}

function selectChoice(index) {
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(button => button.classList.remove("selected"));
    buttons[index].classList.add("selected");
}

function checkAnswer() {
    const selectedButton = document.querySelector("#choices button.selected");
    if (!selectedButton) {
        alert("Silakan pilih jawaban terlebih dahulu!");
        return;
    }

    const selectedAnswer = Array.from(document.querySelectorAll("#choices button")).indexOf(selectedButton);
    const currentQuiz = quizData[currentQuestion];

    const resultEl = document.getElementById("result");
    if (selectedAnswer === currentQuiz.correctAnswer) {
        resultEl.textContent = "Benar!";
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = "Salah. Jawaban yang benar adalah: " + currentQuiz.choices[currentQuiz.correctAnswer];
        resultEl.style.color = "red";
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            loadQuestion();
            resultEl.textContent = "";
        }, 2000);
    } else {
        setTimeout(() => {
            questionEl.textContent = "Quiz selesai!";
            choicesEl.innerHTML = "";
            resultEl.textContent = "";
        }, 2000);
    }
}

// Load the first question when the page loads
window.onload = loadQuestion;