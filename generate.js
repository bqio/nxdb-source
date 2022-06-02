import {
  readJson,
  writeJson,
  compareDateDesc,
  queryRutracker,
} from "./utils.js";

const TITLES_PATH = "third-party/titles.json";
const VERSIONS_PATH = "third-party/versions.json";
const RUTRACKER_PATH = "third-party/rutr.json";

const titles = readJson(TITLES_PATH);
const versions = readJson(VERSIONS_PATH);
const rutracker = readJson(RUTRACKER_PATH);

let nxdb = [];
let meta = {
  count: 0,
};

for (const key in titles) {
  const title = titles[key];

  if (title.id && versions.hasOwnProperty(title.id.toLowerCase())) {
    const nxdbObject = {
      id: title.id,
      title: title.name,
      banner: `https://tinfoil.media/thi/${title.id}/485/273/`,
      altBanner: title.bannerUrl,
      date: title.releaseDate,
      hash: queryRutracker(title.name, rutracker),
    };

    nxdb.push(nxdbObject);
    meta.count++;
  }
}

nxdb.sort(compareDateDesc);

writeJson("data/nxdb.json", nxdb);
writeJson("data/meta.json", meta);
