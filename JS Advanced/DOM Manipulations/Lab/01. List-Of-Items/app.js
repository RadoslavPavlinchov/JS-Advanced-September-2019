function addItem() {
    let newItemText = document.querySelector("#newItemText");
    let li = document.createElement("li");

    li.textContent = newItemText.value;
    document.querySelector("#items").appendChild(li);
    newItemText.value = "";
}