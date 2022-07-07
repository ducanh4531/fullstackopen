interface resultObj {
	periodLength: number;
	trainingDays: number;
	success: Boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ExerciseValues {
	value1: number;
	value2: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
	if (args.length < 4) throw new Error("not enough arguments");

	const convertToNumber = args.slice(3).map((i) => Number(i));
	console.log(convertToNumber);
	if (!isNaN(Number(args[2])) && !convertToNumber.includes(NaN)) {
		return { value1: Number(args[2]), value2: convertToNumber };
	} else {
		throw new Error("Provided values were not numbers");
	}
};

const calculateExercises = (
	target: number,
	exerciseHours: Array<number>
): resultObj => {
	let success, rating, ratingDescription;

	const removeNegHours = exerciseHours.map((i) => (i >= 0 ? i : 0));

	const average =
		removeNegHours.reduce((prev, current) => prev + current) /
		removeNegHours.length;

	const ratingObj = {
		1: "it is not good enough, don't give up",
		2: "not too bad but could be better",
		3: "that's awesome, keep going",
	};

	if (average >= target) {
		success = true;
		rating = Number(Object.keys(ratingObj)[2]);
		ratingDescription = ratingObj[3];
	} else {
		success = false;
		if (average < target / 2) {
			rating = Number(Object.keys(ratingObj)[0]);
			ratingDescription = ratingObj[1];
		}
		rating = Number(Object.keys(ratingObj)[1]);
		ratingDescription = ratingObj[2];
	}

	return {
		periodLength: exerciseHours.length,
		trainingDays: removeNegHours.filter((i) => i > 0).length,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { value1, value2 } = parseExerciseArguments(process.argv);
	console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
	let errorMessage = "Something went wrong.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
