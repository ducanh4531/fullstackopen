import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();
const PORT = 3002;

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (
		!req.query.height ||
		!req.query.weight ||
		isNaN(height) ||
		isNaN(weight)
	) {
		return res.status(400).send({ error: "malformatted parameters" });
	}

	return res.send({
		height,
		weight,
		bmi: calculateBmi(height, weight),
	});
	// }
});

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
