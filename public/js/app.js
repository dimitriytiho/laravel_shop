/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/admin/pulse.js":
/*!*************************************!*\
  !*** ./resources/js/admin/pulse.js ***!
  \*************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // При кликена на .pulse эффект пульса
  $('.pulse').click(function (e) {
    var div = document.createElement('div'),
        style = div.style,
        max = Math.max(e.target.offsetWidth, e.target.offsetHeight),
        rect = e.target.getBoundingClientRect(),
        px = 'px',
        color = window.getComputedStyle(e.target).backgroundColor,
        timeDeleteDiv = 300,
        self = $(this); // Сформируем нужный div

    div.classList.add('pulse_js');
    style.width = style.height = max + px;
    style.left = e.clientX - rect.left - max / 2 + px;
    style.top = e.clientY - rect.top - max / 2 + px;
    style.backgroundColor = color;
    style.opacity = .4; // Вставим div

    self.append(div); // Удалим div

    setTimeout(function () {
      self.children('.pulse_js').remove();
    }, timeDeleteDiv);
  });
}, false);

/***/ }),

/***/ "./resources/js/components/all.js":
/*!****************************************!*\
  !*** ./resources/js/components/all.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // Lazy
  $('.lazy').lazy();
  $('.lazy_delay').lazy({
    // Появление картинки с задержкой
    delay: 100
  }); // Fancybox

  $('.fancybox').fancybox();
  $('.fancybox_thumbs').fancybox({
    thumbs: {
      autoStart: true // По-умолчанию показываем эскизы

    }
  }); // При клики на эскиз показываем галерею, начинаю с той картинки, на какую кликнули

  $('.fancybox_click').click(function (e) {
    var el,
        id = $(this).data('gallery');

    if (id) {
      el = $('.fancybox_thumbs[rel=' + id + ']:eq(0)');
      e.preventDefault();
      el.click();
    }
  });
}, false);

/***/ }),

/***/ "./resources/js/components/index.js":
/*!******************************************!*\
  !*** ./resources/js/components/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slick */ "./resources/js/components/slick.js");
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./all */ "./resources/js/components/all.js");
/* harmony import */ var _all__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_all__WEBPACK_IMPORTED_MODULE_1__);

 //import './simplebar'
//import './simple_parallax'

/***/ }),

/***/ "./resources/js/components/slick.js":
/*!******************************************!*\
  !*** ./resources/js/components/slick.js ***!
  \******************************************/
/***/ (() => {

$(function () {
  // Слайдер по всему сайту
  $('.slider_simple').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    //autoplay: true,
    //autoplaySpeed: 5000,
    infinite: false,
    dots: false,
    arrows: true,
    nextArrow: '<i class="fas fa-arrow-right right"></i>',
    prevArrow: '<i class="fas fa-arrow-left left"></i>',
    //pauseOnHover: true,
    //variableWidth: true,
    //lazyLoad: 'ondemand', // ondemand progressive <img data-lazy="img/name.png">
    //draggable: false,
    //centerMode: true,
    //centerPadding: '0', // default 50px
    responsive: [{
      breakpoint: xl,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: lg,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true
      }
    }, {
      breakpoint: sm,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true
      }
    }]
  }); // Слайдер на главной странице

  $('.slider_main').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: true,
    nextArrow: '<i class="fas fa-arrow-right right"></i>',
    prevArrow: '<i class="fas fa-arrow-left left"></i>',
    pauseOnHover: true,
    lazyLoad: 'ondemand' // ondemand progressive <img data-lazy="img/name.png">

  }); // Слайдер в карточке товара для эскизов

  $('.slick_show_gallery').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: true,
    nextArrow: '<i class="fas fa-arrow-right right"></i>',
    prevArrow: '<i class="fas fa-arrow-left left"></i>'
  }); // Убираем мелькание картинок при загруки слайдера, т.е. после загрузки js показываем слайдер

  $('.slick-slider').show(); // Кол-во слайдов в слайдере, работает после инициализации слайдера
  //console.log(sliderSimple.slick('getSlick').slideCount)
  // Убираем мелькание на заголовке

  /*setTimeout(function () {
      $('.slider_simple__a--title').show()
  }, 100)*/
});

