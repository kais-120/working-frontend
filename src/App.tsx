
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import LoginRole from "@/role/LoginRole";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

import Layout from "./components/layout/Layout";

// Context
import { AppProvider } from "./context/AppContext";
import Register from "./pages/Register";
import AuthRole from "./role/AuthRole";
import Dashboard from "./pages/Dashboard";
import UsersManger from "./pages/UsersManger";
import BookingManger from "./pages/BookingManger";
import BookingDashboard from "./pages/Test";
import ClientBooking from "./pages/ClientBooking";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentDenied from "./pages/PaymentDenied";
import ReviewManger from "./pages/ReviewManger";
import Email from "./pages/dashboard/profile/Email";
import Password from "./pages/dashboard/profile/Password";
import VerifyPayment from "./pages/dashboard/VerifyPayment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/membership" element={<Layout><Membership /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route element={<LoginRole />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/payment" element={<Layout><Payment /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            <Route path="/test" element={<BookingDashboard />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/fail" element={<PaymentDenied />} />
            <Route element={<AuthRole allowRole={["admin","owner","client"]} />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route element={<AuthRole allowRole={["admin","owner"]} />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="manger/booking" element={<BookingManger />} />
                  <Route path="verify-payment" element={<VerifyPayment />} />
                </Route>
                <Route element={<AuthRole allowRole={["admin"]} />}>
                  <Route path="users" element={<UsersManger />} />
                  <Route path="reviews" element={<ReviewManger />} />
                </Route>
                <Route element={<AuthRole allowRole={["client"]} />}>
                  <Route path="booking" element={<ClientBooking />} />
                </Route>
                  <Route path="profile" element={<Profile />}/>
                  <Route path="profile/email" element={<Email />}/>
                  <Route path="profile/password" element={<Password />}/>
              </Route>
            </Route>
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;