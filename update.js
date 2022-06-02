import "dotenv/config";

import axios from "axios";
import { writeJson } from "./utils.js";

async function updateTitles() {
  console.log("Updating titles...");
  const response = await axios.get(process.env.TITLES_URL);
  writeJson("third-party/titles.json", response.data);
  console.log("Done.");
}

async function updateVersions() {
  console.log("Updating versions...");
  const response = await axios.get(process.env.VERSIONS_URL);
  writeJson("third-party/versions.json", response.data);
  console.log("Done.");
}

async function updateRutr() {
  console.log("Updating rutr...");
  const response = await axios.get(process.env.RUTR_URL);
  writeJson("third-party/rutr.json", response.data);
  console.log("Done.");
}

async function updateAll() {
  await updateTitles();
  await updateVersions();
  await updateRutr();
}

updateAll();
