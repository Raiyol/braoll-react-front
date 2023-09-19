import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function Ad({ ad_slot }: { ad_slot: string }) {
  const localtion = useLocation();

  useEffect(() => {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({});
  }, [localtion.pathname]);

  return (
    <div key={localtion.pathname}>
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-3048092375513055" data-ad-slot={ad_slot} data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  );
}
