import { useEffect } from "react";

const useBlockReload = () => {
  useEffect(() => {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = ""; // mensagem personalizada
        return;
      };

      const handleKeyDown = (e) => {
        if (
          e.key === "F5" ||
          (e.ctrlKey && e.key === "r") ||
          (e.metaKey && e.key === "r")
        ) {
          e.preventDefault();
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  );
}

export default useBlockReload;