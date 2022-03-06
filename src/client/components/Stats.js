import React, { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

const NBAPlayerStats = (props) => {
	const { stats, colOneTitle = " " } = props;
	return (
		<table className="nbaPlayerStats">
			<thead>
				<tr>
					<th>{colOneTitle}</th>
					<th>MIN</th>
					<th>FG</th>
					<th>3PT</th>
					<th>FT</th>
					<th>OREB</th>
					<th>DREB</th>
					<th>REB</th>
					<th>AST</th>
					<th>STL</th>
					<th>BLK</th>
					<th>TO</th>
					<th>PF</th>
					<th>PTS</th>
				</tr>
			</thead>
			<tbody>
				{stats.map((s, i) => {
					return (
						<tr key={`_away_${i}`}>
							<td>
								{s.first_name} {s.last_name}{" "}
								<span>{s.position}</span>
							</td>
							<td>{s.minutes}</td>
							<td>
								{s.field_goals_made} - {s.field_goals_attempted}
							</td>
							<td>
								{s.three_point_field_goals_made} -{" "}
								{s.three_point_field_goals_attempted}
							</td>
							<td>
								{s.free_throws_made} - {s.free_throws_attempted}
							</td>
							<td>{s.offensive_rebounds}</td>
							<td>{s.defensive_rebounds}</td>
							<td>
								{s.offensive_rebounds + s.defensive_rebounds}
							</td>
							<td>{s.assists}</td>
							<td>{s.steals}</td>
							<td>{s.blocks}</td>
							<td>{s.turnovers}</td>
							<td>{s.personal_fouls}</td>
							<td>{s.points}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

const NBAStats = (props) => {
	const { _id, home_stats, away_stats, home_team, away_team } = props;
	return (
		<div className="nbaStats">
			{/* away */}
			<h3>{away_team.full_name}</h3>
			<NBAPlayerStats
				stats={away_stats.filter((a) => a.is_starter)}
				colOneTitle="STARTERS"
			/>
			<NBAPlayerStats
				stats={away_stats.filter((a) => !a.is_starter)}
				colOneTitle="BENCH"
			/>
			{/* home */}
			<h3>{home_team.full_name}</h3>
			<NBAPlayerStats
				stats={home_stats.filter((a) => a.is_starter)}
				colOneTitle="STARTERS"
			/>
			<NBAPlayerStats
				stats={home_stats.filter((a) => !a.is_starter)}
				colOneTitle="BENCH"
			/>
		</div>
	);
};

const BatterStats = (props) => {
	const { stats } = props;
	return (
		<div className="batterStats">
			<table>
				<thead>
					<tr>
						<th>Batters</th>
						<th>AB</th>
						<th>R</th>
						<th>H</th>
						<th>RBI</th>
						<th>BB</th>
						<th>K</th>
						<th>AVG</th>
						<th>OBP</th>
						<th>SLG</th>
					</tr>
				</thead>
				<tbody>
					{stats.map((s, i) => {
						return (
							<tr key={`s_${i}`}>
								<td>{s.last_name}</td>
								<td>{s.at_bats}</td>
								<td>{s.runs}</td>
								<td>{s.hits}</td>
								<td>{s.rbi}</td>
								<td>{s.walks}</td>
								<td>{s.strike_outs}</td>
								<td>{s.avg}</td>
								<td>{s.obp}</td>
								<td>{s.slg}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const PitcherStats = (props) => {
	const { stats } = props;
	return (
		<div className="pitcherStats">
			<table>
				<thead>
					<tr>
						<th>Pitchers</th>
						<th>IP</th>
						<th>H</th>
						<th>R</th>
						<th>ER</th>
						<th>BB</th>
						<th>K</th>
						<th>HR</th>
						<th>ERA</th>
					</tr>
				</thead>
				<tbody>
					{stats.map((s, i) => {
						return (
							<tr key={`s_${i}`}>
								<td>{s.last_name}</td>
								<td>{s.innings_pitched}</td>
								<td>{s.hits_allowed}</td>
								<td>{s.runs_allowed}</td>
								<td>{s.earned_runs}</td>
								<td>{s.walks}</td>
								<td>{s.strike_outs}</td>
								<td>{s.home_runs_allowed}</td>
								<td>{s.era}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

const MLBStats = (props) => {
	const {
		_id,
		home_team,
		away_team,
		home_batters,
		away_batters,
		home_pitchers,
		away_pitchers,
	} = props;
	return (
		<div className="mlbStats">
			<div>
				<h3>{away_team.full_name}</h3>
				<BatterStats stats={away_batters} />
				<PitcherStats stats={away_pitchers} />
			</div>
			<div>
				<h3>{home_team.full_name}</h3>
				<BatterStats stats={home_batters} />
				<PitcherStats stats={home_pitchers} />
			</div>
		</div>
	);
};

const statsConfig = {
	MLB: (props) => <MLBStats {...props} />,
	NBA: (props) => <NBAStats {...props} />,
};

const Stats = (props) => {
	const { league } = props;
	const [active, setActive] = useState(false);
	const StatsComponent = statsConfig[league];
	return (
		<div className={`stats ${active ? "active" : ""}`}>
			<div className="statsInner">
				<StatsComponent {...props} />
			</div>
			<div className="statsToggle">
				<button onClick={() => setActive((prev) => !prev)}>
					<FaAngleDoubleDown />
				</button>
			</div>
		</div>
	);
};

export default Stats;
