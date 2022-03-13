import "dotenv/config";
import React from "react";
import express from "express";
import fetch from "node-fetch";
import { getDbData, updateDbData } from "./db";
import App from "../client/app";
import ReactDOMServer from "react-dom/server";

const app = express();

const feedIds = [
	"6c974274-4bfc-4af8-a9c4-8b926637ba74",
	"eed38457-db28-4658-ae4f-4d4d38e9e212",
];

const fetchFeedData = async (ids) => {
	const data = await Promise.all(
		ids.map(async (id) => {
			const response = await fetch(
				`https://chumley.barstoolsports.com/dev/data/games/${id}.json`
			);
			const data = await response.json();
			data._id = id;
			data._updatedAt = Date.now();
			return data;
		})
	);
	return data;
};

// api routes
app.get("/api/getData", async (req, res) => {
	const dbData = await getDbData();
	if (!dbData.length) {
		const data = await fetchFeedData(feedIds);
		updateDbData(data);
		return res.end(JSON.stringify(data));
	}
	const needsFetch = dbData
		.filter((d) => Date.now() - d._updatedAt > 15000)
		.map((d) => d._id);
	if (!needsFetch.length) {
		return res.end(JSON.stringify(dbData));
	}
	const feedData = await fetchFeedData(needsFetch);
	updateDbData(feedData);
	const combinedData = [
		...dbData.filter((d) => !needsFetch.includes(d._id)),
		...feedData,
	];
	res.end(JSON.stringify(combinedData));
});

const HTMLDocument = (props) => {
	const { data = null } = props;
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Barstool Sports Boxscore Challenge</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap"
				/>
				<link
					rel="icon"
					type="image/x-icon"
					href="https://www.barstoolsports.com/favicon.ico"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `window._APP_DATA_ = ${JSON.stringify(data)}`,
					}}
				/>
			</head>
			<body>
				<div id="root">{data ? <App data={data} /> : null}</div>
				<script src="/dist/app.js"></script>
			</body>
		</html>
	);
};

app.get("/", async (req, res) => {
	if (process.env.SSR) {
		const response = await fetch("http://localhost:3000/api/getData");
		const data = await response.json();
		const html = ReactDOMServer.renderToString(
			<HTMLDocument data={data} />
		);
		return res.send(html);
	} else {
		return res.send(ReactDOMServer.renderToString(<HTMLDocument />));
	}
});

app.use(express.static("public"));

app.listen(3000);
