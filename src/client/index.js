import React from "react";
import { hydrate, render } from "react-dom";
import App from "./app";
import "./styles/styles.scss";

if (SSR) {
	hydrate(<App data={window._APP_DATA_} />, document.getElementById("root"));
} else {
	render(<App data={window._APP_DATA_} />, document.getElementById("root"));
}
