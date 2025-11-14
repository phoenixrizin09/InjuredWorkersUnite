export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>Injured Workers Unite</h1>
      <p>
        Welcome to Injured Workers Unite - A digital sanctuary for injured workers and disability advocates.
      </p>
      <p>
        <strong>Status:</strong> Site is live and operational.
      </p>
      <hr />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        To view analytics, go to your{' '}
        <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer">
          Cloudflare Dashboard
        </a>
        {' '} → Analytics & Logs → Web Analytics
      </p>
    </div>
  );
}
