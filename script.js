
fetch("db.json").then((res) => {
    return res.json();
}).then((val) =>{
  const questions = val;
  const container = document.querySelector(".container");
  let quesId = 1;
  questions.forEach((question) => {
    const quesContainer = document.createElement("p");
    const div = document.createElement("div");
    div.classList = "optionContainer";
    quesContainer.classList = "question";
    quesContainer.id = "ques" + quesId;
    quesContainer.textContent = question.disc;

    container.append(quesContainer);
    quesContainer.append(div);

    quesId++;
  });

  const optionContainer = document.getElementsByClassName("optionContainer");
  let idx = 0;
  for (let ques of optionContainer) {
    questions[idx].options.forEach((option) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = idx;
      const op = document.createElement("label");
      op.textContent = option;
      ques.append(op);
      op.append(input);
    });

    idx++;
  }

  const btn = document.createElement("button");
  btn.textContent = "Submit";
  container.append(btn);

  btn.addEventListener("click", (e) => {
    let count = 0;
    let currQues = 0;
    for (let optionDiv of optionContainer) {
      let myAns = -1;
      let correctAns = questions[currQues].ans;
      const inputs = optionDiv.querySelectorAll("input");

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) myAns = i + 1;
      }
      if (myAns == correctAns) count++;
      currQues++;
    }
    console.log(count);
    const result = document.createElement("p");
    result.textContent = "Your score is " + count;
    container.append(result);
    e.target.disabled = true;
  });

});

