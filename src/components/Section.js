export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(item) {
    this._container.prepend(item);
  }
  rendererItems() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
