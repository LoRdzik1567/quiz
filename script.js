document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM w pełni załadowany i przetworzony");

    let countdownTimer; // przechowanie licznika odliczania

    // Funkcja rozpoczynająca quiz
    function startQuiz() {
        document.getElementById('startQuizButton').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
		document.getElementById('timer-container').style.display = 'block'; // Pokaż licznik czasu

        // Ustawienie czasu na 90 minut
        let timeRemaining = 5400;
        displayTimeRemaining(timeRemaining);

        // Rozpoczęcie odliczania
        countdownTimer = setInterval(function() {
            timeRemaining--;
            displayTimeRemaining(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(countdownTimer);
                finishQuiz(); // Zakończenie quizu po upływie czasu
            }
        }, 1000);
    }

    // Wyświetlanie ile pozostało nam czasu
    function displayTimeRemaining(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        document.getElementById('timer').textContent = `${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
    }

    // format w jakim będzie nam wyświetlał się czas
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    //zakończenie quizu i sprawdzanie odpowiedzi
   function finishQuiz() {
    clearInterval(countdownTimer); // Zatrzymanie odliczania

    const questions = document.querySelectorAll('.question');
    let score = 0;
    let totalQuestions = questions.length;

    questions.forEach(function(question) {
        const correctAnswers = question.querySelectorAll('input[type="radio"][data-correct="true"]');
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');

        console.log('Correct answers:', correctAnswers);
        console.log('Selected answer:', selectedAnswer);

        if (selectedAnswer) {
            // Usunięcie poprzednich podświetleń
            question.querySelectorAll('input[type="radio"]').forEach(function(answer) {
                answer.parentElement.classList.remove('correct', 'incorrect');
            });

            // poprawność odpowiedzi
            let isCorrect = false;
            correctAnswers.forEach(function(correctAnswer) {
                if (selectedAnswer === correctAnswer) {
                    isCorrect = true;
                }
            });

            if (isCorrect) {
                console.log('Poprawna odpowiedź.');
                score++;
                selectedAnswer.parentElement.classList.add('correct');
            } else {
                console.log('Niepoprawna odpowiedź.');
                selectedAnswer.parentElement.classList.add('incorrect');
                correctAnswers.forEach(function(correctAnswer) {
                    correctAnswer.parentElement.classList.add('correct');
                });
            }
        } else {
            // jeżeli brak wybranej odpowiedzi
            question.querySelectorAll('input[type="radio"]').forEach(function(answer) {
                answer.parentElement.classList.add('incorrect');
            });
        }
    });

    let percentage = (score / totalQuestions) * 100;
    document.getElementById('score').innerText = `Poprawne odpowiedzi: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)`;
    document.getElementById('result').style.display = 'block';
}

    // przycisk "Rozpocznij test na żeglarza jachtowego"
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);

    // przycisk "Zakończ Quiz"
    document.getElementById('finishQuizButton').addEventListener('click', function() {
        finishQuiz(); // Wywołujemy funkcję finishQuiz() po kliknięciu przycisku "Zakończ Quiz"
    });

});
