var searchDiv = document.querySelector('.searchbox');
var searchInput = document.querySelector('.searchbox input');
var joinCommunityBtns = document.querySelectorAll('.join-btn');
var openHavenModal = document.querySelector('.modal.open-haven');
var closeOHMBtn = document.querySelector('.close-ohm');
var searchResults = document.querySelector('.search-results');
var searchResultsList = document.getElementById('search-results-list');
var searchResultsLabel = document.getElementById('search-results-label');
var searchData = JSON.parse(document.getElementById('search-data').textContent);

var focusSearch = function() {
  searchInput.focus();
};

var addFocusClass = function() {
  searchDiv.classList.add('active');
  searchResults.classList.add('active');
}

var removeFocusClass = function() {
  searchDiv.classList.remove('active');
  searchResults.classList.remove('active');
}

var openOHModal = function(e) {
  e.preventDefault();
  openHavenModal.classList.add('open');
  document.body.classList.add('noscroll');
}

var closeOHModal = function(e) {
  e.preventDefault();
  openHavenModal.classList.remove('open');
  document.body.classList.remove('noscroll');
}

var updateSearchResults = function(e) {
  var q = e.target.value.toLowerCase();
  if (q.trim() !== '') {
    searchResultsLabel.style.display = "none";
    searchResultsList.style.display = "block";
    searchResultsList.innerHTML = "";

    for (let i in searchData) {
      var searchItem = searchData[i];
      if (searchItem.title.toLowerCase().includes(q) || searchItem.snippet.toLowerCase().includes(q)) {
        var searchLink = document.createElement('a');
        var searchContent = document.createTextNode(searchItem.title);

        searchLink.setAttribute('href', searchItem.href);
        searchLink.appendChild(searchContent);
        searchResultsList.appendChild(searchLink);
      }
    }
  }
  else {
    searchResultsLabel.style.display = "block";
    searchResultsList.style.display = "none";
  }

}

joinCommunityBtns.forEach(function (btn) {
  btn.addEventListener('click', openOHModal);
});
closeOHMBtn.addEventListener('click', closeOHModal); 
searchDiv.addEventListener('click', focusSearch);
searchInput.addEventListener('focus', addFocusClass);
searchInput.addEventListener('keyup', updateSearchResults);
searchInput.addEventListener('blur', removeFocusClass);