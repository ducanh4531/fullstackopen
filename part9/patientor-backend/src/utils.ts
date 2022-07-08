import { newPatientEntry, Gender } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (param: any): param is string => {
	return typeof param === "string" || param instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name");
	}
	return name;
};

const parseDateOfBirth = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing date of birth ${date}`);
	}
	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error("Incorrect or missing ssn");
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error("Incorrect or missing gender");
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation");
	}
	return occupation;
};

type Fields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
};

const toNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
}: Fields): newPatientEntry => {
	const newPatient: newPatientEntry = {
		name: parseName(name),
		dateOfBirth: parseDateOfBirth(dateOfBirth),
		ssn: parseSsn(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
	};

	return newPatient;
};

export default toNewPatient;
