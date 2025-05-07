"use client";
import "./globals.css";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Store, Persistor } from "@/Components/Redux/Store"
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <Toaster toastOptions={{ duration: 2000 }} />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
