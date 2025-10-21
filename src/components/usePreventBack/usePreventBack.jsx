import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBack = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Push a dummy entry to prevent back navigation
    window.history.pushState(null, "", window.location.href);

    const onPopState = () => {
      // This runs when user clicks back
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigate]);
};

export default usePreventBack;
