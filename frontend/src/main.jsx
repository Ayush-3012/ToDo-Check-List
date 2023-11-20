import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={2}
    autoHideDuration={1000}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <App />
  </SnackbarProvider>
);
