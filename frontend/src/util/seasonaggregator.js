import seasons from "../data/seasons.json";

export const getAllSeasons = () => {
	return seasons;
};

export const getActiveSeason = () => {
	return seasons.find((aSeason) => aSeason.isActive);
};

const getSeason = (seasonId) => {
	return seasons.find((aSeason) => seasonId == aSeason.id);
};

export const getNumberOfWeeksInSeason = (selectedSeason) => {
	const season = getSeason(selectedSeason);
	if (!season) {
		return 0;
	}
	return season.weeks?.length ?? 0;
};

export const getWholeSeasonParticipants = (selectedSeason) => {
	const season = getSeason(selectedSeason);
	if (!season) {
		return null;
	}
	return season.seasonscores?.map((person) => person.name);
};

export const getWholeSeasonScoreData = (selectedSeason) => {
	const season = getSeason(selectedSeason);
	if (!season) {
		return null;
	}
	const seasonScores = season.seasonscores;
	const numberOfWeeks = getNumberOfWeeksInSeason(selectedSeason);
	const weeksLabel = Array.from({ length: numberOfWeeks }, (_, i) => `Week ${i + 1}`);
	const weeklySeries = weeksLabel.map((aWeek, index) => ({
		name: aWeek,
		data: seasonScores?.map((person) =>
			person.score ? person.score[index] / numberOfWeeks : 0
		),
	}));
	return weeklySeries;
};