/***/ }),

/***/ "./resources/js/components/validate.js":
/*!*********************************************!*\
  !*** ./resources/js/components/validate.js ***!
  \*********************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // Маска для телефона
  $('input[type=tel]').inputmask('+9(999)999-99-99'); // Настройки по-умолчанию

  $.validator.setDefaults({
    errorClass: 'is-invalid',
    // Правила валидации
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        checkTel: true
      },
      password: {
        required: true,
        minlength: 6
      },
      password_confirmation: {
        required: true,
        minlength: 6,
        equalTo: '[name=password]' //#password

      },
      accept: {
        required: true
      }
    },
    // Свои сообщения валидации

    /*messages: {
        email: {
            required: 'Please enter a email address',
            email: 'Please enter a vaild email address'
        },
    },*/
    // При удаление фокуса с input
    onfocusout: function onfocusout(element) {
      this.element(element);
    },
    errorElement: 'span',
    errorPlacement: function errorPlacement(error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
      element.closest('.input-group').append(error);
    },
    highlight: function highlight(element, errorClass, validClass) {
      $(element).addClass(errorClass);
    },
    unhighlight: function unhighlight(element, errorClass, validClass) {
      $(element).removeClass(errorClass);
    },
    //beforeSubmit: function () {},
    // Действия после успешного ввода
    submitHandler: function submitHandler(form) {
      // Заблокируем кнопку, включим спиннер
      $(form).find('[type=submit]').attr('disabled', true).prepend(spinnerBtn);
      return true;
    }
  }); // Добаляем валидатор для номера телефона

  $.validator.methods.checkTel = function (value, element) {
    return this.optional(element) || /^[\+\(\)\- 0-9]+$/.test(value);
  }; // Запуск валидации


  $('form.validate').each(function (key, form) {
    $(form).validate();
  }); //$('.validate').validate()
  // Дополнительные правила для всех форм валидации

  /*$('input[type=email]').rules('add', {
      email: true
  })*/
}, false);

/***/ }),

/***/ "./resources/js/default/alert.js":
/*!***************************************!*\
  !*** ./resources/js/default/alert.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /*
   * Функция для вывода сообщений Bootstrap Alert, вставляет сообщение в <div id="get_alert_js"></div>.
   * text - текст сообщения.
   * alertClass - название цвета Bootstrap окна сообщения, необязательный параметр, по-умолчанию danger.
   * ms - время показа сообщения в милисекундах, необязательный параметр, по-умолчанию 3 секунды.
   */
  get: function get(text) {
    var alertClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';
    var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
    var el = document.getElementById('get_alert_js'),
        html = '<div class="container mt-4 alert alert-';

    if (el) {
      html = html + alertClass + '">' + text + '</div>'; // Вставляем сообщение в html код на сайте

      el.innerHTML = html; // Удаляем сообщение из html через ms

      setTimeout(function () {
        el.innerHTML = '';
      }, ms);
    }
  }
});

/***/ }),

/***/ "./resources/js/default/forms.js":
/*!***************************************!*\
  !*** ./resources/js/default/forms.js ***!
  \***************************************/
