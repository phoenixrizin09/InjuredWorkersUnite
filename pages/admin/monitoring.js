// pages/admin/monitoring.js
import { useState, useEffect } from 'react';

export default function MonitoringDashboard() {
  const [status, setStatus] = useState({
    site: 'loading',
    data: 'loading',
    actions: 'loading'
  });

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    // Check site
    try {
      await fetch('/');
      setStatus(prev => ({ ...prev, site: 'up' }));
    } catch (e) {
      setStatus(prev => ({ ...prev, site: 'down' }));
    }

    // Check data freshness
    try {
      const res = await fetch('/data/data-summary.json');
      const data = await res.json();
      const lastUpdate = new Date(data.lastUpdated);
      const hoursSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60);
      setStatus(prev => ({ 
        ...prev, 
        data: hoursSinceUpdate < 7 ? 'fresh' : 'stale' 
      }));
    } catch (e) {
      setStatus(prev => ({ ...prev, data: 'error' }));
    }

    // Check GitHub Actions (would need API integration)
    setStatus(prev => ({ ...prev, actions: 'unknown' }));
  };

  const getStatusColor = (stat) => {
    if (stat === 'loading' || stat === 'unknown') return 'gray';
    if (stat === 'up' || stat === 'fresh') return 'green';
    return 'red';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔍 Monitoring Dashboard</h1>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>System Status</h2>
        <ul>
          <li style={{ color: getStatusColor(status.site) }}>
            Site: {status.site.toUpperCase()}
          </li>
          <li style={{ color: getStatusColor(status.data) }}>
            Data: {status.data.toUpperCase()}
          </li>
          <li style={{ color: getStatusColor(status.actions) }}>
            GitHub Actions: {status.actions.toUpperCase()}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Links</h2>
        <ul>
          <li><a href="https://plausible.io/injuredworkersunite.pages.dev" target="_blank">Plausible Analytics</a></li>
          <li><a href="https://uptimerobot.com/" target="_blank">UptimeRobot Dashboard</a></li>
          <li><a href="https://github.com/phoenixrizin09/InjuredWorkersUnite/actions" target="_blank">GitHub Actions</a></li>
          <li><a href="https://dash.cloudflare.com/" target="_blank">Cloudflare Dashboard</a></li>
        </ul>
      </div>
    </div>
  );
}
