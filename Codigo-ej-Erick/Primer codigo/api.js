function getQuestions() {
    fetch('https://opentdb.com/api.php?amount=20')
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
                                </div>`
    });
}