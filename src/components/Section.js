export class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._selector = selector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  getItems() {
    return this._initialArray;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
}
