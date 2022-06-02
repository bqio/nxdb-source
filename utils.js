import fs from "fs";
import Path from "path";
import lev from "js-levenshtein";

export function readJson(path) {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
}

export function writeJson(path, data) {
  if (!fs.existsSync(Path.dirname(path))) {
    fs.mkdirSync(Path.dirname(path));
  }
  fs.writeFileSync(path, JSON.stringify(data), { encoding: "utf8" });
}

export function writeFormatJson(path, data) {
  if (!fs.existsSync(Path.dirname(path))) {
    fs.mkdirSync(Path.dirname(path));
  }
  fs.writeFileSync(path, JSON.stringify(data, false, " "), {
    encoding: "utf8",
  });
}

export function sortByKey(arr, key) {
  return arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}

export function compareDateDesc(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function compareHashDesc(a, b) {
  if (a.hash !== "" && b.hash !== "") {
    return a.hash > b.hash;
  } else if (a.hash !== "") {
    return a.hash > b.hash;
  } else if (b.name !== "") {
    return a.hash > b.hash;
  } else {
    return a.hash > b.hash;
  }
}

function format(str) {
  try {
    return /\]\s(.*?)\s?\n?\[/gs.exec(str)[1];
  } catch (error) {
    return str;
  }
}

export function queryRutracker(title, magnets) {
  for (const magnet of magnets) {
    const fProp = format(magnet.title.toLowerCase());
    const sProp = title.toLowerCase();

    if (lev(fProp, sProp) < 5) {
      return magnet.magnet;
    }
  }
  return "";
}

export function query(query, inProp, outProp, array, koef = 5) {
  for (const arrEl of array) {
    const fProp = arrEl[inProp].toLowerCase();
    const sProp = query.toLowerCase();

    try {
      if (lev(format(fProp), sProp) < koef) {
        return arrEl[outProp];
      }
    } catch (error) {}
  }
  return "";
}
