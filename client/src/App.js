import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Auth from "./Pages/auth/Auth";
import { FinancialRecordsProvider } from "./context/financeRecord";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";


function App() {
  return (
    <Router>
      <header>
        <nav className="flex justify-between bg-blue-600 p-5">
          <Link to="/"><h1 className="text-3xl font-bold underline text-white">BudgetEasy</h1></Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              {/* Redirect to /auth if user is signed out */}
              <SignedOut>
                <Navigate to="/auth" />
              </SignedOut>
              <SignedIn>
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
              </SignedIn>
            </>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
