import "./globals.css";

export const metadata = {
  title: "Deluxe",
  description: "Code hosting platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
