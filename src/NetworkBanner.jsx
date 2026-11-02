import React, { useState, useEffect } from 'react';

export default function NetworkBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [tunnelError, setTunnelError] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTunnelError(false);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Optional: Simple heartbeat check to simulate detecting a 502 Bad Gateway / Tunnel drop
    const checkTunnel = async () => {
      try {
        // Pings the current host to see if the tunnel dropped
        const res = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
        if (!res.ok) setTunnelError(true);
      } catch (e) {
        // If fetch fails entirely due to network/tunnel failure
        if (navigator.onLine) {
          setTunnelError(true);
        }
      }
    };

    const interval = setInterval(checkTunnel, 30000); // Check every 30s

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (isOnline && !tunnelError) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3 text-center text-sm font-medium sticky top-0 z-50 flex items-center justify-center space-x-3 shadow-md">
      <span>
        ⚠️ {!isOnline ? 'You are currently offline. Check your internet connection.' : 'Connection unstable or tunnel interrupted (502 / Gateway error detected).'}
      </span>
      <button
        onClick={() => window.location.reload()}
        className="bg-white text-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-gray-100 transition"
      >
        Reconnect / Retry
      </button>
    </div>
  );
}