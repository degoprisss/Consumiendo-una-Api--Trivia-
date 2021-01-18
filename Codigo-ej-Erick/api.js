function getCategories() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then((response) => response.json())
        .then((data) => printCategories(data.trivia_categories))
}

function getQuestions() {
    const totalQuestions = document.getElementById('total-questions').value;
    const category = document.getElementById('select-category').value;
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}`)
        .then((response) => response.json())
        .then((data) => printData(data))
}

function printData(data) {
    let container = document.getElementById('questions-container');

    data.results.forEach((element) => {
        container.innerHTML += `<div class="col-md-4">
                                    <div class="card">
                                        <div class="card-body">
                                            ${element.question}
                                        </div>
                                    </div>
                                </div>`;
    });
}

function printCategories(categories) {
    const categoriesContainer = document.getElementById('select-category');
    categories.forEach((category) => {
        categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}

getCategories();