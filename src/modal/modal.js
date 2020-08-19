var buttons = document.querySelectorAll('button');
var modal = document.querySelector('.modal');
var backdrop = document.querySelector('.backdrop');

var quote = 'dataViz is a';

function closeModal() {
  modal.style.display = 'none';
  backdrop.style.display = 'none';
}

buttons[1].addEventListener('click', function () {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
});

buttons[0].addEventListener('click', function () {
  closeModal();
});