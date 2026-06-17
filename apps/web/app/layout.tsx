import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Neighbourly - Your Neighborhood Community',
  description: 'Connect with your neighbors, share local information, buy/sell items locally, and build community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
