import ErrorBoundary from "components/layout/error-boundary";
import useHttp from "hooks/useHttp";
import useStore from "hooks/useStore";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/routes";
import GlobalStyles from "styles";
import { domains } from "utils/helpers/enums/shared.enums";

function App() {
  const { setDarkTheme, getDomainType } = useStore();
  const { configureHeaders, configureInterceptors, getCurrentOrganization } = useHttp();

  const updateTheme = () => {
    const queryParams = new URLSearchParams(window.location.search);
    let theme = queryParams.get('theme');
    if (theme !== "dark" && theme !== "light") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    if (theme === "dark") {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
    const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (themeColorMetaTag) {
      themeColorMetaTag.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
    }
  };

  const getScreenInfo = () => {
    const { innerWidth: width, innerHeight: height } = window;
    document.body.style.setProperty("--width", `${width}px`);
    document.body.style.setProperty("--height", `${height}px`);
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    getCurrentOrganizationData();
    configureHeaders();
    configureInterceptors();
    document.body.classList.add('p-custom-scrollbar-8');
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);

    window.addEventListener("resize", getScreenInfo);
    window.addEventListener("orientationchange", getScreenInfo);
    getScreenInfo();
    updateTheme();
  }, []);

  const getCurrentOrganizationData = () => {
    const domainType = getDomainType();
    if (domainType !== domains.mainDomain) {
      getCurrentOrganization();
    }
  }

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
