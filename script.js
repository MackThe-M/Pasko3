const registerBtn = document.getElementById('registerBtn');
const usernameInput = document.getElementById('username');
const registrationDiv = document.getElementById('registration');
const selectionDiv = document.getElementById('selection');
const boxesContainer = document.getElementById('boxesContainer');
const resetBtn = document.getElementById('resetBtn');

// Hardcoded list of names for the boxes
const boxNames = ['NELMA', 'BATIT', 'JAMES', 'ALLAN', 'BAIN', 'INDA', 'DADDY NI ARS', 'DADDY NI KIM', 'NANO', 'KING', 'ATE KIM', 'KODY', 'BONGS', 'TE GISANE', 'TRESWIN', 'TE BADI'];

// Store participants and their selected box
let participants = [];
let selectedBoxes = [];

// Handle registration
registerBtn.addEventListener('click', function() {
  const username = usernameInput.value.trim();
  if (username && !participants.find(p => p.username === username)) {
    const userId = generateUserId();
    participants.push({ username, userId, selected: null });
    alert(`Registration successful! Your ID: ${userId}`);
    registrationDiv.style.display = 'none';
    selectionDiv.style.display = 'block';
    generateBoxes();
  } else {
    alert('Username is required or already registered.');
  }
});

// Generate a unique user ID
function generateUserId() {
  return 'ID' + Math.floor(Math.random() * 1000);
}

// Generate boxes and display them
function generateBoxes() {
  // Shuffle the box names to randomize their order
  const shuffledNames = [...boxNames].sort(() => Math.random() - 0.5);

  shuffledNames.forEach((name, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute('data-name', name); // Store the name in a data attribute
    box.innerHTML = `<div class="name">${name}</div>`; // Hide the name initially
    box.addEventListener('click', () => selectBox(name, box));
    boxesContainer.appendChild(box);
  });
}

// Select a box
function selectBox(name, boxElement) {
  const user = participants.find(p => !p.selected);
  if (!user) {
    alert('All participants have selected a box.');
    return;
  }

  // If the box is already selected, do nothing
  if (selectedBoxes.includes(name)) {
    alert('This box has already been selected.');
    return;
  }

  // Mark the box as selected
  user.selected = name;
  selectedBoxes.push(name);
  boxElement.classList.add('selected');

  // Reveal the name inside the box
  const nameDiv = boxElement.querySelector('.name');
  nameDiv.style.visibility = 'visible'; // Make the name visible

  // Disable further selection for the user
  alert(`${user.username}, you selected box: ${name}`);
}

// Reset the selection (only accessible by the host)
resetBtn.addEventListener('click', function() {
  if (confirm('Are you sure you want to reset? All selections will be cleared.')) {
    participants = [];
    selectedBoxes = [];
    boxesContainer.innerHTML = '';
    registrationDiv.style.display = 'block';
    selectionDiv.style.display = 'none';
  }
});
