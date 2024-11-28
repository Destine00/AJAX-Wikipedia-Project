const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

formDOM = document.querySelector(".form");
inputDOM = document.querySelector(".form-input");
resultDOM = document.querySelector(".results");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputDOM.value.trim();
  if (!value) {
    resultDOM.innerHTML = `<div class='error'>please enter a valid search term</div>`;
    return;
  }
  fetchPages(value);
  inputDOM.value = "";
});

const fetchPages = async (searchValue) => {
  resultDOM.innerHTML = `<div class='loading'></div>`;
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const pages = data.query.search;
    if (pages.length === 0) {
      resultDOM.innerHTML = `<div class='error'>there is no page that matched your search, please try again.</div>`;
      return;
    }

    displayPages(pages);
  } catch (error) {
    resultDOM.innerHTML = `<div class='error'>there was an error</div>`;
  }
};

const displayPages = (pages) => {
  resultDOM.innerHTML = pages.map((page) => {
    console.log(page);
    const { snippet, title, pageid } = page;

    return `<div class="articles">
          <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
             ${snippet}
            </p>
          </a>
        </div>`;
  });
};
