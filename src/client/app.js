import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { NBABoxscore, MLBBoxscore } from "./components/Boxscore";

const boxscoreConfig = {
	NBA: (props) => <NBABoxscore {...props} />,
	MLB: (props) => <MLBBoxscore {...props} />,
};

const App = () => {
	const [data, setData] = useState();
	const getData = async () => {
		const response = await fetch("/api/getData");
		const data = await response.json();
		console.log(data);
		setData(() => data);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div id="app">
			<Nav />
			<div id="container">
				{data &&
					data.map((gameData) => {
						const Boxscore = boxscoreConfig[gameData.league];
						return <Boxscore {...gameData} />;
					})}
			</div>
		</div>
	);
};

export default App;
