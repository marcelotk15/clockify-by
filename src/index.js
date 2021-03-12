chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// chrome.runtime.sendMessage({ icon: true })

		document.addEventListener('DOMNodeInserted', (e) => {
			const element = e.target;

			if (element.tagName === 'ENTRY-GROUP') {
				const card = element.querySelector('.cl-card')
				const cardHeader = element.querySelector('.cl-card-header')

				const billableHourOfDay = document.createElement('div')
				billableHourOfDay.innerHTML = `
					<div class="cl-d-flex cl-align-items-center">
						<div class="cl-h6 cl-lh-1 cl-align-self-end cl-entry-total-label _clockifyBy__billable--title">Total Billable:</div>
						<div class="cl-h2 cl-mb-0 cl-ml-2 cl-lh-1 _clockifyBy__billable--hours">0</div>
					</div>
				`
				billableHourOfDay.style.margin = '0 2rem 0 auto'

				cardHeader.insertBefore(billableHourOfDay, cardHeader.querySelector('div:last-child'))

				const billableDiv = billableHourOfDay.querySelector('._clockifyBy__billable--hours')

				let hours = moment.duration('00:00')
				
				card.addEventListener('DOMNodeInserted', (e) => {
					if (e.target.tagName === 'TIME-TRACKER-ENTRY' || e.target.tagName === 'PARENT-TRACKER-ENTRY') {
						setTimeout(() => {
							const billable = e.target.querySelector('.cl-timetracker-list-actions .currency')
							const isBillable = billable.classList.contains('billableOn')

							if (!isBillable) return

							const input = e.target.querySelector('.cl-entry-duration input')
								setHours(input, hours, billableDiv)
						}, 1000)
					}
				})
			}
		})

		function setHours(input, hours, target) {
			setTimeout(() => {
				hours.add(moment.duration(input.value))

				target.innerText = moment.utc(hours.asMilliseconds()).format("HH:mm")
			}, 1000)
		}
	}
	}, 10);
});