import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { NBABoxscore, MLBBoxscore } from "./components/Boxscore";
import { PulseLoader } from "react-spinners";

const boxscoreConfig = {
	NBA: (props) => <NBABoxscore {...props} />,
	MLB: (props) => <MLBBoxscore {...props} />,
};

const App = () => {
	const [data, setData] = useState();
	const getData = async () => {
		const response = await fetch("/api/getData");
		const data = await response.json();
		setData(() => data);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div id="app">
			<Nav />
			<div id="container">
				{data ? (
					data.map((gameData, i) => {
						const Boxscore = boxscoreConfig[gameData.league];
						return <Boxscore key={`boxscore_${i}`} {...gameData} />;
					})
				) : (
					<div id="loader">
						<p>LOADING</p>
						<PulseLoader color="#141e30" />
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
