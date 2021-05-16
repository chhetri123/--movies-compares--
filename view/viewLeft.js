import View from './view.js';
class ViewLeft extends View {
  _parentEl = document.querySelector('#left-autocomplete');
  _dropdown = this._parentEl.querySelector('.dropdown');
  _results = this._parentEl.querySelector('.results');
  _input = this._parentEl.querySelector('input');
  _summary = this._parentEl.nextElementSibling;
  _tutorial = document.querySelector('.tutorial');
}
export default new ViewLeft();
