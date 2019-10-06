function growingWord() {
  const colorMap = ["blue", "green", "red"];
  
  const text = document.querySelector('#exercise p');
  let size = text.style.fontSize.slice(0, -2) * 2;
  const color = text.style.color;

  if (size === 0) {
    size = 2;
  }

  console.log(size);
  const index = colorMap.indexOf(color);

  const nextColor = index + 1 >= colorMap.length ? colorMap[0] : colorMap[index + 1];

  text.style.cssText = `color: ${nextColor}; font-size: ${size}px`;
}
