const textarea = document.getElementById('textInput');
const counter = document.getElementById('counter');
const maxLength = textarea.getAttribute('maxlength');

textarea.addEventListener('input', () => {
  const remaining = maxLength - textarea.value.length;
  counter.textContent = `Characters left: ${remaining}`;

  if (remaining > 50) {
    counter.style.color = 'green';
  } else if (remaining > 20) {
    counter.style.color = 'orange';
  } else {
    counter.style.color = 'red';
  }
});