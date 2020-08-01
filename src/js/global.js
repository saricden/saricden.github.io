var searchDiv = document.querySelector('.searchbox');
var searchInput = document.querySelector('.searchbox input');
var joinCommunityBtns = document.querySelectorAll('.join-btn');
var openHavenModal = document.querySelector('.modal.open-haven');
var closeOHMBtn = document.querySelector('.close-ohm');

var focusSearch = function() {
  searchInput.focus();
};

var addFocusClass = function() {
  searchDiv.classList.add('active');
}

var removeFocusClass = function() {
  searchDiv.classList.remove('active');
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

joinCommunityBtns.forEach(function (btn) {
  btn.addEventListener('click', openOHModal);
});
closeOHMBtn.addEventListener('click', closeOHModal); 
searchDiv.addEventListener('click', focusSearch);
searchInput.addEventListener('focus', addFocusClass);
searchInput.addEventListener('blur', removeFocusClass);