/***/ (() => {

// Скрипты для Форм

/*
 * При клике на ссылку или кнопку с классом .one_click
 * Отключается кнопка (добавляется класс disabled).
 */
$(document).on('click', '.one_click', function (e) {
  $(this).attr('disabled', true).addClass('disabled');
});
/*
 * При клике на ссылку или кнопку с классом .spinner_click
 * Отключается кнопка (добавляется класс disabled) и включается спинер.
 */

$(document).on('click', '.spinner_click', function () {
  $(this).attr('disabled', true).addClass('disabled').prepend(spinnerBtn);
});
/*
 * При отправке формы с классом .spinner_submit
 * Отключается кнопка и включается спинер в кнопке отправки.
 * Внимание, спинер будет крутиться до перезагрузки страницы.
 */

$(document).on('submit', '.spinner_submit', function () {
  $(this).find('[type=submit]').attr('disabled', true).addClass('disabled').prepend(spinnerBtn);
}); // При изменение формы отправить её

$(document).on('change', '.change_submit', function () {
  $(this).submit();
});

/***/ }),

/***/ "./resources/js/default/functions.js":
/*!*******************************************!*\
  !*** ./resources/js/default/functions.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // Функция задаёт одинаковую высоту блоков html, передать название класса
  getHeight: function getHeight($class) {
    var els = document.querySelectorAll('.' + $class);
    var arr = [];
    els.forEach(function (el) {
      arr.push(el.offsetHeight);
    });

    if (arr) {
      var maxHeight = Math.max.apply(Math, arr) + 'px';
      els.forEach(function (el) {
        el.style.height = maxHeight;
      });
    }
  },
  // Функция показывает селектор, у которого в css прописано display: none
  showJS: function showJS($selector) {
    var el = document.querySelector($selector);
    if (el) el.style.display = 'block';
  },
  // Прокрутить к верху страницы
  scrollUp: function scrollUp() {
    if (typeof window === 'undefined') return;
    window.scrollTo(0, 0); // $('html, body').animate({scrollTop: 0}, '400')
  },
  // Сравнить 2 массива
  diffArr: function diffArr(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  },
  // Строку к snake-case
  snake: function snake(string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, '-').toLowerCase();
  },
  // Получить значение формы в объект (передать уникальный идефикатор формы)
  serialize: function serialize(form) {
    var obj = {};
    form = document.querySelector(form);

    if (form) {
      var inputs = form.querySelectorAll('input, textarea');

      if (inputs) {
        inputs.forEach(function (el) {
          var name = el.name,
              value = el.value;

          if (name && value) {
            obj[name] = value;
          }
        });
      }
    }

    return obj;
  },
  strReplace: function strReplace(search, replace, str) {
    if (str) {
      return str.replace(search, replace);
    }

    return false;
  },
  // Первая буква заглавная
  ucFirst: function ucFirst(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },
  // Заменяет в строке все _ на -
  snake_case: function snake_case(str) {
    return str.replace(/-/g, '_');
  },
  // Возвращает случайное значение из массива, принимает массив
  array_rand: function array_rand(arr) {
    if (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    return false;
  }
});

/***/ }),

/***/ "./resources/js/default/index.js":
/*!***************************************!*\
  !*** ./resources/js/default/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_pulse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../admin/pulse */ "./resources/js/admin/pulse.js");
/* harmony import */ var _admin_pulse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_admin_pulse__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./resources/js/default/search.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_search__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms */ "./resources/js/default/forms.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_forms__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scroll */ "./resources/js/default/scroll.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scroll__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ "./resources/js/default/template.js");
/* harmony import */ var _components_validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/validate */ "./resources/js/components/validate.js");
/* harmony import */ var _components_validate__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_validate__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scripts */ "./resources/js/default/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_6__);








/***/ }),

/***/ "./resources/js/default/scripts.js":
/*!*****************************************!*\
  !*** ./resources/js/default/scripts.js ***!
  \*****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // При клике на кнопку Вверх, движение вверх
  $('#btn_up').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, '400');
  });
  /*
   * Плавная прокрутка страницы до якоря.
   * Добавить класс anchor и в href="#name_anchor" написать название якоря.
   */

  $(document).on('click', '.anchor', function (e) {
    e.preventDefault();
    var anchor = $(this).attr('href'),
        margin = 70,
        offset = $(anchor).offset();

    if (offset) {
      $('html, body').stop().animate({
        scrollTop: offset.top - margin
      }, 400);
    }
  }); // Добавляем класс .active к выбранной радиокнопке, меняем c id = name от радиокнопки_title: заголовок и add

  $('.radio_btn').change(function (e) {
    var self = $(this),
        name = self.find('input').attr('name'),
        title = self.find('span').text(),
        add = self.data('add');
    self.parent().find('.radio_btn').removeClass('active');
    self.addClass('active');
    $('#' + name + '_title').text(title);
    $('#' + name + '_add').text(add);
  });
}, false);

