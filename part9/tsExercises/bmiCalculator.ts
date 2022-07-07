type Result = string;

export interface MultipleValues {
	value1: number;
	value2: number;
}

const parseArguments = (args: Array<string>): MultipleValues => {
	if (args.length > 4) throw new Error("too many arguments");
	if (args.length < 4) throw new Error("not enough arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return { value1: Number(args[2]), value2: Number(args[3]) };
	} else {
		throw new Error("Provided values were not numbers");
	}
};

export const calculateBmi = (height: number, weight: number): Result => {
	if (!height) {
		throw new Error("Can't divide by 0!");
	}

	const convertToMeter = height / 100;
	const result = weight / convertToMeter ** 2;

	if (result < 18.5) {
		return "Underweight";
	} else if (result <= 24.9) {
		return "Normal (healthy weight)";
	} else if (result <= 29.9) {
		return "Overweight";
	} else if (result > 29.9) {
		return "Obese";
	} else {
		throw new Error("Cannot calculate the result");
	}
};

try {
	const { value1, value2 } = parseArguments(process.argv);
	console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
	let errorMessage = "Something went wrong.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}
