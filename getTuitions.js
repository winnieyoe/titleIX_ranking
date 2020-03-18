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
page.setDefaultTimeout(6000); //call timeout error if didn't get fir 6000

async function run(){
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for(let i=0; i<list.length; i++){
    await page.goto('https://google.com');
    await page.type('input.gLFyf.gsfi', list[i] + ' tuition')
    page.keyboard.press("Enter")

    let tuition;
    try {
        await page.waitForSelector(".Z0LcW")
        tuition = await page.evaluate(() => document.querySelector('.Z0LcW').innerText)
    } catch (err){
      console.log("Error:" + err);
      tuition = "NA";
    }

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