/***/ }),

/***/ "./resources/js/default/scroll.js":
/*!****************************************!*\
  !*** ./resources/js/default/scroll.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // Необходимые данные
  var offset = 20,
      heightScreen = window.innerHeight,
      widthScreen = window.innerWidth || document.body.clientWidth; // Селекторы в коде

  var btn_up = $('#btn_up'); // Код со скролом

  $(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop() || document.documentElement.scrollTop || window.pageYOffset; // Верхняя позиция скрола
    //heightWindow = window.innerHeight // Высота окна браузера
    // pageYOffset Динамическая позиция скрола у верхней кромки

    if (scrollTop < 200) {
      // Кнопка вверх
      btn_up.removeClass('scale-in').addClass('scale-out');
    } else {
      // Кнопка вверх
      btn_up.addClass('scale-in').removeClass('scale-out');
    } // Прилипающее меню

    /*const stickyMenu = document.getElementById('sticky_menu')
    if (stickyMenu) {
         const stickyMenuHeight = stickyMenu.offsetHeight
        if (stickyMenuHeight && document.body.clientWidth > 992 && pageYOffset > stickyMenuHeight) {
            stickyMenu.classList.add('sticky_menu')
        } else {
            stickyMenu.classList.remove('sticky_menu')
        }
    }*/
    // Добавление класса анимации для lg дисплеев (или других, можно выбрать)

    /*const animateBottom = document.querySelectorAll('.animate-bottom-js'),
        animateRight = document.querySelectorAll('.animate-right-js'),
        animateLeft = document.querySelectorAll('.animate-left-js')
     addAnimate(animateBottom)
    addAnimate(animateRight, 'animate-right')
    addAnimate(animateLeft, 'animate-left')*/
    // Вызовите функцию и передайте нужный селектор, который получите выше чем window.onscroll


    function addAnimate(selectorAll) {
      var addClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'animate-bottom';
      var widthScreenAfter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 992;

      if (selectorAll[0] && widthScreen > widthScreenAfter) {
        selectorAll.forEach(function (el) {
          var elTop = el.offsetTop;
          var elHeight = el.offsetHeight,
              container = el.closest('.container.animate-add-parent') && el.closest('.container.animate-add-parent').closest('.container'); // Если есть вложенность, то надо прибавить расстояние от родителя до верха экрана браузера

          if (container) {//elTop = elTop + container.offsetTop
          }

          if (heightScreen + scrollTop - offset > elTop && scrollTop + offset < elTop + elHeight) {
            el.classList.add(addClassName);
          }
        });
      }
    }
  });
}, false);

/***/ }),

/***/ "./resources/js/default/search.js":
/*!****************************************!*\
  !*** ./resources/js/default/search.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var url = '/search-js',
      searchClass = '.search_js',
      searchInput = searchClass + '__input',
      searchChild = searchClass + '__child';
  $(document).on('keyup', searchInput, function () {
    var self = $(this),
        query = self.val(),
        length = query.length,
        child = self.closest(searchClass).find(searchChild);

    if (length > 0) {
      $.ajax({
        type: 'POST',
        url: url,
        data: {
          _token: _token,
          query: query
        },
        success: function success(res) {
          if (res) {
            child.html(res).addClass('active');
          }
        }
      });
    }
  });
}, false);

/***/ }),

