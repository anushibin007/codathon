import Chart from "react-apexcharts";
import { getCodesOfTheWeek, getParticipants, getWeeklySeries } from "../../util/scoreaggregator";
import { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import CodeOfTheWeekCard from "./CodeOfTheWeekCard";

const WeeklyLeaderboard = ({ selectedSeason, selectedWeek }) => {
	const [series, setSeries] = useState(undefined);
	const [categories, setCategories] = useState(undefined);
	const [codesOfTheWeek, setCodesOfTheWeek] = useState(undefined);

	useEffect(() => {
		const fetchRequiredData = async () => {
			const tempSeries = await getWeeklySeries(selectedSeason, selectedWeek);
			console.log({ tempSeries });
			const tempCategories = await getParticipants(selectedSeason, selectedWeek);
			console.log({ tempCategories });
			const tempCodesOfTheWeek = await getCodesOfTheWeek(selectedSeason, selectedWeek);
			console.log({ tempCodesOfTheWeek });
			if (!tempSeries || !tempCategories) {
				// reset the states if we got no data
				setSeries(undefined);
				setCategories(undefined);
				setCodesOfTheWeek(undefined);
				return;
			}
			setSeries(tempSeries);
			setCategories(tempCategories);
			setCodesOfTheWeek(tempCodesOfTheWeek);
		};
		fetchRequiredData();
	}, [selectedSeason, selectedWeek]);

	// Calculate the total score for each person by summing the values in the series data
	const totals =
		series &&
		series[0] &&
		series[0].data.map((_, index) =>
			series.reduce((sum, seriesItem) => sum + seriesItem.data[index], 0)
		);

	const mergedCategories = categories?.map((name, index) => `${name} (${totals[index]} points)`);

	const options = {
		chart: {
			type: "bar",
			stacked: true, // Enable stacking
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},

		xaxis: {
			categories: mergedCategories, // Represent the people as categories
		},
		yaxis: {
			title: {
				text: "Weighted score out of 100",
			},
			max: 100, // Ensure the scale goes from 0 to 100
		},
		// colors: ["#00E396", "#FF4560", "#775DD0", "#FF8A00"], // Colors for each category
		legend: {
			position: "top",
			horizontalAlign: "center",
		},
	};

	const shouldRenderChart = () => {
		return selectedSeason && selectedWeek && series;
	};
	return (
		<>
			{shouldRenderChart() && (
				<>
					<Grid
						container
						sx={{ flexGrow: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}
					>
						<Grid xs={12}>
							<Typography level="title-lg">
								Season {selectedSeason?.id} Week {selectedWeek} Results
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						sx={{ flexGrow: 1, marginLeft: 5, marginRight: 5, marginTop: 1 }}
					>
						<Grid xs={12}>
							<Chart options={options} series={series} type="bar" height={350} />
						</Grid>
					</Grid>
					<Grid container sx={{ flexGrow: 1, marginLeft: 5, marginRight: 5 }}>
						<Grid xs={12}>
							<>
								<Typography level="title-lg">Codes of the week</Typography>
							</>
						</Grid>
					</Grid>
					<Grid
						container
						sx={{ flexGrow: 1, marginLeft: 5, marginRight: 5, marginTop: 1 }}
					>
						{codesOfTheWeek?.map((code) => (
							<Grid key={code.id} xs={12}>
								<CodeOfTheWeekCard
									author={code.author}
									description={code.description}
									imgsrc={code.imgUrl}
								/>
							</Grid>
						))}
						{(!codesOfTheWeek || codesOfTheWeek.length === 0) && (
							<Grid xs={12}>
								<Typography level="body-sm">No highlights in this week</Typography>
							</Grid>
						)}
					</Grid>
				</>
			)}
			{!shouldRenderChart() && (
				<>
					<Grid
						container
						sx={{ flexGrow: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}
					>
						<Grid xs={12}>
							<Typography level="body-sm">
								No data for the selected Season and Week
							</Typography>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

export default WeeklyLeaderboard;
