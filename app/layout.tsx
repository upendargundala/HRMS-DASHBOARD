import { ThemeProvider } from "@/src/components/ThemeToggle";
import { AuthProvider } from "@/src/context/AuthContext";
import { LanguageProvider } from "@/src/context/LanguageContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