/***/ "./resources/js/default/template.js":
/*!******************************************!*\
  !*** ./resources/js/default/template.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./resources/js/default/functions.js");
 // Скрываем элементы с классами .js-hide

$('.js-hide').hide(); // Делаем видимыми элементы с классами .js-none-visible

$('.js-none-visible').show(); // Делаем видимыми элементы с классами .js-none-visible-flex

$('.js-none-visible-flex').css('display', 'flex'); // Отменяем обычное поведение ссылки при клике по класс .prevent-default

$('.prevent-default').click(function () {
  return false;
});
/*
 * Открыть модальное окно по клику на класс .modal_show, при этом нужно указать здесь же атрибут data-modal-id="" и в него вписать id модального окна.
 * Можно задать data-modal-title="" и в него вписать заголовок модального окна.
 */

document.addEventListener('click', function (e) {
  var modalShowClass = 'modal_show',
      block = e.target.classList.contains(modalShowClass) || e.target.closest('.' + modalShowClass) && e.target.closest('.' + modalShowClass).classList.contains(modalShowClass);

  if (block) {
    var modalId = e.target.dataset.modalId || e.target.closest('.' + modalShowClass).dataset.modalId,
        modalTitle = e.target.dataset.modalTitle || e.target.closest('.' + modalShowClass).dataset.modalTitle;

    if (modalId) {
      e.preventDefault();

      if (modalTitle) {
        $('#' + modalId + ' .modal-title').text(modalTitle);
      }

      $('#' + modalId).modal('show');
    }
  }
}); // При клике добавляем класс .active к родителю

$('.click_add_active').click(function () {
  $(this).parent().addClass('active');
}); // При клике в любом месте убираем класс .active у блока с классом .remove_active

document.body.onclick = function (e) {
  var blockClass = 'remove_active',
      blocks = document.querySelectorAll('.' + blockClass),
      blockClick = e.target.classList.contains(blockClass) || e.target.closest('.' + blockClass);

  if (!blockClick) {
    blocks.forEach(function (el) {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {// Одинаковая высота блоков, задать класс у элементов .height-math
  //func.getHeight('height-math')

  /*
   * Один col fluid, другой нет.
   * Bootstrap container fluid one side.
   *
   * В колонку Bootstrap добавить класс .col_const_left или .col_const_right.
   */

  /*var clientWidth = document.body.clientWidth,
      container = document.querySelector('.container')
  if (clientWidth && container) {
      var containerWidth = container.offsetWidth,
          mobileVersion = 991
       // Desktop версии
      if (clientWidth > mobileVersion) {
           // Если ширина клиента больше контейнера Bootstrap
          if (clientWidth > containerWidth) {
              var difference = clientWidth - containerWidth
               // Меняем стили
              $('.col_const_left')
                  .css({
                      marginLeft: difference / 2,
                      maxWidth: (containerWidth / 2) + 'px'
                  })
                  .siblings('div').css('paddingRight', 0)
               $('.col_const_right')
                  .css({
                      marginRight: difference / 2,
                      maxWidth: (containerWidth / 2) + 'px'
                  })
                  .siblings('div').css('paddingLeft', 0)
          }
       // Мобильная версии
      } else {
           // Меняем стили
          $('.col_const_left')
              .css({
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: containerWidth + 'px'
              })
           $('.col_const_right')
              .css({
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: containerWidth + 'px'
              })
       }
  }*/
}, false);

/***/ }),

/***/ "./resources/js/index.js":
/*!*******************************!*\
  !*** ./resources/js/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default */ "./resources/js/default/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./resources/js/components/index.js");
/* harmony import */ var _shop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shop */ "./resources/js/shop/index.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./theme */ "./resources/js/theme/index.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_theme__WEBPACK_IMPORTED_MODULE_3__);
// require('./bootstrap');
// window.Vue = require('vue');
// Замена Bootstrap JS
// npm install bootstrap.native
//window.BSN = require('bootstrap.native/dist/bootstrap-native.min')
// Animate On Scroll
// npm install aos

