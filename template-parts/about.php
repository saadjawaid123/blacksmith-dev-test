<section id="about" class="about">
	<div class="about__decoration about-decoration" aria-hidden="true">
		<div class="about-decoration__label">
			<span class="about-decoration__label-inner">About</span>
		</div>
		<div class="about-decoration__label">
			<span class="about-decoration__label-inner">Us</span>
		</div>
		<span class="about-decoration__number">003</span>
	</div>
	<div class="about__content about-content">
		<picture class="about-content__picture">
			<img src="src/images/about/main.jpg" alt="" class="about-content__image">
		</picture>
		<header class="about__header about-header">
			<span class="about-header__subtitle">Core Values</span>
			<h2 class="about-header__title">What we're<br>all about</h2>
		</header>
		<strong class="about-content__featured">Lorem ipsum dolor sit amet, consectetur adipisp quis nostrud exercitation ullam.</strong>
		<p class="about-content__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
	</div>
	<div class="about__cards about-cards">
        <?php for($i = 1; $i < 5; $i++) : ?>
			<article class="card-item">
	        	<div class="card-item__decoration card-item-decoration" aria-hidden="true">
	        		<span class="card-item-decoration__text"><?php echo '00' . $i; ?></span>
	        	</div>
	        	<img src="src/images/about/icon.svg" alt="" class="card-item__icon">
	        	<h3 class="card-item__title">Safety</h3>
	        	<p class="card-item__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
	        </article>
		<?php endfor; ?>
	</div>
</section>
