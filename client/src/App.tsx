import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TrekDetail from "./pages/TrekDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Gallery from "./pages/Gallery";
import GalleryAdmin from "./pages/GalleryAdmin";
import Legal from "./pages/Legal";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If not navigating to an in-page anchor hash, always scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Google Analytics route tracking for Single Page Application
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "page_view", {
        page_path: location,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/trek/:slug"} component={TrekDetail} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/admin"} component={GalleryAdmin} />
        <Route path={"/privacy-policy"}>
          {() => <Legal type="privacy" />}
        </Route>
        <Route path={"/terms-of-service"}>
          {() => <Legal type="terms" />}
        </Route>
        <Route path={"/terms"}>
          {() => <Legal type="terms" />}
        </Route>
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
