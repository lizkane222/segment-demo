let ajs_write_key = ''
let node_write_key = ''

// Function to update nav spans and persist values
function updateNavSpans() {
    // Elements for AJS
    const ajsInput = document.getElementById('ajs-source-writeKey');
    const ajsNavSpan = document.querySelector('#ajs-nav span');

    // Elements for NODE
    const nodeInput = document.getElementById('node-source-writeKey');
    const nodeNavSpan = document.querySelector('#node-nav span');

    // Ensure elements exist before proceeding
    if (!ajsInput || !ajsNavSpan || !nodeInput || !nodeNavSpan) {
        console.error("Required elements are missing from the DOM.");
        return;
    }

    // Load values from localStorage on page load
    const savedAjsValue = localStorage.getItem('ajs-source-writeKey');
    const savedNodeValue = localStorage.getItem('node-source-writeKey');

    if (savedAjsValue) {
        ajsInput.value = savedAjsValue;
        ajsNavSpan.textContent = savedAjsValue;
        reloadSegmentLibrary(savedAjsValue); // Reload AJS script
    }

    if (savedNodeValue) {
        nodeInput.value = savedNodeValue;
        nodeNavSpan.textContent = savedNodeValue;
    }

    // Update span and save to localStorage when inputs change
    ajsInput.addEventListener('input', () => {
        const value = ajsInput.value.trim();
        if (ajsNavSpan) {
            ajsNavSpan.textContent = value;
            ajs_write_key = value
            console.log('ajs_write_key:', ajs_write_key)
        }
        localStorage.setItem('ajs-source-writeKey', value);
        reloadSegmentLibrary(value); // Reload AJS script
    });

    nodeInput.addEventListener('input', async () => {
        const value = nodeInput.value.trim();
        if (nodeNavSpan) {
            nodeNavSpan.textContent = value;
            node_write_key = value
            console.log('node_write_key:', node_write_key)
        }
        localStorage.setItem('node-source-writeKey', value);

        // Update server-side Node writeKey
        try {
            const response = await fetch('/update-node-write-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ writeKey: value })
            });

            if (response.ok) {
                console.log('Node writeKey updated successfully on the server.');
            } else {
                console.error('Failed to update Node writeKey on the server.');
            }
        } catch (error) {
            console.error('Error updating Node writeKey:', error);
        }
    });
}

// Function to reload the Segment library with a new writeKey
function reloadSegmentLibrary(writeKey) {
    // Remove existing Segment script if it exists
    const existingScript = document.querySelector("script[data-global-segment-analytics-key]");
    if (existingScript) {
        existingScript.remove();
    }

    // Load new Segment script with the new writeKey
    window.analytics = [];
    analytics.load(writeKey, {});
    analytics.page();
}

// Run the function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', updateNavSpans);
// Run the function when the DOM is fully loaded, with a timeout
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateNavSpans, 3000); // Delay execution by 3 seconds
});
