import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/redux/ReduxProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata = {
  title: "Scheduly",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
