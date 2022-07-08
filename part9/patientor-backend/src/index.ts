import express from "express";
import cors from "cors";

import diagnoseRouter from "../src/routes/diagnoses";
import patientRouter from "../src/routes/patients";

const app = express();
const PORT = 3001;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => res.send("Hello Full Stack!"));

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
