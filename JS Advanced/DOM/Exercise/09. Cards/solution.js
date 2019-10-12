function solve() {
   const history = document.querySelector('#history');
   const firstSpan = document.querySelector('#result').firstElementChild;
   const secondSpan = document.querySelector('#result').lastElementChild;
   let firstCard;
   let secondCard;

   [...document.querySelectorAll('img')].forEach(e => e.addEventListener('click', (ev) => {
      ev.target.src = 'images/whiteCard.jpg';
      if (ev.target.parentElement.id === 'player1Div') {
         firstSpan.textContent = ev.target.name;
         firstCard = ev.target;
      } else if (ev.target.parentElement.id === 'player2Div') {
         secondSpan.textContent = ev.target.name;
         secondCard = ev.target;
      }

      if (secondSpan.textContent !== '' && firstSpan.textContent !== '') {
         if (Number(firstCard.name) > Number(secondCard.name)) {
            firstCard.style.border = '2px solid green';
            secondCard.style.border = '2px solid red';

         } else {
            firstCard.style.border = '2px solid red';
            secondCard.style.border = '2px solid green';
         }
         history.textContent += `[${firstCard.name} vs ${secondCard.name}] `;
         firstSpan.textContent = '';
         secondSpan.textContent = '';
      }
   }));
}
