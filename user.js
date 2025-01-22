// REFACTORING SEGMENT-DEMO.JS FILE TO USER.JS FILE

// ------------------------------------
// VARIABLES : START


// VARIABLES : END
// ------------------------------------



// ------------------------------------
// DOM CONTENT LOADED : START
    document.addEventListener('DOMContentLoaded', () => {
        // ------------------------------------
        // Segment methods as individual buttons : START
        document.getElementById('pageTrigger').addEventListener('click', () => triggerEvent('page'));
        document.getElementById('identifyTrigger').addEventListener('click', () => triggerEvent('identify'));
        document.getElementById('trackTrigger').addEventListener('click', () => triggerEvent('track'));
        document.getElementById('groupTrigger').addEventListener('click', () => triggerEvent('group'));
        document.getElementById('aliasTrigger').addEventListener('click', () => triggerEvent('alias'));
        // Segment methods as individual buttons : END
        // ------------------------------------


        // ------------------------------------
        // TOOLTIP : START
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);

        let hoverTimeout;

        const showTooltip = (e) => {
            const target = e.target;
            const tooltipText = target.getAttribute('data-tooltip');
            if (tooltipText) {
                hoverTimeout = setTimeout(() => {
                    tooltip.textContent = tooltipText;
                    tooltip.style.left = `${e.pageX + 0}px`;
                    tooltip.style.top = `${e.pageY + 15}px`;
                    tooltip.classList.add('show');
                }, 2000); // Delay of 2 seconds
            }
        };

        const moveTooltip = (e) => {
            if (tooltip.classList.contains('show')) {
                tooltip.style.left = `${e.pageX + 0}px`;
                tooltip.style.top = `${e.pageY + 15}px`;
            }
        };

        const hideTooltip = () => {
            clearTimeout(hoverTimeout); // Clear timeout to prevent tooltip from showing
            tooltip.classList.remove('show');
        };

        document.body.addEventListener('mouseover', showTooltip);
        document.body.addEventListener('mousemove', moveTooltip);
        document.body.addEventListener('mouseout', hideTooltip);
        // TOOLTIP : END
        // ------------------------------------
        
        
        
        // ------------------------------------
        //  : START
        //  : END
        // ------------------------------------
        
    });
// DOM CONTENT LOADED : END
// ------------------------------------


// ------------------------------------
// DOM EVENT LISTENERS : START

    document.getElementById('newCampaign').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission and page reload
        updateCampaignFormAndQueryString();
    });

// DOM EVENT LISTENERS : END
// ------------------------------------





// ------------------------------------
// SEGMENT METHODS : START
// SEGMENT METHODS : END
// ------------------------------------







// ------------------------------------
// GET FORM : START
// GET FORM : END
// ------------------------------------


// ------------------------------------
// UPDATE FORM : START
// UPDATE FORM : END
// ------------------------------------

