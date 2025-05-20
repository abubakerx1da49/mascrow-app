"use client";

import { useEffect } from "react";

interface AnalyticsCardProps {
  googleAnalyticsId: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ googleAnalyticsId }) => {
  useEffect(() => {
    if (!googleAnalyticsId) return;

    if (!document.getElementById("ga-script")) {
      // Add GA external script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      script1.id = "ga-script";
      document.head.appendChild(script1);

      // Add GA inline config script
      const script2 = document.createElement("script");
      script2.id = "ga-inline-script";
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(script2);
    }
  }, [googleAnalyticsId]);

  return null; // This component does not render visible UI
};

export default AnalyticsCard;