/*window.AOS = require('aos')
// data-aos="fade-up" fade-down-right flip-left zoom-in
AOS.init({
    duration: 500
})*/
// Parallax
// npm install simple-parallax-js

/*window.simpleParallax = require('simple-parallax-js')
var simpleParallax6 = document.getElementsByClassName('simple_parallax_6');
new simpleParallax(simpleParallax6, {
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)'
})*/



 // import Vue from 'vue'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
// Vue.component('example-component', require('./components/ExampleComponent.vue').default)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/*new Vue({
    el: '#app'
})*/

/***/ }),

/***/ "./resources/js/shop/cart.js":
/*!***********************************!*\
  !*** ./resources/js/shop/cart.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../default/alert */ "./resources/js/default/alert.js");

document.addEventListener('DOMContentLoaded', function () {
  // Проверяем подключен ли jQuery
  if (window.jQuery) {
    // Функция показа корзины, принимает содержимое корзины, в ответе на ajax
    var showCart = function showCart(cart) {
      var modalId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cart_modal';
      // Вставим в модальное окно содержимое корзины
      $('#' + modalId + ' .modal-body').html(cart); // Открыть модальное окно

      $('#' + modalId).modal();
      var cartQty = $('#cart_modal_qty').text(),
          cartQtyClass = $('.cart_count_qty'),
          cartSum = $('#cart_modal_sum').html(),
          cartSumClass = $('.cart_count_sum');
      /*if (cartQty) {
           // Вставляем кол-во из корзины в кнопку вызова
          cartQtyClass.text(cartQty)
      } else {
           // Если нет кол-ва, то скрываем круг для кол-ва
          cartQtyClass.css('opacity', '0')
      }*/

      if (cartSum) {
        // Вставляем сумму из корзины в кнопку вызова
        cartSumClass.html(cartSum);
      } else {
        // Если нет сумму
        cartSumClass.text(translations['cart']);
      }
    };

    // Если есть класс .no_js, то отключаем JS
    if (!$('div').hasClass('no_js')) {
      var urlCart = '/cart/'; // Показать корзину по клику на .cart_show

      $('.cart_show').on('click', function (e) {
        e.preventDefault();
        $.ajax({
          type: 'GET',
          url: urlCart + 'show',
          success: function success(res) {
            showCart(res);
          },
          error: function error() {
            _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
          }
        });
      }); // Добавить в корзину товар по клику на .add_to_cart

      $(document).on('click', '.add_to_cart', function (e) {
        e.preventDefault();
        var self = $(this),
            productId = self.data('product-id'),
            qty = self.closest('.product').find('input[name=qty]').val() || self.closest('.product_show').find('input[name=qty]').val() || 1; // Проверить есть ли в корзине товар

        if (productId) {
          $.ajax({
            type: 'GET',
            url: urlCart + productId + '/add',
            data: {
              qty: qty
            },
            success: function success(res) {
              if (res) {
                // Показать модальное окно
                showCart(res);
              } else {
                // Товар не найден
                _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
              }
            },
            error: function error() {
              _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
            }
          });
        }
      }); // Плюсовать товар в корзине по клику на .cart_plus

      $(document).on('click', '.cart_plus', function (e) {
        e.preventDefault();
        var self = $(this),
            cartKey = self.data('cart-key');
        $.ajax({
          type: 'GET',
          url: urlCart + cartKey + '/plus',
          success: function success(res) {
            if (res) {
              // Показать модальное окно
              showCart(res);
            } else {
              // Товар не найден
              _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
            }
          },
          error: function error() {
            _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
          }
        });
      }); // Минусовать товар из корзины по клику на .cart_minus

      $(document).on('click', '.cart_minus', function (e) {
        e.preventDefault();
        var self = $(this),
            cartKey = self.data('cart-key');
        $.ajax({
          type: 'GET',
          url: urlCart + cartKey + '/minus',
          //data: {cartKey: cartKey},
          success: function success(res) {
            if (res) {
              // Показать модальное окно
              showCart(res);
            } else {
              // Товар не найден
              _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
            }
          },
          error: function error() {
            _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
          }
        });
      }); // Удалить товар из корзину по клику на .cart_remove

      $(document).on('click', '.cart_remove', function (e) {
        e.preventDefault();
        var self = $(this),
            cartKey = self.data('cart-key');
        $.ajax({
          type: 'GET',
          url: urlCart + cartKey + '/remove',
          success: function success(res) {
            if (res) {
              // Показать модальное окно
              showCart(res);
            } else {
              // Товар не найден
              _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
            }
          },
          error: function error() {
            _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
          }
        });
      });
    }
  }
}, false);

