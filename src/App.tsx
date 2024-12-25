import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
//
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "@/routes/browserRouter";
//
// import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="fade-in">
      <p>{greetMsg}</p>
      <RouterProvider router={browserRouter} />
      <Toaster closeButton />
    </div>
  );
}

export default App;
