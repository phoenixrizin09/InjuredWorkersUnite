import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/**
 * ADMIN DASHBOARD - The Eye / Oracle System
 * 
 * Central control panel for:
 * - Case review workflow (DRAFT -> REVIEW -> APPROVED -> PUBLISHED)
 * - Alert management
 * - Target monitoring
 * - System statistics
 * - Manual scan triggers
 */

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [recentScans, setRecentScans] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('DRAFT');
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'cases') {
      fetchCases(statusFilter);
    }
  }, [activeTab, statusFilter]);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent alerts
      const alertsRes = await fetch('/api/alerts?limit=10');
      const alertsData = await alertsRes.json();
      if (alertsData.success) {
        setAlerts(alertsData.data);
      }

      // Fetch recent scans
      const scansRes = await fetch('/api/scan');
      const scansData = await scansRes.json();
      if (scansData.success) {
        setRecentScans(scansData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  }

  async function fetchCases(status) {
    try {
      const res = await fetch(`/api/cases?status=${status}&limit=50`);
      const data = await res.json();
      if (data.success) {
        setCases(data.data);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  }

  async function handleCaseAction(caseId, action) {
    try {
      const res = await fetch(`/api/cases/${caseId}/workflow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, actor: 'admin' }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: `Case ${action}ed successfully` });
        fetchCases(statusFilter);
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  }

  async function handleManualScan() {
    try {
      setScanning(true);
      setMessage({ type: 'info', text: 'Scanning all sources...' });
      
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sources: 'all' }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Scan complete! Found ${data.data.items_found} items, created ${data.data.alerts_created} alerts` 
        });
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setScanning(false);
    }
  }

  async function handleMigration() {
    try {
      setMessage({ type: 'info', text: 'Migrating data from real-data-generator...' });
      
      const res = await fetch('/api/migrate', {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: `Migration complete! Created ${data.data.casesCreated} cases, ${data.data.targetsCreated} targets, ${data.data.alertsCreated} alerts` 
        });
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  }

  const severityColors = {
    critical: 'bg-red-600',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const statusColors = {
    DRAFT: 'bg-gray-500',
    UNDER_REVIEW: 'bg-blue-500',
    APPROVED: 'bg-green-500',
    PUBLISHED: 'bg-purple-500',
    RETRACTED: 'bg-red-500',
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | The Eye Oracle</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl">👁️</Link>
                <h1 className="text-xl font-bold">The Eye Oracle - Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleManualScan}
                  disabled={scanning}
                  className={`px-4 py-2 rounded font-medium ${
                    scanning 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {scanning ? '🔄 Scanning...' : '🔍 Scan Sources'}
                </button>
                <Link 
                  href="/the-eye-oracle" 
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  View Public Site →
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Message */}
        {message && (
          <div className={`max-w-7xl mx-auto px-4 mt-4`}>
            <div className={`p-4 rounded ${
              message.type === 'success' ? 'bg-green-800' :
              message.type === 'error' ? 'bg-red-800' :
              'bg-blue-800'
            }`}>
              {message.text}
              <button 
                onClick={() => setMessage(null)}
                className="float-right"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex gap-2 border-b border-gray-700">
            {['overview', 'cases', 'alerts', 'scans', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 capitalize ${
                  activeTab === tab 
                    ? 'border-b-2 border-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl">👁️</div>
              <p className="mt-4 text-gray-400">Loading...</p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Cases Stats */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase">Total Cases</h3>
                    <p className="text-3xl font-bold mt-2">{stats.cases?.total || 0}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Draft</span>
                        <span>{stats.cases?.byStatus?.DRAFT || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Under Review</span>
                        <span>{stats.cases?.byStatus?.UNDER_REVIEW || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Published</span>
                        <span>{stats.cases?.byStatus?.PUBLISHED || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alerts Stats */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase">Alerts</h3>
                    <p className="text-3xl font-bold mt-2">{stats.alerts?.total || 0}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-400">🚨 Critical</span>
                        <span>{stats.alerts?.critical || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-400">⚠️ Unacknowledged</span>
                        <span>{stats.alerts?.unacknowledged || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Targets Stats */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase">Targets</h3>
                    <p className="text-3xl font-bold mt-2">{stats.targets?.total || 0}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-400">Critical Threat</span>
                        <span>{stats.targets?.critical || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-400">Active Monitoring</span>
                        <span>{stats.targets?.active || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Last Scan */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-gray-400 text-sm uppercase">Last Scan</h3>
                    <p className="text-xl font-bold mt-2">
                      {stats.scans?.lastScan 
                        ? new Date(stats.scans.lastScan.completed_at || stats.scans.lastScan.started_at).toLocaleString()
                        : 'Never'
                      }
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={handleMigration}
                        className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                      >
                        🔄 Import Real Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cases Tab */}
              {activeTab === 'cases' && (
                <div>
                  {/* Status Filter */}
                  <div className="flex gap-2 mb-6">
                    {['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'PUBLISHED', 'RETRACTED'].map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded text-sm ${
                          statusFilter === status 
                            ? statusColors[status] 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Cases List */}
                  <div className="space-y-4">
                    {cases.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No cases with status: {statusFilter}
                      </div>
                    ) : (
                      cases.map(caseItem => (
                        <div 
                          key={caseItem.id} 
                          className="bg-gray-800 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-xs ${severityColors[caseItem.severity]}`}>
                                  {caseItem.severity.toUpperCase()}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs ${statusColors[caseItem.status]}`}>
                                  {caseItem.status}
                                </span>
                                <span className="text-gray-400 text-sm">{caseItem.category}</span>
                              </div>
                              <h3 className="text-lg font-semibold mt-2">{caseItem.title}</h3>
                              <p className="text-gray-400 text-sm mt-1">{caseItem.summary?.substring(0, 200)}...</p>
                              <p className="text-gray-500 text-xs mt-2">
                                Created: {new Date(caseItem.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              {caseItem.status === 'DRAFT' && (
                                <button
                                  onClick={() => handleCaseAction(caseItem.id, 'submit')}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                                >
                                  Submit for Review
                                </button>
                              )}
                              {caseItem.status === 'UNDER_REVIEW' && (
                                <button
                                  onClick={() => handleCaseAction(caseItem.id, 'approve')}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                                >
                                  Approve
                                </button>
                              )}
                              {caseItem.status === 'APPROVED' && (
                                <button
                                  onClick={() => handleCaseAction(caseItem.id, 'publish')}
                                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                                >
                                  Publish
                                </button>
                              )}
                              {caseItem.status !== 'RETRACTED' && (
                                <button
                                  onClick={() => handleCaseAction(caseItem.id, 'retract')}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                                >
                                  Retract
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                        alert.severity === 'critical' ? 'border-red-500' :
                        alert.severity === 'high' ? 'border-orange-500' :
                        alert.severity === 'medium' ? 'border-yellow-500' :
                        'border-green-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${severityColors[alert.severity]}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-gray-400 text-sm">{alert.category}</span>
                        {alert.verified && <span className="text-green-400 text-xs">✓ Verified</span>}
                      </div>
                      <h3 className="text-lg font-semibold mt-2">{alert.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{new Date(alert.created_at).toLocaleString()}</span>
                        {alert.source_url && (
                          <a 
                            href={alert.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View Source →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Scans Tab */}
              {activeTab === 'scans' && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button
                      onClick={handleManualScan}
                      disabled={scanning}
                      className={`px-4 py-2 rounded font-medium ${
                        scanning 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {scanning ? '🔄 Scanning...' : '🔍 Run Manual Scan'}
                    </button>
                  </div>
                  
                  {recentScans.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      No scans recorded yet. Run a manual scan to get started.
                    </div>
                  ) : (
                    recentScans.map(scan => (
                      <div key={scan.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                scan.status === 'completed' ? 'bg-green-600' :
                                scan.status === 'running' ? 'bg-blue-600' :
                                'bg-red-600'
                              }`}>
                                {scan.status}
                              </span>
                              <span className="text-gray-400">{scan.source}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              Started: {new Date(scan.started_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{scan.items_found || 0} items</p>
                            <p className="text-sm text-gray-400">
                              {scan.alerts_created || 0} alerts created
                            </p>
                          </div>
                        </div>
                        {scan.error && (
                          <p className="text-red-400 text-sm mt-2">Error: {scan.error}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <h2 className="text-xl font-bold mb-6">System Settings</h2>
                  
                  <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">🔔 Alert Delivery</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Configure where alerts are sent. Set environment variables to enable each channel.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={stats?.settings?.telegram_enabled ? 'text-green-400' : 'text-red-400'}>
                            {stats?.settings?.telegram_enabled ? '✓' : '✗'}
                          </span>
                          <span>Telegram: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={stats?.settings?.email_enabled ? 'text-green-400' : 'text-red-400'}>
                            {stats?.settings?.email_enabled ? '✓' : '✗'}
                          </span>
                          <span>Email: RESEND_API_KEY, ALERT_EMAILS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={stats?.settings?.webhook_enabled ? 'text-green-400' : 'text-red-400'}>
                            {stats?.settings?.webhook_enabled ? '✓' : '✗'}
                          </span>
                          <span>Webhook: CUSTOM_WEBHOOK_URL</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">📊 Workflow</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={stats?.settings?.require_approval ? 'text-green-400' : 'text-yellow-400'}>
                            {stats?.settings?.require_approval ? '✓ Enabled' : '⚠️ Disabled'}
                          </span>
                          <span>Require approval before publishing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={!stats?.settings?.auto_publish ? 'text-green-400' : 'text-yellow-400'}>
                            {!stats?.settings?.auto_publish ? '✓ Manual' : '⚠️ Auto'}
                          </span>
                          <span>Manual publishing mode</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">🛠️ Quick Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handleMigration}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                        >
                          Import Real Data Cases
                        </button>
                        <button
                          onClick={handleManualScan}
                          disabled={scanning}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm disabled:opacity-50"
                        >
                          Scan All Sources
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>👁️ The Eye Oracle System v2.0</p>
            <p className="mt-1">Admin access only - All actions are logged</p>
          </div>
        </footer>
      </div>
    </>
  );
}
