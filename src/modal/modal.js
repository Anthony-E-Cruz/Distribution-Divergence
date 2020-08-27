var buttons = document.querySelectorAll('button');
var modal = document.querySelector('.modal');
var backdrop = document.querySelector('.backdrop');
var dowChart = document.querySelector('#dow-chart-container');

window.addEventListener('load', (event) => {
  document.body.style.overflow = 'hidden';
});

function closeModal() {
  modal.style.display = 'none';
  backdrop.style.display = 'none';
  document.body.style.overflow = '';
}

buttons[1].addEventListener('click', function () {
  modal.style.display = 'block';
  backdrop.style.display = 'block';
  document.body.style.overflow = 'hidden';
  // document.body.style.margin = '30px'
});

// buttons[2].addEventListener('click', function () {
//   dowChart.id = 'none';
//   // location.reload();
//   // backdrop.style.display = 'block';
//   // document.body.style.overflow = 'hidden';
//   dowChart.class = 'none';
//   backdrop.style.display = 'block';
//   document.body.style.overflow = 'hidden';
//   // document.body.style.margin = '30px'
// });

// buttons[3].addEventListener('click', function () {
//   modal.style.display = 'block';
//   backdrop.style.display = 'block';
//   document.body.style.overflow = 'hidden';
//   // document.body.style.margin = '30px'
// });

// backdrop.addEventListener('click', function () {
//   modal.style.display = 'block';
//   backdrop.style.display = 'block';
// });

buttons[0].addEventListener('click', function () {
  closeModal();
});