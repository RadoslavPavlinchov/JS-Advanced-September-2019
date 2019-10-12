function create(words) {
   const content = document.querySelector('#content');

   function createDiv(value) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.style.display = 'none';
      p.textContent = value;
      div.appendChild(p);
      return div;
   }

   words.forEach(e => {
      content.appendChild(createDiv(e));
   });

   [...document.querySelectorAll('div')]
   .forEach(e => e.addEventListener('click', (ev) => {
      ev.target.children[0].style.display = 'block';
   }));
}
