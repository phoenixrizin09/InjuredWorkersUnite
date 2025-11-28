// Redirect to unified THE EYE ORACLE page
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EyeOracleRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/the-eye-oracle');
  }, [router]);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f23',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👁️</div>
        <p>Redirecting to THE EYE ORACLE...</p>
      </div>
    </div>
  );
}
