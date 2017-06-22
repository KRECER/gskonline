(function() {

	var modalContent = document.querySelector('.modal-content'),
			modalPreInf = document.querySelector('.modal-preinf'),
			modalOverlay = document.querySelector('.modal-overlay'),
			phenomenon = document.querySelectorAll('.main-nav__item a')[2],
			modalBtnClose = modalContent.querySelector('.modal-content__close'),
			ModalPreInfClose = document.querySelector('.modal-preinf__close'),
			preInfLink = document.querySelectorAll('.main-nav__item a')[3];

	phenomenon.addEventListener('click', function(e) {
		e.preventDefault();
		if (!modalContent.classList.contains('modal-content--show')) {
			modalContent.classList.add('modal-content--show');
			modalOverlay.classList.add('modal-overlay--show');
		} else {
			modalContent.classList.remove('modal-content--show');
		}
	});

	modalBtnClose.addEventListener('click', function() {
		modalContent.classList.remove('modal-content--show');
		modalOverlay.classList.remove('modal-overlay--show');
	});

	ModalPreInfClose.addEventListener('click', function() {
		modalPreInf.classList.remove('modal-preinf--show');
		modalOverlay.classList.remove('modal-overlay--show');
	});

	modalOverlay.addEventListener('click', function() {
		modalContent.classList.remove('modal-content--show');
		modalPreInf.classList.remove('modal-preinf--show');
		modalOverlay.classList.remove('modal-overlay--show');
	});


	preInfLink.addEventListener('click', function(e) {
		e.preventDefault();
		if (!modalPreInf.classList.contains('modal-preinf--show')) {
			modalPreInf.classList.add('modal-preinf--show');
			modalOverlay.classList.add('modal-overlay--show');
		} else {
			modalPreInf.classList.remove('modal-preinf--show');
			modalOverlay.classList.remove('modal-overlay--show');
		}
	});


})();