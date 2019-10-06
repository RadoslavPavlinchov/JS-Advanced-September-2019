function solve() {
  [ ...document.querySelectorAll('.link-1 a') ]
      .forEach(e => e.addEventListener('click', changeVisited));

  function changeVisited(ev) {
      const curr = ev.currentTarget.nextElementSibling;
      const arr = curr.textContent.split(' ');
      arr[1]++;
      curr.textContent = arr.join(' ');
  }
}
