import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import { getDbData, updateDbData } from "./db";

const app = express();

// static assets
app.use(express.static("public"));

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
	console.log("NEEDS FETCH", needsFetch.length);
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

app.listen(3000);
