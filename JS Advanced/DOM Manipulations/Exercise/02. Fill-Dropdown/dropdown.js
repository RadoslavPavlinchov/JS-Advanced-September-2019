function addItem() {
    const select = document.querySelector('#menu');
    const itemText = document.querySelector('#newItemText');
    const itemValue = document.querySelector('#newItemValue');

    const option = document.createElement('option');
    option.value = itemValue.value;
    option.textContent = itemText.value;

    select.appendChild(option);
    itemText.value = '';
    itemValue.value = '';
}
