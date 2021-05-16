import { debounce } from './utill.js';

export const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
    <label><b>Search for a Movie </b></label>
    <input class="input"/>
    <div class="dropdown">
            <div class="dropdown-menu">
              <div class="dropdown-content results">
              </div>
            </div>
          </div>
`;
  const dropdown = root.querySelector('.dropdown');
  const results = root.querySelector('.results');
  const input = root.querySelector('input');
  const onInput = async (e) => {
    try {
      if (!e.target.value) {
        root.nextElementSibling.innerText = '';
        dropdown.classList.remove('is-active');
        return;
      }
      const items = await fetchData(e.target.value);
      if (!items.length) {
        dropdown.classList.remove('is-active');
      }
      results.innerHTML = '';
      dropdown.classList.add('is-active');
      for (let item of items) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);
        option.addEventListener('click', function () {
          dropdown.classList.remove('is-active');
          input.value = inputValue(item);
          onOptionSelect(item);
        });

        results.appendChild(option);
      }
    } catch (err) {
      root.nextElementSibling.innerText = err.message;
    }
  };
  input.addEventListener('input', debounce(onInput));
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
