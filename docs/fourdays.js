let didAnimateFoodCards = false;

function animateFoodCards() {
	if (didAnimateFoodCards) return;

	didAnimateFoodCards = true;

	const onionCard = document.querySelector("#onion-card");
	const bananaCard = document.querySelector("#banana-card");
	const appleCard = document.querySelector("#apple-card");

	const onionTimeline = anime.timeline({ duration: 1200 });
	const bananaTimeline = anime.timeline({ duration: 1200 });
	const appleTimeline = anime.timeline({ duration: 1200 });

	const fadeOut = { scale: [1, 1.2, 0], opacity: [1, 0.5, 0] };
	const fadeIn = { scale: [0, 1.2, 1], opacity: [0, 0.5, 1] };

	onionTimeline.add({
		targets: ["#onion-card"],
		delay: 100,
		...fadeOut,
		complete: function () {
			onionCard.src = "images/card/pork.png";
		}
	});

	onionTimeline.add({ targets: ["#onion-card"], ...fadeIn });

	bananaTimeline.add({
		targets: ["#banana-card"],
		delay: 300,
		...fadeOut,
		complete: function () {
			bananaCard.src = "images/card/rice.png";
		}
	});
	bananaTimeline.add({ targets: ["#banana-card"], ...fadeIn });

	appleTimeline.add({
		targets: ["#apple-card"],
		...fadeOut,
		complete: function () {
			appleCard.src = "images/card/grapes.png";
		}
	});

	appleTimeline.add({ targets: ["#apple-card"], ...fadeIn });
}

function onElementVisible(selector, block) {
	var observer = new IntersectionObserver(
		function (entries) {
			if (entries[0].isIntersecting === true) {
				block();
			}
		},
		{ threshold: [1] }
	);

	observer.observe(document.querySelector(selector));
}

document.addEventListener("DOMContentLoaded", function () {
	onElementVisible("#oat-card", animateFoodCards);
});
