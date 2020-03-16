let table;
let tuitionList;
// let allCases = [];
let schools = [];
let schools_sexual = [];
let sortedFreqList;
let sortedSexualList;

//For Puppeteer
let sorted_schools = [];

function preload() {
  table = loadTable("assets/TitleIXAll.csv", "csv", "header");
  tuitionList = loadJSON("assets/tuitions_cleaned.json")
}

function setup() {
  // console.log(list)
  for (let i = 0; i < table.getRowCount(); i++) {
    // READ CSV ROW
    let state = table.getRow(i).get("State");
    let name = table.getRow(i).get("Institution");
    let type = table.getRow(i).get("Institution Type");
    let complaint = table.getRow(i).get("Type of Discrimination").substring(11);
    let date = table.getRow(i).get("Open Investigation Date");

    let isSchoolExisted = false;
    let isSchoolSexualExisted = false;

    // if (!allCases[school]) {
    //   allCases[school] = [];
    // }
    // let oneCase = {
    //   state: state,
    //   type: type,
    //   complaint: complaint,
    //   date: date,
    // }
    // allCases[school].push(oneCase);

    // FORMAT SCHOOL
    let school = {
      name: name,
      state: state,
      type: type,
      incidents: [[date, complaint]],
    }

    // BIG LIST, NO FILTERING ON TYPE
    if (type === "PSE"){
      for (let i=0; i<schools.length; i++) {
        if (schools[i].name === name) {
          // console.log(name, complaint)
          schools[i].incidents.push([date, complaint]);
          isSchoolExisted = true;
          break
        }
      }
      if (!isSchoolExisted) { //if it hasn't existed
        schools.push(school);
      }
    }


    //FILTER ONLY SCHOOLS WITH SEXUAL VIOLENCE & HARASSMENT
    if (type === "PSE"){
      if (complaint === "Sexual Violence" || complaint === "Sexual Harassment"){
        for (let i=0; i<schools_sexual.length; i++) {
          if (schools_sexual[i].name === name) {
            // console.log(name, complaint)
              schools_sexual[i].incidents.push([date, complaint]);
            isSchoolSexualExisted = true;
            break
          }
        }

        if (!isSchoolSexualExisted) { //if it hasn't existed
          schools_sexual.push(school);
        }
      }
    }

  }
  // console.log(schools)
  sortedFreqList = schools.sort((a,b) => (b.incidents.length > a.incidents.length) ? 1 : -1)
  // console.log(sortedFreqList);

  // console.log(schools_sexual);
  sortedSexualList = schools_sexual.sort((a,b) => (b.incidents.length > a.incidents.length) ? 1 : -1)
  // console.log(sortedSexualList);


  ////FOR PUPPETEER
  for (let i=0; i<sortedFreqList.length; i++){
    sorted_schools.push(sortedFreqList[i].name);
  }
  // console.log(sorted_schools)

  ////ADD TUITION INFO AFTER PUPPETEER
  for (let i=0; i<sortedFreqList.length; i++){
    if(sortedFreqList[i].name === tuitionList[i].name){
      sortedFreqList[i].tuition = tuitionList[i].tuition;
    } else {
      // console.log("no", sortedFreqList[i].name)
      // console.log("missing", sortedFreqList[i].name)
    }
  }
  console.log(sortedFreqList)
}

function draw() {
}

function mousePressed() {
  // saveJSON(sortedFreqList, 'sorted_all.json');
  // saveJSON(sorted_schools, 'sorted_schools.json');
  saveJSON(sortedFreqList, 'sorted_tuitionAdded.json');
}

//Puppeteer
let list = [
  "GEORGIA STATE UNIVERSITY",
  "GEORGIA SOUTHERN UNIVERSITY",
  "GEORGIA INSTITUTE OF TECHNOLOGY-MAIN CAMPUS",
  "GEORGIA COLLEGE AND STATE UNIVERSITY",
  "COVENANT COLLEGE",
  "AUGUSTA TECHNICAL COLLEGE",
  "VALENCIA COLLEGE",
  "UNIVERSITY OF WEST FLORIDA",
  "HILLSBOROUGH COMMUNITY COLLEGE",
  "FLORIDA INSTITUTE OF TECHNOLOGY-MELBOURNE",
  "FLORIDA AGRICULTURAL AND MECHANICAL UNIVERSITY",
  "FLAGLER TECHNICAL INSTITUTE",
  "FLAGLER COLLEGE",
  "AMERICAN MEDICAL ACADEMY",
  "GEORGETOWN UNIVERSITY",
  "WESTERN CONNECTICUT STATE UNIV",
  "WESLEYAN UNIVERSITY",
  "UNIVERSITY OF SAN DIEGO",
  "UNIVERSITY OF CALIFORNIA-SANTA CRUZ",
  "UNIVERSITY OF CALIFORNIA-SAN DIEGO",
  "UNIVERSITY OF CALIFORNIA-BERKELEY",
  "SAN JOSE STATE UNIVERSITY",
  "MENLO COLLEGE",
  "LOYOLA MARYMOUNT UNIVERSITY",
  "HUMBOLDT STATE UNIVERSITY",
  "CALIFORNIA STATE UNIVERSITY - MARITIME ACADEMY",
  "UNIVERSITY OF ARKANSAS AT LITTLE ROCK",
  "UNIVERSITY OF SOUTH ALABAMA",
  "AUBURN UNIVERSITY MAIN CAMPUS",
  "UNIVERSITY OF ALASKA - FAIRBANKS"
]

let test = ["UNIVERSITY OF FLORIDA", "COLLEGE OF WILLIAM AND MARY"];
let tuitions =[];
const fs = require ('fs');
const puppeteer = require('puppeteer');

async function run(){
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for(let i=0; i<list.length; i++){
    await page.goto('https://google.com');
    await page.type('input.gLFyf.gsfi', list[i] + ' tuition')
    page.keyboard.press("Enter")
    await page.waitForSelector(".Z0LcW")

    const tuition = await page.evaluate(() => document.querySelector('.Z0LcW').innerText)
    let school_name = list[i];
    tuitions.push({name:school_name, tuition});
  }
    await browser.close();
    return tuitions;
    // console.log(tuitions)
}

// run().then((value) => console.log(value)).catch(error => console.log(error));
const init = async () => {
	try {
		const gotTuition = await run();
		fs.writeFileSync('assets/list9.json', JSON.stringify(gotTuition));
		console.log('Succes');
	} catch (error) {
		console.log('Error', error);
	}
};

init();
