/*
 * author: Artyom Kayun
 * e-mail: kayun.artem@gmail.com
 */

$(function () {

	'use strict';

	var $mainMenu = $('#mainMenu'),
		$mainMenuOpen = $('.js-menu-open'),
		$mainMenuClose = $('.js-menu-close'),
		$mainMenuAnchor = $('.js-menu-anchor'),
		$mapOpen = $('.js-map-open'),
		$mapText = $('.js-map-text'),
		$mapBg = $('.js-map-bg'),
		$mapPlan = $('.js-map-plan'),
		$keiseContainer = $('.js-keise-open'),
		$keisePag = $('.js-keise-pag'),
		$keiseBtn = $('.js-keise-button'),
		$sliderOpen = $('.js-slider-open'),
		$sliderClose = $('.js-slider-close'),
		$html = $('html'),
		$window = $(window),
		mainMenuOpenClass = 'menu_state_open',
		mapTextHideClass = 'map-wrap_state_hide',
		mapBgHideClass = 'map__bg_state_hide',
		keisePagHideClass = 'keises__pagination_state_hide',
		sliderOpenShowClass = 'keise-open_state_show',
		sliderOpenZClass = 'keises__open_z_11',
		keiseShowClass = 'keises-show',
		keiseWrapHideClass = 'keise-wrap_state_hide',
		keiseTitleHideClass = 'keise__title_state_hide',
		headerSlider, keisesSlider, keisesSliderOpen,
		map, marker,
		slidesObj = {
			'width320': 3,
			'width1300': 6,
			'width1600': 9,
		};

	toolsSliderResize();

	if ($window.width() > 1600) {
		iconMenuPosition();
		$window.resize(function () {
			iconMenuPosition();
			toolsSliderResize()
		});

	} else {
		$window.resize(function () {
			iconMenuPosition();
			toolsSliderResize()
		});
	}

	// раскрытие меню
	// disclosure menu

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
	// slider in the block header

	headerSlider = new Swiper ('.header__slider', {
		direction: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.header__slider-pagination',
		paginationHide: false,
		paginationClickable: true
	});

	// слайдер в блоке keises
	// slider in the block keises

	keisesSlider = new Swiper ('.keises__slider', {
		direction: 'horizontal',
		speed: 500,
		simulateTouch: false,
		pagination: '.keises__pagination',
		paginationHide: false,
		paginationClickable: true
	});

	keisesSliderOpen = new Swiper ('.keises__open', {
		direction: 'horizontal',
		speed: 500,
		simulateTouch: false,
		nextButton: '.keises__open-next',
		prevButton: '.keises__open-prev'
	});

	$keiseContainer.on('click', function() {
		var $this = $(this),
			classOpen = 'keises-open',
			classOpenTopLeft = 'keises-open_pos_tl',
			classOpenTopRight = 'keises-open_pos_tr',
			classOpenBottomLeft = 'keises-open_pos_bl',
			classOpenBottomRight = 'keises-open_pos_br',
			classTopLeft = 'keises__slide-item_pos_tl',
			classTopRight = 'keises__slide-item_pos_tr',
			classBottomLeft = 'keises__slide-item_pos_bl',
			classBottomRight = 'keises__slide-item_pos_br',
			slideIndex;

		slideIndex = $this.attr('data-index');
		keisesSliderOpen.slideTo(slideIndex, 0);

		$this.addClass(classOpen);
		$keisePag.addClass(keisePagHideClass);
		setTimeout(function () {
			$keisePag.hide();
			$keiseBtn.addClass(keiseShowClass);
		}, 500);
		setTimeout(function () {
			$sliderOpen.addClass(sliderOpenZClass);
			$sliderOpen.find('.keise-open').addClass(sliderOpenShowClass);
		}, 1000)
		$this.find('.keise-wrap').addClass(keiseWrapHideClass);
		$this.find('.keise__title').addClass(keiseTitleHideClass);
		if ($this.hasClass(classTopLeft)) {
			$this.siblings('.' + classTopRight).addClass('keises-close_pos_r');
			$this.siblings('.' + classBottomLeft).addClass('keises-close_pos_b');
			$this.siblings('.' + classBottomRight).addClass('keises-close_pos_br');
		}

		if ($this.hasClass(classTopRight)) {
			$this.siblings('.' + classTopLeft).addClass('keises-close keises-close_pos_l');
			$this.siblings('.' + classBottomLeft).addClass('keises-close keises-close_pos_bl');
			$this.siblings('.' + classBottomRight).addClass('keises-close keises-close_pos_b');
		}

		if ($this.hasClass(classBottomLeft)) {
			$this.siblings('.' + classTopRight).addClass('keises-close keises-close_pos_tr');
			$this.siblings('.' + classTopLeft).addClass('keises-close keises-close_pos_t');
			$this.siblings('.' + classBottomRight).addClass('keises-close keises-close_pos_r');
		}

		if ($this.hasClass(classBottomRight)) {
			$this.siblings('.' + classTopRight).addClass('keises-close keises-close_pos_t');
			$this.siblings('.' + classBottomLeft).addClass('keises-close keises-close_pos_l');
			$this.siblings('.' + classTopLeft).addClass('keises-close keises-close_pos_tl');
		}

	})


	// слайдер в блоке tools
	// slider in the block tools

	function toolsSliderResize() {
		var slides, toolsSlider;

		if ($window.width() <= 320) {
			slides = slidesObj.width320;
		} else if ($window.width() > 320 && $window.width() <= 1300) {
			slides = slidesObj.width1300;
		} else if ($window.width() > 1300){
			slides = slidesObj.width1600;
		}

		toolsSlider = new Swiper ('.tools__slider', {
			direction: 'horizontal',
			speed: 200,
			loop: true,
			spaceBetween: 10,
			slidesPerView: slides,
			simulateTouch: false,
			nextButton: '.tools__slider-next',
			prevButton: '.tools__slider-prev'
		});

	}


	// плавный скролл
	// smooth scrolling

	$mainMenuAnchor.on('click', function (event) {
		var elemId = $(this).attr('href'),
			elemPosition = $(elemId).offset().top;

		event.preventDefault();
		$('html,body').animate({scrollTop: elemPosition}, 300);
	});

	// положение иконки меню на больших разрешениях
	// position of the menu icons on the high resolutions

	function iconMenuPosition() {
		var windowWidth = $window.width(),
			rightPosition = Math.round((windowWidth - 1600) / 2) + 52;

		if ($window.width() > 1600) {
			$mainMenuOpen.css('right', rightPosition);
		} else {
			$mainMenuOpen.css('right', 52);
		}

	}

	// карта
	// map

	ymaps.ready(function () {
		map = new ymaps.Map('mapPlan', {
			center: [55.7715,37.6120],
			zoom: 14,
			controls: [
				'geolocationControl',
				'routeEditor',
				'zoomControl',
				'typeSelector'
			]
		});
		marker = new ymaps.Placemark([55.7723, 37.5970]);
	});

	$mapOpen.on('click', function () {
		$mapText.addClass(mapTextHideClass);
		$mapBg.addClass(mapBgHideClass);
		$mapPlan.css('z-index', 2);

		setTimeout(function () {
			map.setCenter([55.7723, 37.5970], 17, {
				duration: 1000
			})
		}, 500);

		setTimeout(function() {
			map.geoObjects.add(marker);
		}, 1500)
	})

});
