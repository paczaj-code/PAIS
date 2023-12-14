async function load_example(example) {
  fetch(`./examples/${example}.html`)
    .then((response) =>
      response.status === 200
        ? response.text()
        : (response = error + `<p>${response.status}</p>`)
    )
    .then((html) => {
      const content = document.querySelector('.content');
      content.innerHTML = html;
      Prism.highlightAll();
    })
    .catch((error) => {
      console.log(error);
    });
}
const menu_examples = document.querySelectorAll('.examples_list-item');

const et_go_home= ()=>{
  load_example('home');
  menu_examples.forEach((el)=>el.classList.remove('active'))
}

document.addEventListener("DOMContentLoaded", function(event) {
  et_go_home()
});

const error = '<div class="error">Wystapił błąd</div>'
const mobile_menu_button = document.querySelector('.btn.btn-mobile_menu');
const mobile_nav = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

mobile_menu_button.addEventListener('click', function () {
  mobile_nav.classList.toggle('sidebar_visible');
  document.querySelector('.overlay').classList.toggle('overlay_visible');
  mobile_menu_button.classList.toggle('opened');
});

const close_mobile_nav = () => {
  if (mobile_nav.classList.contains('sidebar_visible')) {
    mobile_nav.classList.remove('sidebar_visible');
    mobile_menu_button.classList.remove('opened');
    overlay.classList.remove('overlay_visible');
  }
};

overlay.addEventListener('click', () => close_mobile_nav());

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    close_mobile_nav();
  }
});

const top_nav_items = document.querySelectorAll('.top_navigation-item');
const sidebar_lists = document.querySelectorAll('.examples_list');

top_nav_items[0].addEventListener('click',()=>{
  et_go_home();
})

top_nav_items.forEach((top_nav_item, index) => {
  top_nav_item.addEventListener('click', () => {
    if (!top_nav_item.classList.contains('active') && index>0) {
      sidebar_lists.forEach((el) => {
        if (!el.classList.contains(top_nav_item.dataset.target)) {
          el.classList.remove('active');
        }
      }),
        top_nav_items.forEach((el) => el.classList.remove('active')),
        top_nav_item.classList.add('active'),
        document
          .querySelector(`.${top_nav_item.dataset.target}`)
          .classList.add('active'),
          document
          .querySelector(`.${top_nav_item.dataset.target}`)
          .classList.add('slide-in-left');
    }
  });
});



menu_examples.forEach((menu_example) => {
  menu_example.addEventListener('click', async () => {
    close_mobile_nav();
    if (!menu_example.classList.contains('active')) {
      menu_examples.forEach((el) => {
        el.classList.remove('active');
      }),
        menu_example.classList.add('active');
      await  load_example(
        menu_example.dataset.example
      );
    }
  });
});

