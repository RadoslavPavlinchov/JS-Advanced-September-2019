function solve() {
   let textArea = document.querySelector("body > div > textarea");
   let list = new Set();
   let totalPrice = 0;
   let isCheckOut = false;

   document
      .querySelector(".checkout")
      .addEventListener("click", function () {
         if (isCheckOut) {
            return;
         }
         textArea.value += `You bought ${[...list].join(", ")} for ${totalPrice.toFixed(2)}.`;
         isCheckOut = true;
      });

   Array.from(document
         .querySelectorAll(".add-product"))
         .forEach(element => element
         .addEventListener("click", function (evt) {

            if (isCheckOut) {
               return;
            }

            const price = evt.target.parentElement.parentElement
               .querySelector(".product-line-price").textContent;

            const product = evt.target.parentElement.parentElement
               .querySelector(".product-title").textContent;

            textArea.value += `Added ${product} for ${price} to the cart.\n`;
            totalPrice += Number(price);
            list.add(product);
         }));
}
