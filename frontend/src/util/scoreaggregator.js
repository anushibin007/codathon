// import weeklyscore from "../data/mockweeklyscores.json";

const criteria = [
	"Correctness & Coverage",
	"Originality of code",
	"Improvement Over Time",
	"Code Quality & Best Practices",
	"Creativity & Unique Approaches",
	"Participation & Effort",
];

const weight = [0.3, 0.2, 0.2, 0.15, 0.1, 0.05];

const getParticipants = async (selectedSeason, selectedWeek) => {
	if (!selectedSeason || !selectedWeek) return undefined;
	const weeklyscore = await getWeeklyScore(selectedSeason, selectedWeek);
	const participants = weeklyscore?.map((person) => person.name);
	return participants;
};

const getWeeklySeries = async (selectedSeason, selectedWeek) => {
	if (!selectedSeason || !selectedWeek) return undefined;
	const weeklyscore = await getWeeklyScore(selectedSeason, selectedWeek);
	console.log({ weeklyscore });
	if (!weeklyscore) return undefined;
	const weeklySeries = criteria.map((criterion, index) => ({
		name: criterion,
		data: weeklyscore?.map((person) =>
			person.score ? Math.ceil(person.score[index] * weight[index]) : 0
		),
	}));
	console.log({ weeklySeries });
	return weeklySeries;
};

const getSeasonScore = async (selectedSeason) => {
	const seasonscore = await import(`../data/s${selectedSeason.id}-scores.json`);
	return seasonscore?.default;
};

const getWeeklyScore = async (selectedSeason, selectedWeek) => {
	const seasonscore = await getSeasonScore(selectedSeason);
	const weeklyscore = seasonscore?.find((aWeek) => {
		// console.log("aWeek.week", aWeek.week);
		// console.log("selectedWeek", selectedWeek);
		return aWeek.week === selectedWeek;
	});
	// console.log({ weeklyscore });
	return weeklyscore?.scores;
};

export { getParticipants, getWeeklySeries };
