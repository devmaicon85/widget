import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { WidgetStart } from "./pages/WidgetStart";

export function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/widget" element={<WidgetStart />} />
            </Routes>
        </BrowserRouter>
    );
}
