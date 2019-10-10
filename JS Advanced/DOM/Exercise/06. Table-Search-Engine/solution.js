function solve() {
   let input = document
      .getElementById("searchField");

   let data = Array.from(document
         .getElementsByTagName("tr"))
      .splice(2);

   document
      .getElementById("searchBtn")
      .addEventListener("click", function () {
         data.forEach((e) => e.className = "");
         if (input.value !== "") {
            for (let el of data) {
               Array
                  .from(el.children)
                  .forEach(x => {
                     if (x.textContent.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())) {
                        el.className = 'select';
                     }
                  });
            }
         }
      });
   input.value = "";
}
