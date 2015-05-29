$(function () {

	'use strict';

	var $mainMenu = $('#mainMenu'),
		$mainMenuOpen = $('.js-menu-open'),
		$mainMenuClose = $('.js-menu-close'),
		$mainMenuAnchor = $('.js-menu-anchor'),
		$html = $('html'),
		$window = $(window),
		mainMenuOpenClass = 'menu_state_open',
		headerSlider, keisesSlider;

	if ($window.width() > 1600) {
		iconMenuPosition();
		$window.resize(iconMenuPosition);
	} else {
		$window.resize(iconMenuPosition);
	}

	// раскрытие меню

	$mainMenuOpen.on('click', function (event) {
		event.stopPropagation();
		$mainMenu.addClass(mainMenuOpenClass);

		$mainMenuClose.on('click', function () {
			$mainMenu.removeClass(mainMenuOpenClass);
		});

		$mainMenu.on('click', function (event) {
			event.stopPropagation();
		});

		$html.on('click', function () {
			$mainMenu.removeClass(mainMenuOpenClass);
		});
	});

	// слайдер в блоке header

	headerSlider = new Swiper ('.header__slider', {
		direction: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.header__slider-pagination',
		paginationHide: false,
		paginationClickable: true
	});

	// слайдер в блоке keises

	keisesSlider = new Swiper ('.keises__slider', {
		direction: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.keises__pagination',
		paginationHide: false,
		paginationClickable: true
	});

	// слайдер в блоке tools

	keisesSlider = new Swiper ('.tools__slider', {
		direction: 'horizontal',
		speed: 200,
		loop: true,
		spaceBetween: 10,
		slidesPerView: 9,
		simulateTouch: false,
		nextButton: '.tools__slider-next',
		prevButton: '.tools__slider-prev'
	});

	// плавный скролл
	$mainMenuAnchor.on('click', function (event) {
		var elemId = $(this).attr('href'),
			elemPosition = $(elemId).offset().top;

		event.preventDefault();
		$('html,body').animate({scrollTop: elemPosition}, 300);
	});

	// позиция иконки меню на больших разрешениях

	function iconMenuPosition() {
		var windowWidth = $window.width(),
			rightPosition = Math.round((windowWidth - 1600) / 2) + 52;

		if ($window.width() > 1600) {
			$mainMenuOpen.css('right', rightPosition);
		} else {
			$mainMenuOpen.css('right', 52);
		}

	}

});
