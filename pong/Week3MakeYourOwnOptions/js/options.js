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

    // Initialize stroke values
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

  // === Up key inputs ===
  document.querySelectorAll('.u').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize input and output to current player's up key
    if (i === 0) {
      input.value = player1.keys.u;
      output.textContent = player1.keys.u;
    }
    if (i === 1) {
      input.value = player2.keys.u;
      output.textContent = player2.keys.u;
    }

    // Keydown event
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.u = key;
        output.textContent = player1.keys.u;
      }
      if (i === 1) {
        player2.keys.u = key;
        output.textContent = player2.keys.u;
      }
    });

    // Focus event: pause the game
    input.addEventListener('focus', () => {
      currentState = 'pause';
    });
  });

  // === Down key inputs ===
  document.querySelectorAll('.d').forEach((input, i) => {
    const output = input.nextElementSibling;

    if (i === 0) {
      input.value = player1.keys.d;
      output.textContent = player1.keys.d;
    }
    if (i === 1) {
      input.value = player2.keys.d;
      output.textContent = player2.keys.d;
    }

    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.d = key;
        output.textContent = player1.keys.d;
      }
      if (i === 1) {
        player2.keys.d = key;
        output.textContent = player2.keys.d;
      }
    });

    input.addEventListener('focus', () => {
      currentState = 'pause';
    });
  });

  // === Straight key inputs ===
  document.querySelectorAll('.s').forEach((input, i) => {
    const output = input.nextElementSibling;

    if (i === 0) {
      input.value = player1.keys.s;
      output.textContent = player1.keys.s;
    }
    if (i === 1) {
      input.value = player2.keys.s;
      output.textContent = player2.keys.s;
    }

    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.s = key;
        output.textContent = player1.keys.s;
      }
      if (i === 1) {
        player2.keys.s = key;
        output.textContent = player2.keys.s;
      }
    });

    input.addEventListener('focus', () => {
      currentState = 'pause';
    });
  });

  // === New Feature: Ball size input ===
  const ballSizeInput = document.querySelector('.ball-size');
  if (ballSizeInput) {
    const ballSizeOutput = ballSizeInput.nextElementSibling;

    // Initialize input and output to current ball radius
    ballSizeInput.value = ball.radius;
    ballSizeOutput.textContent = ball.radius;

    // Event listener: update ball radius and output
    ballSizeInput.addEventListener('input', (e) => {
      const newSize = parseInt(e.target.value, 10);
      ball.radius = newSize;
      ballSizeOutput.textContent = newSize;
    });
  }
});


  // === Stroke inputs ===
  document.querySelectorAll('.stroke').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize stroke values
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

  // === Down key inputs ===
  document.querySelectorAll('.d').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize input and output to current player's down key
    if (i === 0) {
      input.value = player1.keys.d;
      output.textContent = player1.keys.d;
    }
    if (i === 1) {
      input.value = player2.keys.d;
      output.textContent = player2.keys.d;
    }

    // Keydown event
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.d = key;
        output.textContent = player1.keys.d;
      }
      if (i === 1) {
        player2.keys.d = key;
        output.textContent = player2.keys.d;
      }
    });

    // Focus event: pause the game
    input.addEventListener('focus', () => {
      currentState = 'pause';
    });
  });

  // === Straight key inputs ===
  document.querySelectorAll('.s').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize input and output to current player's straight key
    if (i === 0) {
      input.value = player1.keys.s;
      output.textContent = player1.keys.s;
    }
    if (i === 1) {
      input.value = player2.keys.s;
      output.textContent = player2.keys.s;
    }

    // Keydown event
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.s = key;
        output.textContent = player1.keys.s;
      }
      if (i === 1) {
        player2.keys.s = key;
        output.textContent = player2.keys.s;
      }
    });

    // Focus event: pause the game
    input.addEventListener('focus', () => {
      currentState = 'pause';
    });
  });

  // === Up key inputs (already implemented) ===
  document.querySelectorAll('.u').forEach((input, i) => {
    const output = input.nextElementSibling;

    // Initialize input and output to current player's up key
    if (i === 0) {
      input.value = player1.keys.u;
      output.textContent = player1.keys.u;
    }
    if (i === 1) {
      input.value = player2.keys.u;
      output.textContent = player2.keys.u;
    }

    // Keydown event
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = e.key;
      input.value = key;

      if (i === 0) {
        player1.keys.u = key;
        output.textContent = player1.keys.u;
      }
      if (i === 1) {
        player2.keys.u = key;
        output.textContent = player2.keys.u;
      }
    });

    // Focus event: pause the game
    input.addEventListener('focus', () => {
      currentState = 'pause';
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
