const $ = selector => document.querySelector(selector);

function App() {
  const $input = $('#espresso-menu-name');
  const $button = $('#espresso-menu-submit-button');
  const $ul = $('#espresso-menu-list');

  const addMenu = e => {
    e.preventDefault();
    $ul.insertAdjacentHTML('beforeend', template($input.value));
  };

  $button.addEventListener('click', addMenu);

  const template = value => {
    return `
        <li>
            ${value}
            <button>품절</button>
            <button>수정</button>
            <button>삭제</button>
        </li>
      `;
  };
}
App();
