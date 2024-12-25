import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "@/routes/browserRouter";
//
// import "./App.css";

function App() {
  return (
    <div className="fade-in">
      <RouterProvider router={browserRouter} />
      <Toaster closeButton />
    </div>
  );
}

export default App;
