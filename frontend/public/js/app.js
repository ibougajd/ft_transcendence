document.addEventListener('DOMContentLoaded', () => {
    log('Dashboard initialized. Connecting to microservices...');
    checkAllServices();
});

const services = [
    { id: 'auth', url: '/api/auth' },
    { id: 'chat', url: '/api/chat' },
    { id: 'user', url: '/api/user' }
];

async function checkAllServices() {
    for (const service of services) {
        await checkService(service.id, service.url);
    }
}

async function checkService(cardId, url) {
    const badge = document.getElementById(`${cardId}-status`);
    badge.innerHTML = 'Testing...';
    badge.className = 'status-badge';

    log(`Pinging ${cardId.toUpperCase()} Service at ${url}...`);

    try {
        const start = Date.now();
        const response = await fetch(url);
        const text = await response.text();
        const duration = Date.now() - start;

        if (response.ok) {
            badge.innerHTML = `<i class="fa-solid fa-check-circle"></i> Online (${duration}ms)`;
            badge.className = 'status-badge active';
            log(`[SUCCESS] ${cardId.toUpperCase()} responded: "${text}"`, 'success');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        badge.innerHTML = `<i class="fa-solid fa-exclamation-triangle"></i> Offline`;
        badge.className = 'status-badge error';
        log(`[ERROR] Failed to reach ${cardId.toUpperCase()}: ${error.message}`, 'error');
    }
}

function log(message, type = 'info') {
    const consoleDiv = document.getElementById('console-output');
    const line = document.createElement('div');
    line.className = 'log-line';

    const time = new Date().toLocaleTimeString();
    let color = '#e2e8f0'; // Default
    if (type === 'success') color = '#4ade80';
    if (type === 'error') color = '#f87171';

    line.innerHTML = `<span class="timestamp">[${time}]</span> <span style="color:${color}">${message}</span>`;

    consoleDiv.appendChild(line);
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
