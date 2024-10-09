import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import img from "./../../assests/expense.jpg";

function Auth(){
    return ( 
      <div className="flex h-screen gap-10">
        {/* Left Side with Image */}
        <div className="w-1/2  flex items-center justify-center">
          <img
            src={img}
            alt="Sign In Illustration"
            className="w-3/4 h-auto object-cover"
          />
        </div>

        {/* Right Side with Sign In */}
        <div className="w-1/2 h-auto flex items-center justify-center">
          <div className="flex flex-col items-center justify-center  w-3/4">
            <SignedOut >
              <h2 className="text-3xl font-bold mb-6">Sign In to BudgetEasy</h2>
              <SignIn path="/auth" routing="path" />
            </SignedOut>
            <SignedIn>
              <Navigate to="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    );
}

export default Auth;