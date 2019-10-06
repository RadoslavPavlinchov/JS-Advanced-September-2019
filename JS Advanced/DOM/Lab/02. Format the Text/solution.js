function solve() {
  let input = document.getElementById("input");
  let output = document.getElementById("output");

  let sentences = input.innerHTML
    .split(".")
    .filter(x => x !== "");

  for (let i = 0; i < sentences.length; i += 3) {
    let p = document.createElement("p");
    let str = "";
    for (let j = 0; j < 3; j++) {

      if (i + j < sentences.length) {
        str += sentences[i + j] + ".";
      }

    }
    p.innerHTML = str;
    output.appendChild(p);
  }
}
