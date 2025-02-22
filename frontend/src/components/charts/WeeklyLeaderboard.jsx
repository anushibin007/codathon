import Chart from "react-apexcharts";
import { getParticipants, getWeeklySeries } from "../../util/scoreaggregator";
import { useEffect, useState } from "react";

const WeeklyLeaderboard = ({ selectedSeason, selectedWeek }) => {
	const [series, setSeries] = useState(undefined);
	const [categories, setCategories] = useState(undefined);

	useEffect(() => {
		const fetchRequiredData = async () => {
			const tempSeries = await getWeeklySeries(selectedSeason, selectedWeek);
			console.log({ tempSeries });
			const tempCategories = await getParticipants(selectedSeason, selectedWeek);
			console.log({ tempCategories });
			if (!tempSeries || !tempCategories) {
				return;
			}
			setSeries(tempSeries);
			setCategories(tempCategories);
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
		title: {
			text: "Season 1 Week 1 Results",
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
	return (
		<>
			{selectedSeason && selectedWeek && series && (
				<>
					<Chart options={options} series={series} type="bar" height={350} />
				</>
			)}
		</>
	);
};

export default WeeklyLeaderboard;
