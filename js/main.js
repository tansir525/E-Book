// Load data on click
const loadBooks = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  searchField.value = "";

  // Empty search and number input error check

  if (searchText === "") {
    alert("Please type the book name you are looking for");
    displaySpinner("none");
    displaySearchResult("none");
  } else {
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => displayAll(data.docs));
    displaySpinner("block");
    displaySearchResult("none");
  }

  fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then((response) => response.json())
    .then((data) => found(data));
};
// unexpected search Check & Total book

const found = (total) => {
  console.log(total);
  let count = document.getElementById("count");
  if (total.numFound === 0) {
    count.innerHTML = `No Results Found`;
  } else {
    count.innerHTML = `Total Books found: ${total.num_found}`;
  }
};

// display all information in a card

const displayAll = (bookDetails) => {
  const displayResult = document.getElementById("display-result");

  displayResult.textContent = "";

  bookDetails.forEach((book) => {
    const bookDetailDiv = document.createElement("div");
    bookDetailDiv.classList.add("col");
    bookDetailDiv.innerHTML = `
		     <div class="card h-100 ">
		<img class="card-img-top img-fluid h-50 w-75 mx-auto my-2 shadow-lg"
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
		            <div class="card-body">
		                <h3 class="card-title">${book.title}</h3>
                        <br>
                       <p><b>Author Name: </b>
                       ${book.author_name} </p>
                        
                        <p><b>Publication On: </b>
                        ${
                          book.first_publish_year
                            ? book.first_publish_year
                            : "Information Unavailable"
                        } 
                                                </p>
                        <p><b>Publisher Name: </b>
                        ${
                          book.publisher ? book.publisher : "No information"
                        }</p>
                        <p><b>Related Tags:</b> <br>
                        ${
                          book.subject
                            ? book.subject.slice(1, 5)
                            : "Nothing is related"
                        }</p>
		            </div>
		    `;
    displayResult.appendChild(bookDetailDiv);
  });
  displaySpinner("none");
  displaySearchResult("block");
};

// spinner function
const displaySpinner = (viewOnPage) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = viewOnPage;
};
const displaySearchResult = (viewOnPage) => {
  const spinner = document.getElementById("viewonpage");
  spinner.style.display = viewOnPage;
};
