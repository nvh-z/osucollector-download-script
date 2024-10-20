// for this method to work you first need to scroll down the infinite scroll
async function clickDirectButtons() {
    // find all cards with maps
    const listGroups = document.querySelectorAll('.list-group.list-group-flush');

    const clickButton = async (button) => {
        return new Promise((resolve) => {
            // emulate a real click to prevent issues?
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            button.dispatchEvent(event); // dispatch the click event
            console.log('Clicked a "Direct" button.');

            setTimeout(() => {
                resolve();
            }, 2000);
        });
    };

    // loop through maps (one direct per map)
    for (const group of listGroups) {
       // skip the groups if clicked already
        if (group.hasAttribute('data-clicked')) {
            continue;
        }

        // find the first direct text link in a card (map)
        const directButton = Array.from(group.querySelectorAll('a small'))
            .find(el => el.textContent.trim() === 'Direct');

        // if found, click it and mark the entire group as clicked to avoid duplicates
        if (directButton) {
            const button = directButton.closest('a');
            group.setAttribute('data-clicked', 'true');
            await clickButton(button);
        }
    }
}

// run this in browser console
clickDirectButtons();