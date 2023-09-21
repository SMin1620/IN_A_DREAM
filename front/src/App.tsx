import React from "react";
import AppRouter from "./AppRouter";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClinet = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClinet}>
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
