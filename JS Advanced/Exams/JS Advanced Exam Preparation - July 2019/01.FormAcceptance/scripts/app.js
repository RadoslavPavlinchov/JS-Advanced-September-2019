function acceptance() {
	const company = document.querySelector('input[name="shippingCompany"]');
	const product = document.querySelector('input[name="productName"]');
	const quantity = document.querySelector('input[name="productQuantity"]');
	const scrape = document.querySelector('input[name="productScrape"]');
	const addItBtn = document.querySelector('#acceptance');

	const divWarehouse = document.querySelector('#warehouse');

	addItBtn.addEventListener('click', addToWarehouse);

	function addToWarehouse() {
		if (company.value && product.value && Number(quantity.value) && Number(scrape.value)) {
			const div = document.createElement('div');
			const p = document.createElement('p');
			const button = document.createElement('button');

			let availableQuantity = Number(quantity.value - scrape.value);

			if (availableQuantity <= 0) {
				return;
			}

			p.textContent = `[${company.value}] ${product.value} - ${availableQuantity} pieces`;

			button.addEventListener('click', () => { div.remove(); });
			button.textContent = 'Out of stock';

			div.appendChild(p);
			div.appendChild(button);

			divWarehouse.appendChild(div);

			company.value = '';
			product.value = '';
			quantity.value = '';
			scrape.value = '';
		}
	}
}