import { act, useEffect, useState } from "react";
import Typography from "@mui/joy/Typography";
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
				<Typography>Season: </Typography>
				<Select onChange={handleSeasonChange}>
					{allSeasons?.map((aSeason) => (
						<Option key={aSeason.id} value={aSeason.id}>
							{`Season ${aSeason.id} - ${aSeason.topic}`}
						</Option>
					))}
				</Select>
				Selected season: {selectedSeason?.id} - {selectedSeason?.topic}
				<WeekPicker
					selectedSeason={selectedSeason}
					selectedWeek={selectedWeek}
					setSelectedWeek={setSelectedWeek}
				/>
			</form>
		</>
	);
};

export default SeasonPicker;
