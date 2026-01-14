import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Eye Oracle - Redirects to Eye Oracle Reports page
 */
export default function EyeOracle() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to eye oracle reports
    router.replace('/eye-oracle-reports');
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
      <p>👁️ Redirecting to Eye Oracle Reports...</p>
    </div>
  );
}
