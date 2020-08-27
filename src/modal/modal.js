var buttons = document.querySelectorAll('button');
var modal = document.querySelector('.modal');
var backdrop = document.querySelector('.backdrop');
var dowChart = document.querySelector('.dow-chart-container');
var wealthChart = document.querySelector('.chart-container');

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