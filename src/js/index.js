import { $ } from './util.js';

function App() {
  const $input = $('#espresso-menu-name');
  const $addButton = $('#espresso-menu-submit-button');
  const $menuList = $('#espresso-menu-list');
  const $menuCount = $('.menu-count');

  const updateMenuCount = () => {
    const $menuItem = $menuList.querySelectorAll('.menu-list-item');
    $menuCount.innerText = `총 ${$menuItem.length}개`;
  };

  const addMenu = e => {
    e.preventDefault();
    if (!$input.value || !$input.value.trim()) {
      alert('메뉴를 입력해주세요.');
      return;
    }
    $menuList.insertAdjacentHTML('beforeend', template($input.value));
    $input.value = '';
    updateMenuCount();
  };

  const editMenu = e => {
    const newMenu = prompt('메뉴명을 수정하세요');
    if (!newMenu || !newMenu.trim()) {
      alert('메뉴 이름을 입력하세요');
      return;
    }
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    $menuName.innerText = newMenu;
  };

  const removeMenu = e => {
    if (confirm('메뉴를 삭제할까요?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  const soldOut = e => {
    const $span = e.target.closest('li').children[0];
    if ($span.classList.contains('sold-out')) {
      $span.classList.remove('sold-out');
    } else {
      $span.classList.add('sold-out');
    }
  };

  $addButton.addEventListener('click', addMenu);
  $menuList.addEventListener('click', e => {
    if (e.target.classList.contains('menu-edit-button')) {
      editMenu(e);
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenu(e);
    }
    if (e.target.classList.contains('menu-sold-out-button')) {
      soldOut(e);
    }
  });
  updateMenuCount();

  const template = name => {
    return `
    <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
  
      `;
  };
}

App();
