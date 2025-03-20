import { useState } from "react";
import WeeklyLeaderboard from "./components/charts/WeeklyLeaderboard";
import SeasonPicker from "./components/pickers/SeasonPicker";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";

function App() {
	const [selectedSeason, setSelectedSeason] = useState(undefined);
	const [selectedWeek, setSelectedWeek] = useState(1); // select week 1 by default

	return (
		<>
			<Grid
				container
				sx={{ flexGrow: 1, margin: 5 }}
				justifyContent="center"
				alignItems="center"
			>
				<Grid>
					<Typography level="h2">&lt;codathon/&gt; Leaderboard</Typography>
				</Grid>
			</Grid>
			<Grid container sx={{ flexGrow: 1, marginBottom: 3 }}>
				<Grid xs={12}>
					<SeasonPicker
						selectedSeason={selectedSeason}
						setSelectedSeason={setSelectedSeason}
						selectedWeek={selectedWeek}
						setSelectedWeek={setSelectedWeek}
					/>
				</Grid>
			</Grid>
			<Divider />
			<Grid container sx={{ flexGrow: 1 }}>
				<Grid xs={12}>
					<WeeklyLeaderboard
						selectedSeason={selectedSeason}
						selectedWeek={selectedWeek}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
