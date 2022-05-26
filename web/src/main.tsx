import React from "react";
import ReactDOM from "react-dom/client";
import { RoutesApp } from "./RoutesApp";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <FormProvider> */}
        <RoutesApp />
        {/* </FormProvider> */}
    </React.StrictMode>
);
