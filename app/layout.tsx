import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import tokenStyles from './tokens.module.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Logistics Order Form — Live Shipment Manifest',
  description:
    'A polished logistics order entry interface with a real-time shipment manifest preview. Create shipment orders with live totals, sender/receiver details, and multi-package support.',
  keywords: ['logistics', 'shipping', 'order form', 'shipment manifest', 'waybill'],
  openGraph: {
    title: 'Logistics Order Form — Live Shipment Manifest',
    description: 'Design-first logistics order entry with real-time preview.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${tokenStyles.tokenRoot}`}
    >
      <body>{children}</body>
    </html>
  );
}