/***/ }),

/***/ "./resources/js/shop/filter.js":
/*!*************************************!*\
  !*** ./resources/js/shop/filter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../default/alert */ "./resources/js/default/alert.js");

document.addEventListener('DOMContentLoaded', function () {
  var filterClass = 'filter',
      productsClass = 'products_js',
      documentLocation = document.location,
      url = documentLocation.pathname,
      getParamsStr = documentLocation.search.replace('?', ''),
      filterParams = []; // Ползунок цены ionRangeSlider отлеживаем изменение

  $('.js_range_slider').on('change', function () {
    var self = $(this),
        priceFrom = self.data('from'),
        priceTo = self.data('to');

    if (priceFrom && priceTo) {
      // Добавляем цены от и до в Url
      pushNewUrl('from', priceFrom);
      pushNewUrl('to', priceTo); // Ajax запрос

      if (url) {
        $.ajax({
          type: 'POST',
          url: url,
          data: {
            _token: _token,
            priceFrom: priceFrom,
            priceTo: priceTo
          },
          // Перед запросом
          beforeSend: function beforeSend() {
            beforeSendProduct();
          },
          // При успешном ответе
          success: function success(res) {
            successProduct(res);
          },
          // При ошибке
          error: function error() {
            _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
          }
        });
      }
    }
  }); // Отслеживаем изменение фильтров

  $(document).on('change', '.' + filterClass + ' .filter_form input, .' + filterClass + ' .filter_change_js', function () {
    var checked = $('.' + filterClass + ' .filter_form input:checked, .' + filterClass + ' .filter_change_js option:selected'),
        data = ''; // Получаем отмеченные input

    checked.each(function () {
      if (this.value) {
        data += this.value + '%2C';
      }
    }); // Добавляем фильтры в Url

    pushNewUrl('filter', data);
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        _token: _token,
        filters: data
      },
      // Перед запросом
      beforeSend: function beforeSend() {
        beforeSendProduct();
      },
      // При успешном ответе
      success: function success(res) {
        successProduct(res);
      },
      // При ошибке
      error: function error() {
        _default_alert__WEBPACK_IMPORTED_MODULE_0__.default.get(translations['something_went_wrong']);
      }
    });
  }); // Кнопка сброса Get параметров

  $(document).on('click', '.' + filterClass + ' .reset', function () {
    if (url) {
      url = urlEndSlash(url);
      window.location = url;
    }
  }); // ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
  // Перед запросом

  function beforeSendProduct() {
    // Скрываем все товары
    spinner.fadeIn(300, function () {
      $('.' + productsClass).hide();
    });
  } // При успешном ответе


  function successProduct(res) {
    if (res) {
      // Показываем полученные товары
      spinner.delay(300).fadeOut(300, function () {
        $('.' + productsClass).html(res).fadeIn();
      });
    }
  } // Возвращает Get параметры в массиве


  function getFilterParams() {
    var params = document.location.search.replace('?', '').split('&');

    for (var key in params) {
      filterParams[params[key].split('=')[0]] = params[key].split('=')[1];
    }

    return filterParams;
  }
  /*
   * Отправляем параметры в Url
   * addUrlKey - к примеру 'from'
   * addUrlValue - к примеру 100
   */


  function pushNewUrl(addUrlKey, addUrlValue) {
    var location = document.location,
        urlFull = location.href;

    if (urlFull && addUrlKey) {
      getParamsStr = location.search.replace('?', ''); // Если есть get параметры

      if (getParamsStr) {
        // Если передаваемый параметр есть в Url
        if (getParamsStr.includes(addUrlKey)) {
          // Пересобрать Get параметры
          var getFilters = getFilterParams(),
              i = 0,
              newGetParamsStr = '';

          for (var key in getFilters) {
            if (key === addUrlKey) {
              if (addUrlValue && addUrlValue !== '%2C') {
                // В передаваемый ключ записываем новое передаваемое значение
                getFilters[key] = addUrlValue;
              } else {
                // Если пусто передаваемое значение, удалим из Get
                continue;
              }
            }

            newGetParamsStr += (i ? '&' : '') + key + '=' + getFilters[key];
            i++;
          } // Старое значение передаваемого ключа
          //var urlParamValOld = getFilterParams()[addUrlKey] || ''
          // Заменить старое значение
          //var newGetParamsStr = getParamsStr.replace(urlParamValOld, addUrlValue)
          // Оправить в Url


          history.pushState({}, '', url + (newGetParamsStr ? '?' : '') + newGetParamsStr); // Если пусты параметры фильтра, то перезагрузим страницу

          if (!newGetParamsStr) {
            document.location.href = url;
          } // Если передаваемого параметра нет в Url

        } else {
          // Оправить в Url
          history.pushState({}, '', urlFull + '&' + addUrlKey + '=' + addUrlValue);
        } // Если get параметров нет

      } else {
        urlFull = urlEndSlash(urlFull); // Оправить в Url

        history.pushState({}, '', urlFull + '?' + addUrlKey + '=' + addUrlValue);
      } // Показываем кнопку сброса


      $('.' + filterClass + ' .reset').show();
    }
  } // Проверяем url, если на конце нет слэша, то добавим его


  function urlEndSlash(url) {
    if (url.charAt(url.length - 1) !== '/') {
      return url + '/';
    }

    return url;
  }
}, false);

