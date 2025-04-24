"use client";
import "./globals.css";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Store, Persistor } from "@/Components/Redux/Store"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
