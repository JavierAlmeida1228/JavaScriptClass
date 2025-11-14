document.addEventListener('DOMContentLoaded', () => {
  // === Toggle panel ===
  const toggle = document.querySelector('#options-toggle');
  const sides = document.querySelector('.sides');
  toggle.addEventListener('click', () => {
    sides.classList.toggle('hidden');
  });

  // === Fill inputs ===
  document.querySelectorAll('.fill').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize input and output to current player fill
    if (i === 0) {
      input.value = player1.fill;
      output.textContent = player1.fill;
    }
    if (i === 1) {
      input.value = player2.fill;
      output.textContent = player2.fill;
    }

    // Event listener for changes
    input.addEventListener('input', (e) => {
      const color = e.target.value;
      output.textContent = color;
      if (i === 0) { player1.fill = color; pad1.fill = color; }
      if (i === 1) { player2.fill = color; pad2.fill = color; }
    });
  });

  // === Stroke inputs ===
  document.querySelectorAll('.stroke').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize stroke values if needed
    if (i === 0) {
      input.value = player1.stroke;
      output.textContent = player1.stroke;
    }
    if (i === 1) {
      input.value = player2.stroke;
      output.textContent = player2.stroke;
    }

    input.addEventListener('input', (e) => {
      const color = e.target.value;
      output.textContent = color;
      if (i === 0) { player1.stroke = color; pad1.stroke = color; }
      if (i === 1) { player2.stroke = color; pad2.stroke = color; }
    });
  });

  // === Key inputs ===
  document.querySelectorAll('.u, .d, .s').forEach((input) => {
    const output = input.nextElementSibling;
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;
      output.textContent = key;
      const parent = input.closest('.op');
      if (parent.querySelector('h2').textContent.includes('1')) {
        if (input.classList.contains('u')) player1.upKey = key;
        if (input.classList.contains('d')) player1.downKey = key;
        if (input.classList.contains('s')) player1.straightKey = key;
      } else {
        if (input.classList.contains('u')) player2.upKey = key;
        if (input.classList.contains('d')) player2.downKey = key;
        if (input.classList.contains('s')) player2.straightKey = key;
      }
    });
  });
});


/*--------
    Make the Options Button 
    . on click
    . show or hide the `.sides` div
---------*/

/*---------
    Program the two fill inputs to do the following:
    . Display the correct colors on the inputs and outputs and paddles    
    . using an `input` event
        . Change the player's fill property to the value of the input
        . Change the pad's fill property  to the player's fill property
        . Show the fill's hex code in the output div 

-----------*/

/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/
