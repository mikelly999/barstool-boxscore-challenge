import React from "react";
import Stats from "./Stats";

const ScoreLine = (props) => {
	const { homeTeamScore, awayTeamScore, home_team, away_team } = props;
	return (
		<div className="scoreLine">
			<div
				className={`away ${
					awayTeamScore > homeTeamScore ? "win" : "loss"
				}`}
			>
				<div>
					<p>{away_team.full_name}</p>
					<p>
						<span>AWAY</span>
					</p>
				</div>
				<div className="score">{awayTeamScore}</div>
			</div>
			<div
				className={`home ${
					homeTeamScore > awayTeamScore ? "win" : "loss"
				}`}
			>
				<div className="score">{homeTeamScore}</div>
				<div>
					<p>{home_team.full_name}</p>
					<p>
						<span>HOME</span>
					</p>
				</div>
			</div>
		</div>
	);
};

const MLBBoxscore = (props) => {
	const {
		_id,
		home_team,
		away_team,
		home_period_scores,
		away_period_scores,
		home_errors,
		away_errors,
		home_batter_totals,
		away_batter_totals,
	} = props;
	const homeTeamScore = home_period_scores.reduce((a, b) => a + b);
	const awayTeamScore = away_period_scores.reduce((a, b) => a + b);
	return (
		<div className="boxscore mlb">
			<ScoreLine
				homeTeamScore={homeTeamScore}
				awayTeamScore={awayTeamScore}
				{...props}
			/>
			<div className="cols">
				<div className="abbreviations">
					<div>&nbsp;</div>
					<div>{away_team.abbreviation}</div>
					<div>{home_team.abbreviation}</div>
				</div>
				{home_period_scores.map((p, i) => {
					return (
						<div key={`${_id}_period_${i}`} className="period">
							<div>{i + 1}</div>
							<div
								className={
									parseInt(away_period_scores[i]) >
									parseInt(p)
										? "dark"
										: undefined
								}
							>
								{away_period_scores[i]}
							</div>
							<div
								className={
									parseInt(p) >
									parseInt(away_period_scores[i])
										? "dark"
										: undefined
								}
							>
								{p}
							</div>
						</div>
					);
				})}
				<div className="total">
					<div>R</div>
					<div
						className={
							awayTeamScore > homeTeamScore ? "dark" : undefined
						}
					>
						{awayTeamScore}
					</div>
					<div
						className={
							homeTeamScore > awayTeamScore ? "dark" : undefined
						}
					>
						{homeTeamScore}
					</div>
				</div>
				<div className="total">
					<div>H</div>
					<div
						className={
							away_batter_totals.hits > home_batter_totals.hits
								? "dark"
								: undefined
						}
					>
						{away_batter_totals.hits}
					</div>
					<div
						className={
							home_batter_totals.hits > away_batter_totals.hits
								? "dark"
								: undefined
						}
					>
						{home_batter_totals.hits}
					</div>
				</div>
				<div className="total">
					<div>E</div>
					<div
						className={
							away_errors > home_errors ? "dark" : undefined
						}
					>
						{away_errors}
					</div>
					<div
						className={
							home_errors > away_errors ? "dark" : undefined
						}
					>
						{home_errors}
					</div>
				</div>
			</div>
			<Stats {...props} />
		</div>
	);
};

const NBABoxscore = (props) => {
	const {
		_id,
		home_team,
		away_team,
		home_period_scores,
		away_period_scores,
	} = props;
	const homeTeamScore = home_period_scores.reduce((a, b) => a + b);
	const awayTeamScore = away_period_scores.reduce((a, b) => a + b);
	return (
		<div className="boxscore nba">
			<ScoreLine
				homeTeamScore={homeTeamScore}
				awayTeamScore={awayTeamScore}
				{...props}
			/>
			<div className="cols">
				<div className="abbreviations">
					<div>&nbsp;</div>
					<div>{away_team.abbreviation}</div>
					<div>{home_team.abbreviation}</div>
				</div>
				{home_period_scores.map((p, i) => {
					return (
						<div key={`${_id}_period_${i}`} className="period">
							<div>{i + 1}</div>
							<div
								className={
									parseInt(away_period_scores[i]) >
									parseInt(p)
										? "dark"
										: undefined
								}
							>
								{away_period_scores[i]}
							</div>
							<div
								className={
									parseInt(p) >
									parseInt(away_period_scores[i])
										? "dark"
										: undefined
								}
							>
								{p}
							</div>
						</div>
					);
				})}
				<div className="total">
					<div>T</div>
					<div
						className={
							awayTeamScore > homeTeamScore ? "dark" : undefined
						}
					>
						{awayTeamScore}
					</div>
					<div
						className={
							homeTeamScore > awayTeamScore ? "dark" : undefined
						}
					>
						{homeTeamScore}
					</div>
				</div>
			</div>
			<Stats {...props} />
		</div>
	);
};

export { NBABoxscore, MLBBoxscore };
