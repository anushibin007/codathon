import { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { getAllSeasons } from "../../util/seasonaggregator";
import WeekPicker from "./WeekPicker";

const SeasonPicker = ({ selectedSeason, setSelectedSeason, selectedWeek, setSelectedWeek }) => {
	const [allSeasons, setAllSeasons] = useState([]);

	useEffect(() => {
		setAllSeasons(getAllSeasons());
	}, []);

	useEffect(() => {
		// reset selected week to 1 when season changes
		setSelectedWeek(1);
	}, [selectedSeason]);

	const handleSeasonChange = (e, selectedVal) => {
		console.log(selectedVal);
		setSelectedSeason(allSeasons.find((aSeason) => aSeason?.id === selectedVal));
	};

	return (
		<>
			<form>
				<Grid container spacing={2}>
					<Grid>
						<Select onChange={handleSeasonChange} placeholder={`Pick a Season`}>
							{allSeasons?.map((aSeason) => (
								<Option key={aSeason.id} value={aSeason.id}>
									{`Season ${aSeason.id} - ${aSeason.topic}`}
								</Option>
							))}
						</Select>
					</Grid>
					<Grid>
						<Grid>
							<WeekPicker
								selectedSeason={selectedSeason}
								selectedWeek={selectedWeek}
								setSelectedWeek={setSelectedWeek}
							/>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default SeasonPicker;
