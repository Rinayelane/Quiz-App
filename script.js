const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".button .quit");
const continue_btn = info_box.querySelector(".button .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer_sec");
const timeline = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector(".timer .timer_text")

start_btn.addEventListener("click", () => {
  info_box.classList.add("activeInfo");
});

exit_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
});

continue_btn.addEventListener("click", () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerline(0);
});

let que_count = 0;
let que_numb = 1;
let counter;
let counterline;
let timeValue = 15;
let widthvalue = 0;
let userScore = 0;
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quiz");

restart_quiz.addEventListener("click", () => {
    window.location.reload();
});

next_btn.addEventListener("click", () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterline);
    startTimerline(widthvalue);
  } else {
    showResultBox();
  }
});
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag =
    `<span>` +
    questions[index].numb +
    " " +
    questions[index].question +
    `</span>`;
  let option_tag =
    ' <div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option_list.children[i].setAttribute("onclick", "optionSelected(this)");
  }
}

quit_quiz.addEventListener("click", () => {
  window.location.reload();
});


let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon =
  '<div class="icon cross"><i class="fa-regular fa-circle-xmark"></i></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterline);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let alloptions = option_list.children.length;
  if (correctAns == userAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Wrong");
    answer.insertAdjacentHTML("beforeend", crossicon);
  }

  for (let i = 0; i < alloptions; i++) {
    if (option_list.children[i].textContent == correctAns) {
      option_list.children[i].setAttribute("class", "option correct disable");
      option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
    }
  }
  for (let i = 0; i < alloptions; i++) {
    option_list.children[i].classList.add("disable");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>and congrats!, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>        ";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>and nice, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>        ";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>        ";
    scoreText.innerHTML = scoreTag;
  }
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off"
      let correctAns = questions[que_count].answer;
      let alloptions = option_list.children.length;

      for (let i = 0; i < alloptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute(
            "class",
            "option correct"
          );
          option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
        }
      }
      for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disable");
      }
      next_btn.style.display = "block";
    }
  }
}

function startTimerline(time) {
  counterline = setInterval(timer, 30);
  function timer() {
    time += 1;
    timeline.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterline);
    }
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>Question</span>";
  bottom_ques_counter.innerHTML = totalQuesCountag;
}
