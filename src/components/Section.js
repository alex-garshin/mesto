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

  getItems() {
    return this._initialArray;
  }

  setItems(items) {
    return new Section({ items, renderer: this._renderer }, this._selector);
  }

  renderItems() {
    this._initialArray
      .slice(0)
      .reverse()
      .forEach((item) => {
        this._renderer(item);
      });
  }
}
