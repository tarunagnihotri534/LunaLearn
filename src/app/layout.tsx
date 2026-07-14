import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navigation from "../components/Navigation";

const hubotSans = localFont({
  src: "../../public/HubotSans-VariableFont_wdth,wght.ttf",
  variable: "--font-hubot-sans",
});

export const metadata: Metadata = {
  title: "YouAreOkay - Menstrual Education & Comfort Space",
  description: "A private, safe, and friendly space for girls aged 10-15 to learn about periods, track dates, and check in with their moods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${hubotSans.variable} font-sans min-h-full flex flex-col bg-cream text-charcoal`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 flex flex-col pt-16">
              {children}
            </main>
            
            {/* Global Sticky Footer Medical Disclaimer */}
            <footer className="bg-soft-rose border-t border-primary/10 py-6 px-4 md:px-8 mt-auto text-center z-10">
              <div className="max-w-4xl mx-auto space-y-2">
                <p className="text-primary font-semibold text-sm tracking-wide uppercase">
                  Reassurance & Educational Space
                </p>
                <p className="text-xs text-warm-gray leading-relaxed max-w-2xl mx-auto">
                  <strong>Disclaimer:</strong> YouAreOkay is built to help you learn, feel comfortable, and track your cycle. It is not a medical tool and does not provide diagnoses. Always talk to a trusted adult, school nurse, or doctor if you have questions or concerns about your health.
                </p>
                <p className="text-[10px] text-warm-gray/60">
                  © {new Date().getFullYear()} YouAreOkay. Designed with privacy, safety, and comfort in mind.
                </p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
