<section id="openings" class="openings">
	<div class="openings__wrapper">
		<div class="openings__decoration openings-decoration" aria-hidden="true">
			<div class="openings-decoration__label">
				<span class="openings-decoration__label-inner">Open</span>
			</div>
			<div class="openings-decoration__label">
				<span class="openings-decoration__label-inner">Roles</span>
			</div>
			<span class="openings-decoration__number">
					001
			</span>
		</div>
		<div class="openings__content openings-content ">
			<header class="openings__header openings-header">
				<span class="openings-header__subtitle">Current Openings</span>
				<h2 class="openings-header__title">Open Roles</h2>
			</header>
			<strong class="openings-content__featured">Lorem ipsum dolor sit amet, consectetur adipisp quis nostrud exercitation. /strong>
			<p class="openings-content__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa.</p>
			<a href="#" class="openings-content__button">View All Open Roles</a>
		</div>
		<div class="openings__listings openings-listings">
			<div class="openings__listings-header openings-listings-header">
				<span class="openings-listings-header__title openings-listings-header__title--position">Position</span>
				<span class="openings-listings-header__title openings-listings-header__title--location">Location</span>
				<span class="openings-listings-header__title openings-listings-header__title--duration">Duration</span>
			</div>
			<ul class="openings__list openings-list">
                <?php for($i = 0; $i < 4; $i++) : ?>
					<li class="openings-list__item">
	                    <a href="#" class="openings-list__link">
	                        <span class="openings-list__position">Operations Manager</span>
	                        <span class="openings-list__location">Katy, Tx</span>
	                        <span class="openings-list__duration">Full Time</span>
	                    </a>
	                </li>
				<?php endfor; ?>
			</ul>
		</div>
	</div>
</section>
