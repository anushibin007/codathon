import seasons from "../data/seasons.json";

const getAllSeasons = () => {
	return seasons;
};

const getActiveSeason = () => {
	return seasons.find((aSeason) => aSeason.isActive);
};

export { getAllSeasons, getActiveSeason };
