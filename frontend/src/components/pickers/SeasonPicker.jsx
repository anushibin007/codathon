import { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { getAllSeasons } from "../../util/seasonaggregator";
import WeekPicker from "./WeekPicker";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";

const SeasonPicker = ({ selectedSeason, setSelectedSeason, selectedWeek, setSelectedWeek }) => {
	const [allSeasons, setAllSeasons] = useState([]);

	useEffect(() => {
		setAllSeasons(getAllSeasons());
	}, []);

	useEffect(() => {
		// reset selected week to 1 when season changes
		setSelectedWeek(1);
	}, [selectedSeason]);

	const handleSeasonChange = (e, newValue) => {
		console.log({ newValue });
		if (!newValue) {
			setSelectedSeason(null);
			return;
		}
		setSelectedSeason(allSeasons.find((aSeason) => aSeason?.id === newValue));
	};

	return (
		<>
			<form>
				<Grid container spacing={2}>
					<Grid xs={1}>
						<Typography>Pick a Season:</Typography>
					</Grid>
					<Grid>
						<ToggleButtonGroup
							value={selectedSeason?.id}
							onChange={(event, newValue) => {
								console.log({ newValue });
								handleSeasonChange(event, newValue);
							}}
						>
							{allSeasons.map((aSeason) => (
								<Button key={aSeason.id} value={aSeason.id}>
									{`Season ${aSeason.id} - ${aSeason.topic}`}
								</Button>
							))}
						</ToggleButtonGroup>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid xs={1}>
						<Typography>Pick a Week:</Typography>
					</Grid>
					<Grid>
						<WeekPicker
							selectedSeason={selectedSeason}
							selectedWeek={selectedWeek}
							setSelectedWeek={setSelectedWeek}
						/>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default SeasonPicker;
