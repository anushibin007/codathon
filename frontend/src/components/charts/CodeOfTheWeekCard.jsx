import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

export default function CodeOfTheWeekCard({ author, description, imgsrc }) {
	return (
		<Card variant="outlined">
			<CardContent>
				<Typography level="title-md">{description}</Typography>
				<Typography level="body-sm">{`By ${author}`}</Typography>
			</CardContent>
			<CardOverflow>
				<AspectRatio ratio="1">
					<img src={imgsrc} loading="lazy" alt="Image of Code of the week" />
				</AspectRatio>
			</CardOverflow>
		</Card>
	);
}
