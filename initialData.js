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
  table = loadTable("assets/allcases_fromOCR.csv", "csv", "header");
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
    let day= table.getRow(i).get("Open Investigation Date").split("/")[1];
    let month = table.getRow(i).get("Open Investigation Date").split("/")[0];
    let year = table.getRow(i).get("Open Investigation Date").split("/")[2];
    let date = year + "-" + month + "-" + day;

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
      incidents: [{date: date, complaint: complaint}],
    }

    // BIG LIST, NO FILTERING ON TYPE
    if (type === "PSE"){
      for (let i=0; i<schools.length; i++) {
        if (schools[i].name === name) {
          // console.log(name, complaint)
          schools[i].incidents.push({date: date, complaint: complaint});
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

  ////SORT INCIDENTS ARRAY BASED ON DATE
  let casesByDate;
  for (let i=0; i<sortedFreqList.length; i++){
    for (let j=0; j<sortedFreqList[i].incidents.length;j++){
      casesByDate = sortedFreqList[i].incidents.sort(function(a, b){
        if(a.date < b.date) {
          return -1
        } else if (a.date == b.date){
          return 0;
        } else {
          return 1;
        }
        // console.log(a.date,b.date)
        // let dateA = sortedFreqList[i].incidents[j].date;
        // console.log(sortedFreqList[i].incidents[j][0], Date.parse(sortedFreqList[i].incidents[j][0]))
        // return a[sortedFreqList[i].incidents[j][0]]<b[sortedFreqList[i].incidents[j][0]]
        }
      )
    }
  }
  console.log(sortedFreqList)

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
      sortedFreqList[i].totalNum = sortedFreqList[i].incidents.length;
      sortedFreqList[i].tuition = tuitionList[i].tuition;
    } else {
      // console.log("no", sortedFreqList[i].name)
      // console.log("missing", sortedFreqList[i].name)
    }
  }

  // console.log("sorted", sortedFreqList)
}

function draw() {
}

function mousePressed() {
  // saveJSON(sortedFreqList, 'sorted_all.json');
  // saveJSON(sorted_schools, 'list_of_schools.json');
  // saveJSON(sortedFreqList, 'sorted_list.json');
}
