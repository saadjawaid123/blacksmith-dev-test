(function () {
    const footerScrollTop = document.getElementById('footer-scroll-top');

	// Scroller Function for Scroll to Top
	function handleScroll () {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	// Add Event Listener to Click to Scroll to Top
	footerScrollTop.addEventListener('click', handleScroll)
})();
