import * as React from "react";
import Button from "@mui/joy/Button";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import { useState } from "react";
import { useEffect } from "react";
import Typography from "@mui/joy/Typography";

const WeekPicker = ({ selectedSeason, selectedWeek, setSelectedWeek }) => {
	const numberOfWeeks =
		selectedSeason?.weeks && selectedSeason?.weeks.length > 0
			? selectedSeason?.weeks.length
			: 0;
	const [selectedWeekData, setSelectedWeekData] = useState(undefined);

	useEffect(() => {
		setSelectedWeekData(selectedSeason?.weeks[selectedWeek - 1]);
	}, [selectedSeason, selectedWeek]);

	return (
		<>
			{selectedSeason && numberOfWeeks > 0 && (
				<>
					<ToggleButtonGroup
						value={selectedWeek}
						onChange={(event, newValue) => {
							setSelectedWeek(newValue);
						}}
					>
						{Array.from(Array(numberOfWeeks).keys()).map((aWeek) => (
							<Button key={aWeek + 1} value={aWeek + 1}>
								Week {aWeek + 1}
							</Button>
						))}
					</ToggleButtonGroup>
				</>
			)}
			{(!selectedSeason || numberOfWeeks == 0) && (
				<>
					<Typography level="body-sm">Please pick a Season</Typography>
				</>
			)}
		</>
	);
};

export default WeekPicker;
