import React from "react";
import { GiQueenCrown } from "react-icons/gi";

const MLBBoxscore = (props) => {
	const { home_team, away_team, home_period_scores, away_period_scores } =
		props;
	const homeTeamScore = home_period_scores.reduce((a, b) => a + b);
	const awayTeamScore = away_period_scores.reduce((a, b) => a + b);
	return (
		<div className="boxscore mlb">
			<div className="teams">
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
			<div className="periods">
				<div>
					<div>&nbsp;</div>
					<div>{home_team.abbreviation}</div>
					<div>{away_team.abbreviation}</div>
				</div>
				{home_period_scores.map((p, i) => {
					return (
						<div>
							<div>{i + 1}</div>
							<div>{away_period_scores[i]}</div>
							<div>{p}</div>
						</div>
					);
				})}
				<div>
					<div>R</div>
					<div>{awayTeamScore}</div>
					<div>{homeTeamScore}</div>
				</div>
				<div>
					<div>H</div>
					<div>{awayTeamScore}</div>
					<div>{homeTeamScore}</div>
				</div>
				<div>
					<div>E</div>
					<div>{awayTeamScore}</div>
					<div>{homeTeamScore}</div>
				</div>
			</div>
		</div>
	);
};

const NBABoxscore = (props) => {
	const { home_team, away_team, home_period_scores, away_period_scores } =
		props;
	const homeTeamScore = home_period_scores.reduce((a, b) => a + b);
	const awayTeamScore = away_period_scores.reduce((a, b) => a + b);
	return (
		<div className="boxscore nba">
			<div className="teams">
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
			<div className="periods">
				<div>
					<div>&nbsp;</div>
					<div>{home_team.abbreviation}</div>
					<div>{away_team.abbreviation}</div>
				</div>
				{home_period_scores.map((p, i) => {
					return (
						<div>
							<div>{i + 1}</div>
							<div>{p}</div>
							<div>{away_period_scores[i]}</div>
						</div>
					);
				})}
				<div>
					<div>T</div>
					<div>{homeTeamScore}</div>
					<div>{awayTeamScore}</div>
				</div>
			</div>
		</div>
	);
};

export { NBABoxscore, MLBBoxscore };
