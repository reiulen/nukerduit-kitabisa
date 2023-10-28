import { BrowserRouter } from "react-router-dom";
import RouteApps from "./routes/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <RouteApps />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
