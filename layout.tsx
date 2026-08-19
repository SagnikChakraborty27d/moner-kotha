import "./globals.css";

export const metadata = {
  title: "Moner Kotha",
  description: "Bengali music, Pujo & Old Calcutta",
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
