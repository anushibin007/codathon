import Chart from "react-apexcharts";
import { getCodesOfTheWeek, getParticipants, getWeeklySeries } from "../../util/scoreaggregator";
import { useEffect, useState } from "react";

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
		title: {
			text: `Season ${selectedSeason?.id} Week ${selectedWeek} Results`,
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
					<Chart options={options} series={series} type="bar" height={350} />
					<>
						<h2>Codes of the week</h2>
						<ul>
							{codesOfTheWeek?.map((code) => (
								<li key={code.id}>
									{code.author} - {code.description}
									<br />
									<img src={code.imgUrl} />
								</li>
							))}
						</ul>
					</>
				</>
			)}
			{!shouldRenderChart() && (
				<>
					<p>No data for selected season and week</p>
				</>
			)}
		</>
	);
};

export default WeeklyLeaderboard;
