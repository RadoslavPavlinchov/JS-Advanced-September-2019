function solve() {
    let [book, year, price] = Array.from(document.querySelectorAll('input'));
    const profit = Array.from(document.querySelectorAll('h1'))[1];
    const [oldBooks, newBooks] = Array.from(document.querySelectorAll('.bookShelf'));

    document.querySelector('button').addEventListener('click', function (e) {
        e.preventDefault();

        book = book.value;
        year = Number(year.value);
        price = Number(price.value);

        if (book && year > 0 && price > 0) {
            const div = document.createElement('div');
            div.classList.add("book");

            const p = document.createElement('p');
            p.textContent = `${book} [${year}]`;

            const btnBuy = document.createElement('button');
            btnBuy.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
            btnBuy.addEventListener('click', function (e) {
                profit.textContent = `Total Store Profit: ${price.toFixed(2)} BGN`;
                btnBuy.parentElement.parentElement.removeChild(div);
            });

            div.appendChild(p);
            div.appendChild(btnBuy);

            if (year >= 2000) {
                const btnMove = document.createElement('button');
                btnMove.textContent = `Move to old section`;
                btnMove.addEventListener('click', function (e) {
                    oldBooks.appendChild(div);
                    btnBuy.parentElement.removeChild(btnMove);
                    price = price * 0.85;
                    btnBuy.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
                });
                div.appendChild(btnMove);
                newBooks.appendChild(div);
                
            } else {
                price = price * 0.85;
                btnBuy.textContent = `Buy it only for ${price.toFixed(2)} BGN`;
                oldBooks.appendChild(div);
            }
        }
    });
}