const lessons = {
  lesson1: [
    {
      type: "mcq",
      question: "What does 'Hallo' mean?",
      options: ["Hello", "Goodbye", "Please", "Thank you"],
      answer: "Hello"
    },
    {
      type: "fill",
      question: "Translate 'Good morning' to German",
      answer: "Guten Morgen"
    },
    {
      type: "mcq",
      question: "What is the German word for 'Thank you'?",
      options: ["Bitte", "Danke", "Hallo", "Tschüss"],
      answer: "Danke"
    },
    {
      type: "fill",
      question: "Translate 'Yes' to German",
      answer: "Ja"
    },
    {
      type: "mcq",
      question: "What does 'Tschüss' mean?",
      options: ["Goodbye", "Hello", "Please", "Good night"],
      answer: "Goodbye"
    },
    {
      type: "fill",
      question: "Translate 'No' to German",
      answer: "Nein"
    },
    {
      type: "mcq",
      question: "What is the German word for 'Please'?",
      options: ["Danke", "Bitte", "Hallo", "Nein"],
      answer: "Bitte"
    },
    {
      type: "fill",
      question: "Translate 'My name is' to German",
      answer: "Ich heiße"
    },
    {
      type: "mcq",
      question: "What does 'Guten Abend' mean?",
      options: ["Good evening", "Good morning", "Goodbye", "Hello"],
      answer: "Good evening"
    },
    {
      type: "fill",
      question: "Translate 'Good night' to German",
      answer: "Gute Nacht"
    }
  ],
  lesson2: [
    {
      type: "mcq",
      question: "What does 'Freund' mean?",
      options: ["Friend", "Family", "School", "Book"],
      answer: "Friend"
    },
    {
      type: "fill",
      question: "Translate 'Family' to German",
      answer: "Familie"
    },
    {
      type: "mcq",
      question: "What is the German word for 'School'?",
      options: ["Schule", "Stuhl", "Tisch", "Auto"],
      answer: "Schule"
    },
    {
      type: "fill",
      question: "Translate 'Where are you from?' to German",
      answer: "Woher kommst du?"
    },
    {
      type: "mcq",
      question: "What does 'Ich verstehe nicht' mean?",
      options: ["I don't understand", "I am hungry", "I am tired", "I am happy"],
      answer: "I don't understand"
    },
    {
      type: "fill",
      question: "Translate 'How old are you?' to German",
      answer: "Wie alt bist du?"
    },
    {
      type: "mcq",
      question: "What is the German word for 'Book'?",
      options: ["Buch", "Haus", "Auto", "Stuhl"],
      answer: "Buch"
    },
    {
      type: "fill",
      question: "Translate 'I live in Berlin' to German",
      answer: "Ich wohne in Berlin"
    },
    {
      type: "mcq",
      question: "What does 'Guten Tag' mean?",
      options: ["Good day", "Good night", "Goodbye", "Good morning"],
      answer: "Good day"
    },
    {
      type: "fill",
      question: "Translate 'See you tomorrow' to German",
      answer: "Bis morgen"
    }
  ]
};

let currentLesson = "lesson1";
let currentIndex = 0;
let completedLessons = { lesson1: false, lesson2: false };

function loadLesson(lessonKey) {
  if (lessonKey === "lesson2" && !completedLessons.lesson1) return;

  currentLesson = lessonKey;
  currentIndex = 0;
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tab-btn[onclick="loadLesson('${lessonKey}')"]`).classList.add("active");
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById("lessonContainer");
  container.innerHTML = "";

  const lesson = lessons[currentLesson];
  if (currentIndex >= lesson.length) {
    container.innerHTML = "<h3>🎉 Lesson Completed!</h3>";
    completedLessons[currentLesson] = true;

    if (currentLesson === "lesson1") {
      const btn2 = document.getElementById("lesson2-btn");
      btn2.disabled = false;
      btn2.classList.remove("locked");
    }
    return;
  }

  const q = lesson[currentIndex];

  const question = document.createElement("p");
  question.textContent = q.question;
  container.appendChild(question);

  if (q.type === "mcq") {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "option-btn";
      btn.onclick = () => handleAnswer(opt === q.answer, q.answer, btn);
      container.appendChild(btn);
    });
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Check";
    checkBtn.className = "check-btn";
    checkBtn.onclick = () => handleAnswer(
      input.value.trim().toLowerCase() === q.answer.toLowerCase(),
      q.answer,
      input
    );
    container.appendChild(input);
    container.appendChild(checkBtn);
  }

  container.appendChild(document.createElement("br"));
}

function handleAnswer(isCorrect, correctAnswer, element) {
  if (isCorrect) {
    element.classList.add("correct");
    confetti();
    setTimeout(() => {
      currentIndex++;
      renderQuestion();
    }, 800);
  } else {
    element.classList.add("incorrect");
    alert("❌ Correct answer: " + correctAnswer);
    setTimeout(() => {
      currentIndex++;
      renderQuestion();
    }, 800);
  }
}

window.onload = () => loadLesson("lesson1");