/***/ }),

/***/ "./resources/js/shop/index.js":
/*!************************************!*\
  !*** ./resources/js/shop/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ "./resources/js/shop/cart.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter */ "./resources/js/shop/filter.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts */ "./resources/js/shop/scripts.js");
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./resources/js/shop/scripts.js":
/*!**************************************!*\
  !*** ./resources/js/shop/scripts.js ***!
  \**************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  /*
   * При клике на Plus или Minus меняем кол-во в Input.
   * Необходимо по центру сделать input type="number" step="1" min="1" value="1", слева - span.minus, справа - span.plus.
   */
  $(document).on('click', '.input_qty .minus', function () {
    var input = $(this).next('input'),
        val = input.val();
    val = parseInt(val) >= 2 ? parseInt(val) - 1 : 1;
    input.val(val);
  });
  $(document).on('click', '.input_qty .plus', function () {
    var input = $(this).prev('input'),
        val = input.val();
    val = parseInt(val) >= 1 ? parseInt(val) + 1 : 2;
    input.val(val);
  }); // При наведении на класс .fancybox_hover показываем соответствующую блок с классом .fancybox_thumbs

  $('.fancybox_hover').hover(function () {
    $('.fancybox_thumbs').hide();
    $('.fancybox_thumbs[rel=' + $(this).data('gallery') + ']').show();
  });
}, false);

/***/ }),

/***/ "./resources/js/theme/index.js":
/*!*************************************!*\
  !*** ./resources/js/theme/index.js ***!
  \*************************************/
/***/ (() => {



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;