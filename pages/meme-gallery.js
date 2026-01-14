import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Meme Gallery - Redirects to Memetic Embassy
 */
export default function MemeGallery() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to memetic embassy
    router.replace('/memetic-embassy');
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
      <p>Redirecting to Memetic Embassy...</p>
    </div>
  );
}
