(function () {
    const siteNavigation = document.getElementById('navigation');
	const mobileNavTrigger = document.getElementById('navigation-header-mobile-toggle');
	const mobileNavTriggerTitle = document.getElementById('navigation-header-mobile-toggle-title');
	const submenuToggleButtons = document.querySelectorAll('.navigation-menu__submenu-toggle');
    let mobileMenuOpen = false;

    // Mobile Menu Toggle Active
    function toggleMobileActive () {
	    siteNavigation.classList.toggle('navigation--mobile-active');
		mobileNavTriggerTitle.innerHTML = mobileMenuOpen ? 'Close' : 'Menu';
	}

    // Toggle Submenu Elements
    function toggleSubmenuActive (submenuParent) {
		submenuParent.classList.toggle('navigation-menu__item--submenu-active');
	}

    // Adding Event Listeners to Touch and Click Events
	function setupClickEventListener (element, functionCall) {
		if (typeof window.ontouchstart === 'undefined') {
			element.addEventListener('click', functionCall)
		} else {
			element.addEventListener('touchstart', functionCall)
		}
	}

    // Set Sticky Navigation on Scroll
	function setStickyNav (currentScroll) {
		if (currentScroll > 0) {
			siteNavigation.classList.add('navigation--sticky')
		} else {
			siteNavigation.classList.remove('navigation--sticky')
		}
	}

    // Add Event Listener to Window to Check if Navigation Has Scrolled
	function handleScroll () {
		const currentScroll = document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop

		setStickyNav(currentScroll)
	}

    // Initialize Mobile Menu Toggle Event
	setupClickEventListener(mobileNavTrigger, toggleMobileActive)

    // Initialize Submenu Toggle Event
    for(let i = 0; i < submenuToggleButtons.length;  i++) {
        setupClickEventListener(submenuToggleButtons[i], () => {
			const submenuParent = submenuToggleButtons[i].closest('.navigation-menu__item--has-submenu')
			toggleSubmenuActive(submenuParent)
		})
    }

    // Add Event Listener to Window to Check if Navigation Has Scrolled
    window.addEventListener('scroll', handleScroll)
})();
