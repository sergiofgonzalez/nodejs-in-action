"use strict";


class InfoboxLogger { // eslint-disable-line no-unused-vars
  constructor(infoboxId) {
    const selector = infoboxId.startsWith("#") ? infoboxId : `#${ infoboxId }`;
    this.infobox = document.querySelector(selector);
    if (!this.infobox) {
      throw new Error("No infobox element was found in the document");
    }
  }

  println(text, indentation = 0, highlight = false) {
    let textToPrint = text;
    if (indentation) {
      for (let i = 0; i < indentation; i++) {
        textToPrint = "\u00a0" + textToPrint;
      }
    }
    if (highlight) {
      const strong = document.createElement("strong");
      strong.appendChild(document.createTextNode(textToPrint));
      this.infobox.appendChild(strong);
    } else {
      this.infobox.appendChild(document.createTextNode(textToPrint));
    }
    this.infobox.appendChild(document.createElement("br"));
  }

  insertln(text, indentation, highlight = false) {
    let textToPrint = text;
    if (indentation) {
      for (let i = 0; i < indentation; i++) {
        textToPrint = "\u00a0" + textToPrint;
      }
    }
    if (highlight) {
      const strong = document.createElement("strong");
      strong.appendChild(document.createTextNode(textToPrint));
      strong.appendChild(document.createElement("br"));
      this.infobox.insertBefore(strong, this.infobox.firstChild);
    } else {
      const elem = document.createElement("div");
      elem.appendChild(document.createTextNode(textToPrint));
      elem.appendChild(document.createElement("br"));
      this.infobox.insertBefore(elem, this.infobox.firstChild);
    }
  }

  overwriteln(text) {
    this.infobox.textContent = "";
    this.infobox.textContent = text;
  }
}
