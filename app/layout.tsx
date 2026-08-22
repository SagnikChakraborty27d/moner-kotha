import "./globals.css";

export const metadata = {
  title: "Moner Kotha | শহরটা গান গায় যখন",
  description: "Experience the lanes of nostalgia, local music, and the spirit of Kolkata.",
  icons: {
    icon: '/07929bcb-b11c-4334-a2d5-b45c967a34c1.png',
    apple: '/07929bcb-b11c-4334-a2d5-b45c967a34c1.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
