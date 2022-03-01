import express from "express";
import fetch from "node-fetch";

const app = express();

// static assets
app.use(express.static("public"));

// api routes
app.get("/api/getData", async (req, res) => {
	const feedIds = [
		"6c974274-4bfc-4af8-a9c4-8b926637ba74",
		"eed38457-db28-4658-ae4f-4d4d38e9e212",
	];
	const data = await Promise.all(
		feedIds.map(async (feedId) => {
			const response = await fetch(
				`https://chumley.barstoolsports.com/dev/data/games/${feedId}.json`
			);
			const data = await response.json();
			data.id = feedId;
			return data;
		})
	);
	return res.send(JSON.stringify(data));
});

app.listen(3000);
