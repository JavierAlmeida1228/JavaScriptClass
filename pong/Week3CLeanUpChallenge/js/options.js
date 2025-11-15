document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#options-toggle');
  const sides = document.querySelector('.sides');
  toggle.addEventListener('click', () => {
    sides.classList.toggle('hidden');
  });

  const playerDivs = document.querySelectorAll('.player');

  player.forEach((p, i) => {
    const padRef = pad[i];
    const div = playerDivs[i];

    // === Color inputs (fill + stroke) ===
    div.querySelectorAll('.color').forEach(input => {
      const output = input.nextElementSibling;
      const type = input.classList.contains('fill') ? 'fill' : 'stroke';

      input.value = p[type];
      output.textContent = p[type];

      input.addEventListener('input', e => {
        const color = e.target.value;
        p[type] = color;
        padRef[type] = color;
        output.textContent = color;
      });
    });

    // === Key inputs (u, d, s) ===
    div.querySelectorAll('.keys').forEach(input => {
      const output = input.nextElementSibling;
      const keyType = [...input.classList].find(c => c !== 'keys');

      input.value = p.keys[keyType];
      output.textContent = p.keys[keyType];

      input.addEventListener('keydown', e => {
        e.preventDefault();
        const key = e.key;
        input.value = key;
        p.keys[keyType] = key;
        output.textContent = key;
      });

      input.addEventListener('focus', () => {
        currentState = 'pause';
      });
    });
  });

  // === Ball size input ===
  const ballSizeInput = document.querySelector('.ball-size');
  if (ballSizeInput) {
    const ballSizeOutput = ballSizeInput.nextElementSibling;
    ballSizeInput.value = ball.h; // or ball.radius if you define it
    ballSizeOutput.textContent = ball.h;

    ballSizeInput.addEventListener('input', e => {
      const newSize = parseInt(e.target.value, 10);
      ball.w = newSize;
      ball.h = newSize;
      ballSizeOutput.textContent = newSize;
    });
  }
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
