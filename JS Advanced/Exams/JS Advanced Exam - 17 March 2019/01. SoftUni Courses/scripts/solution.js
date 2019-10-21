function solve() {
      const prices = {
            'JS-Fundamentals': 170,
            'JS-Advanced': 180,
            'JS-Applications': 190,
            'JS-Web': 490
      };

      const names = {
            'js-fundamentals': 'JS-Fundamentals',
            'js-advanced': 'JS-Advanced',
            'js-applications': 'JS-Applications',
            'js-web': 'JS-Web'
      };

      document.querySelector('button').addEventListener('click', (el) => {
            let selectedCourses = [...document.querySelectorAll('[type="checkbox"]')]
                  .filter((el) => el.checked === true)
                  .map((el) => names[el.value]);

            let price = 0;

            if (selectedCourses.includes('JS-Advanced') && selectedCourses.includes('JS-Fundamentals')) {
                  prices['JS-Advanced'] *= 0.9;
            }
            if (selectedCourses.includes('JS-Advanced') && selectedCourses.includes('JS-Fundamentals') && selectedCourses.includes('JS-Applications')) {
                  prices['JS-Advanced'] *= 0.94;
                  prices['JS-Fundamentals'] *= 0.94;
                  prices['JS-Applications'] *= 0.94;
            }
            
            selectedCourses.forEach(x => {
                  price += prices[x];
            });

            if (document.querySelectorAll('input[type="radio"]')[1].checked === true) {
                  price *= 0.94;
            }
            
            if (selectedCourses.includes('JS-Advanced') && selectedCourses.includes('JS-Fundamentals') && selectedCourses.includes('JS-Applications') && selectedCourses.includes('JS-Web')) {
                  selectedCourses.push('HTML and CSS');
            }

            selectedCourses.forEach(e => {
                  let li = document.createElement('li');
                  li.textContent = e;
                  document.querySelectorAll('.courseBody')[1].querySelector('ul').appendChild(li);
            });

            document.querySelectorAll('.courseFoot')[1].querySelector('p').textContent = `Cost: ${parseInt(price)}.00 BGN`;
      });
}
solve();