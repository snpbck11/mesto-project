export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(item) {
    this._container.prepend(item);
  }
  rendererItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
