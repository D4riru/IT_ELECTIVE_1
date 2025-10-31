import { AuthProvider } from './contexts/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Next.js Auth App',
  description: 'A Next.js application with authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}