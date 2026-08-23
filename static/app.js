// Live Clock
function updateClock() {
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  }
}

// Check Service Info
async function fetchSystemStatus() {
  const statusText = document.getElementById('status-text');
  try {
    const res = await fetch('/api/info');
    if (res.ok) {
      const data = await res.json();
      if (statusText) {
        statusText.textContent = `Cluster Environment: ${data.environment.toUpperCase()} · Status: ${data.status}`;
      }
    }
  } catch (err) {
    if (statusText) {
      statusText.textContent = 'Cluster Online (Local Mode)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
  fetchSystemStatus();
});
