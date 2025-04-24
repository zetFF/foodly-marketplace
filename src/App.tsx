
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Restaurant from "./pages/Restaurant";
import NotFound from "./pages/NotFound";
// import SignIn from "./pages/SignIn";
// import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CustomerFeatures from "./pages/CustomerFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            {/* <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer-features" element={<CustomerFeatures />} />
            <Route path="/product/:id" element={<NotFound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
