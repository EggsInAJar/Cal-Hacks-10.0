import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, Unauthenticated } from "convex/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Preferences from './pages/Preferences'
import Friends from './pages/Friends'
import NoPage from './pages/NoPage'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey="pk_test_bmVlZGVkLWh5ZW5hLTY3LmNsZXJrLmFjY291bnRzLmRldiQ">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Routes>
            {/* <Authenticated> */}
              <Route index element={<App />} />
              <Route path="/home" element = {<App />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="*" element={<NoPage />} />
            {/* </Authenticated> */}
          </Routes>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);