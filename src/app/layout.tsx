import type { Metadata } from "next";
import "./globals.css";
import DashboardLayout from "@/layout/dashboard-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "Remirage Loans",
  description: "Remirage Loans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ClerkProvider
          afterSignOutUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: {
                fontSize: 14,
                textTransform: 'none',
                backgroundColor: '#611BBD',
                '&:hover, &:focus, &:active': {
                  backgroundColor: '#49247A',
                },
              },
              cardBox: {
                boxShadow: "none"
              },
            },
          }}
          signInUrl="/login"
          signUpUrl="/register"
          signInFallbackRedirectUrl="/login"
          signUpFallbackRedirectUrl="/register"

        >
          <DashboardLayout>
            <>
              {children}
            </>
          </DashboardLayout>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
