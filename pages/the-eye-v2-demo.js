import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * The Eye v2 Demo - Redirects to The Eye Oracle main page
 */
export default function TheEyeV2Demo() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to The Eye Oracle
    router.replace('/the-eye-oracle');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#00ffff'
    }}>
      <p>Redirecting to The Eye Oracle...</p>
    </div>
  );
}
