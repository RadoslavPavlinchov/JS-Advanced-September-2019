function solve() {
  const [generateButton, buyButton] = document.getElementsByTagName('button');

  const demarkInputElements = () => {
    document.querySelector('input').disabled = false;
  };

  const getInfoForNewFurniture = () => {
    return JSON.parse(document.querySelector('textarea').value);
  };

  const formingNewRow = (obj) => {
    incomElem = {
      'decFactor': 'consistStartAndEndTag',
      'price': 'consistStartAndEndTag',
      'name': 'consistStartAndEndTag',
      'img': 'img'
    };
    htmlElem = {
      'img': function (obj, key) {
        return `<td><img src="${obj[key]}"></td>`;
      },
      'consistStartAndEndTag': function (obj, key) {
        return `<td><p>${obj[key]}</p></td>`;
      }
    };
    return ['decFactor', 'price', 'name', 'img'].reduce((row, key) => {
      row.unshift(htmlElem[incomElem[key]](obj, key));
      return row;
    }, [`<td><input type="checkbox"/></td>`]).join('');
  };

  const addNewRowInTable = (newRow) => {
    let row = document.createElement('tr');
    row.innerHTML = newRow;
    let tBody = document.getElementsByTagName('tbody')[0];
    tBody.appendChild(row);
  };

  const getMarkedFurniture = () => {
    return [...document.getElementsByTagName('input')].filter(el => el.checked === true);
  };

  const generateTable = () => {
    demarkInputElements();
    getInfoForNewFurniture().map(el => {
      addNewRowInTable(formingNewRow(el));
    });
  };

  const collectInfoForBoughtFurniture = (checkedInput) => {
    let namesBoughtFurniture = [];
    let priceBoughtFurniture = 0;
    let decFactor = 0;
    checkedInput.map(el => {
      const parenEl = el.parentElement.parentElement;
      namesBoughtFurniture.push(parenEl.children[1].textContent.trim());
      priceBoughtFurniture += Number(parenEl.children[2].textContent);
      decFactor += Number(parenEl.children[3].textContent);
    });
    let avgDecFactor = decFactor / namesBoughtFurniture.length;
    let names = namesBoughtFurniture.join(', ');
    priceBoughtFurniture = priceBoughtFurniture.toFixed(2);
    return [names, priceBoughtFurniture, avgDecFactor];
  };

  const addInfoInTextArea = (infoForBoughtFurnitures) => {
    let textAreaElement = document.getElementsByTagName('textarea')[1];
    textAreaElement.disabled = false;
    let output = ['Bought furniture: ', 'Total price: ', 'Average decoration factor: ']
      .map((el, ind) => {
        return el += String(infoForBoughtFurnitures[ind]);
      }).join('\n');
    textAreaElement.innerHTML = output;
  };

  const buy = () => {
    addInfoInTextArea(collectInfoForBoughtFurniture(getMarkedFurniture()));
  };

  generateButton.addEventListener('click', generateTable);
  buyButton.addEventListener('click', buy);
}
