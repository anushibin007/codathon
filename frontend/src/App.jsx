import { useState } from "react";
import WeeklyLeaderboard from "./components/charts/WeeklyLeaderboard";
import SeasonPicker from "./components/pickers/SeasonPicker";

function App() {
	const [selectedSeason, setSelectedSeason] = useState(undefined);
	const [selectedWeek, setSelectedWeek] = useState(1); // select week 1 by default

	return (
		<>
			<SeasonPicker
				selectedSeason={selectedSeason}
				setSelectedSeason={setSelectedSeason}
				selectedWeek={selectedWeek}
				setSelectedWeek={setSelectedWeek}
			/>
			<WeeklyLeaderboard selectedSeason={selectedSeason} selectedWeek={selectedWeek} />
		</>
	);
}

export default App;
