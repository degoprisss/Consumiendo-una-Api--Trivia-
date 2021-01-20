function getCategory() {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => printCategory(data));
}

function printButton() {
  let buttonResp = document.getElementById('dButton')
  buttonResp.innerHTML = '';
  buttonResp.innerHTML += `
                          <button type="button" class="btn btn-primary d-block" id="dButton" onclick="getAnswersQuestion()">Enivar respuestas</button>
                          `
}

function getValues() {
  const numQuestions = document.getElementById("numQuestion").value;
  const idCategory = document.getElementById("numCategory").value;
  const getDifiiculty = document.getElementById("Difiiculty").value;
  const getType = document.getElementById("typeQuestion").value;
  fetch(
    `https://opentdb.com/api.php?amount=${numQuestions}&category=${idCategory}&difficulty=${getDifiiculty}&type=${getType}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (getType === "boolean") {
        toPrintSegundo(data);
      } else {
        toPrint(data);
      }
    });
}

function toPrint(data) {
  saveQuestion = [];
  printResult = document.getElementById('resulQuestion');
  printResult.innerHTML = [];
  data.results.forEach((element) => {
    saveQuestion.push(element.incorrect_answers);
  });

  let saveQuestionCorrect = [];
  data.results.forEach((element) => {
    saveQuestionCorrect.push(element.correct_answer);
  });

  saveQuestion.forEach((element, index) => {
    saveQuestion[index].push(saveQuestionCorrect[index]);
  });

   lista = [0, 1, 2, 3];
  lista = lista.sort(function () {
    return Math.random() - 0.5;
  });
  num = lista[0];
  num2 = lista[1];
  num3 = lista[2];
  num4 = lista[3];
  

  let getQuestionhtml = document.getElementById("printQuestion");
  getQuestionhtml.innerHTML = ''; 
  data.results.forEach((element, index) => {
    getQuestionhtml.innerHTML += `
                                   <div class="col-sm-6 mt-4">
                                     <div class="card h-100">
                                       <div class="card-body">
                                         <p class="card-text">${element.question}</p> 
                                         <form action="/action_page.php name="gender" class='formQuestion' id='formAnswers'">
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num]}">
                                         <label for="male">${saveQuestion[index][num]}</label><br>
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num2]}">
                                         <label for="male">${saveQuestion[index][num2]}</label><br>
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num3]}">
                                         <label for="male">${saveQuestion[index][num3]}</label><br>
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num4]}">
                                         <label for="male">${saveQuestion[index][num4]}</label><br>
                                         
                                         </form>                                                                                                                                                                          
                                       </div>                                
                                     </div>
                                   `;
  });
printButton();

  
}


function toPrintSegundo(data) {
  saveQuestion = [];  
  printResult = document.getElementById('resulQuestion');
  printResult.innerHTML = [];
  data.results.forEach((element) => {
    saveQuestion.push(element.incorrect_answers);
  });

  let saveQuestionCorrect = [];
  data.results.forEach((element) => {
    saveQuestionCorrect.push(element.correct_answer);
  });

  saveQuestion.forEach((element, index) => {
    saveQuestion[index].push(saveQuestionCorrect[index]);
  });

  var lista = [0, 1];
  lista = lista.sort(function () {
    return Math.random() - 0.5;
  });
  num = lista[0];
  num2 = lista[1];
  

  let getQuestionhtml = document.getElementById("printQuestion");
  getQuestionhtml.innerHTML = '';
  data.results.forEach((element, index) => {
    getQuestionhtml.innerHTML += `
                                   <div class="col-sm-6 mt-4">
                                     <div class="card h-100">
                                       <div class="card-body">
                                         <p class="card-text">${element.question}</p> 
                                         <form action="/action_page.php id='formAnswers">
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num]}">
                                         <label for="male">${saveQuestion[index][num]}</label><br>
                                         <input type="radio" id="male" name="gender" value="${saveQuestion[index][num2]}">
                                         <label for="male">${saveQuestion[index][num2]}</label><br>
                                         </form>                                                                                                                                    
                                       </div>
                                     </div>
                                   `;
  });
  printButton();
  
}
function comparisonOptionMultiple(data){
  saveQuestionCorrect = [];
  resul = 0;
  let printResult = document.getElementById('resulQuestion');
  printResult.innerHTML = '';
  for (let index = 0; index < saveQuestion.length; index++) {
    if (data[index] === saveQuestion[index][3]) {
      saveQuestionCorrect.push(saveQuestion[index][3])
    } 
 }
}

function comparisonOptionFalseTrue(data){
  saveQuestionCorrect = [];
  resul = 0;
  let printResult = document.getElementById('resulQuestion');
  printResult.innerHTML = '';
  for (let index = 0; index < saveQuestion.length; index++) {
    if (data[index] === saveQuestion[index][1]) {
      saveQuestionCorrect.push(saveQuestion[index][1])
    } 
 }

}

function comparison(data){
  const getType = document.getElementById("typeQuestion").value;
  if (getType === 'multiple') {
    comparisonOptionMultiple(data);
  }else{
    comparisonOptionFalseTrue(data);
  }
  
  resul = (10/saveQuestion.length)*saveQuestionCorrect.length;
  

  if (resul >= 6) {
    printResult.innerHTML += `<div class="card">
    <div class="card-body">
      <h5 class="card-title text-center">🥳🥳!!!FELICIDADES!!!🥳🥳</h5>
      <p class="card-text text-center">Usted gano el examen con un resultado de: ${resul}</p>
      
    </div>
  </div>`
  
  }else{
    printResult.innerHTML += `<div class="card h-100 mt-4">
    <div class="card-body">
      <h5 class="card-title text-center">🙁!!!LO SENTIMOS!!!🙁</h5>
      <p class="card-text text-center">Usted no paso el examen. Su resultado es: ${resul}</p>
    </div>
  </div>`
  
  }
} 

function getAnswersQuestion() {
  let saveCorrect = [];
  let marcada = document.querySelectorAll('#male'); 
  for (let index = 0; index < marcada.length; index++) {
    if (marcada[index].checked) {
      let valor = marcada[index].value; 
      saveCorrect.push(valor); 
    }
  }
  if (saveCorrect.length === saveQuestion.length) {
    comparison(saveCorrect);
  }else{
    alert('Le faltan preguntas por responder.')
  }
  
}


function printCategory(data) {
  const getCategoryHmtl = document.getElementById("numCategory");
  data.trivia_categories.forEach(
    (element) =>
      (getCategoryHmtl.innerHTML += `<option value="${element.id}">${element.name}</option>`)
  );
}

getCategory();
