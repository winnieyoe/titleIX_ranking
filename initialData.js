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
  bug = loadJSON("assets/sorted_list.json")
}

function setup() {
  // console.log(list)
  for (let i = 0; i < table.getRowCount(); i++) {
    // READ CSV ROW
    let state = table.getRow(i).get("State");
    let name = table.getRow(i).get("Institution");
    let type = table.getRow(i).get("Institution Type");
    let complaint = table.getRow(i).get("Type of Discrimination").substring(11);
    let day = table.getRow(i).get("Open Investigation Date").split("/")[1];
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
      incidents: [{
        date: date,
        complaint: complaint
      }],
    }

    // BIG LIST, NO FILTERING ON TYPE
    if (type === "PSE") {
      for (let i = 0; i < schools.length; i++) {
        if (schools[i].name === name) {
          // console.log(name, complaint)
          schools[i].incidents.push({
            date: date,
            complaint: complaint
          });
          isSchoolExisted = true;
          break
        }
      }
      if (!isSchoolExisted) { //if it hasn't existed
        schools.push(school);
      }
    }


    //FILTER ONLY SCHOOLS WITH SEXUAL HARASSMENT
    if (type === "PSE") {
      if (complaint === "Sexual Harassment") {
        for (let i = 0; i < schools_sexual.length; i++) {
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
  sortedFreqList = schools.sort((a, b) => (b.incidents.length > a.incidents.length) ? 1 : -1)
  // console.log(sortedFreqList);

  ////SORT INCIDENTS ARRAY BASED ON DATE
  let casesByDate;
  for (let i = 0; i < sortedFreqList.length; i++) {
    for (let j = 0; j < sortedFreqList[i].incidents.length; j++) {
      casesByDate = sortedFreqList[i].incidents.sort(function(a, b) {
        if (a.date < b.date) {
          return -1
        } else if (a.date == b.date) {
          return 0;
        } else {
          return 1;
        }
        // console.log(a.date,b.date)
        // let dateA = sortedFreqList[i].incidents[j].date;
        // console.log(sortedFreqList[i].incidents[j][0], Date.parse(sortedFreqList[i].incidents[j][0]))
        // return a[sortedFreqList[i].incidents[j][0]]<b[sortedFreqList[i].incidents[j][0]]
      })
    }
  }
  // console.log(sortedFreqList)

  // console.log(schools_sexual);
  sortedSexualList = schools_sexual.sort((a, b) => (b.incidents.length > a.incidents.length) ? 1 : -1)
  // console.log(sortedSexualList);

  ////FOR PUPPETEER
  for (let i = 0; i < sortedFreqList.length; i++) {
    sorted_schools.push(sortedFreqList[i].name);
  }
  // console.log(sorted_schools)

  ////ADD TUITION INFO AFTER PUPPETEER
  for (let i = 0; i < sortedFreqList.length; i++) {

    if (sortedFreqList[i].name === tuitionList[i].name) {
      // console.log("yes", sortedFreqList[i].name,  tuitionList[i].name)
      // console.log(tuitionList[i].name, sortedFreqList[i].name, i)
      sortedFreqList[i].tuition = tuitionList[i].tuition;
    } else {
      // console.log("no", sortedFreqList[i].name, i, tuitionList[i].name)
    }
  }
  // console.log(sortedFreqList)

  /////CREATE SEXUAL HARRASSEMENT LIST
  ////COUNT INSTANCES IN INCIDENTS
  let complaints;
  for (let i = 0; i < sortedFreqList.length; i++) {
    complaints = {};
    for (let j = 0; j < sortedFreqList[i].incidents.length; j++) {
      // console.log(sortedFreqList[i].incidents[j].complaint)
      let oneCase = sortedFreqList[i].incidents[j].complaint;

      if(complaints.hasOwnProperty(oneCase)){
        complaints[oneCase]=complaints[oneCase] + 1 ;
      } else {
        complaints[oneCase] = 1
      }
      // sortedFreqList[i].count = complaints
      Object.keys(complaints).forEach(function (item){
        switch(item){
          case "Sexual Harassment":
            sortedFreqList[i].countH = complaints[item]
            break;

          case "Sexual Violence":
            sortedFreqList[i].countV = complaints[item]
            break;

          case "Gender Harassment":
            sortedFreqList[i].countG = complaints[item]
            break;

          case "Dissemination of Policy":
            sortedFreqList[i].countD = complaints[item]
            break;

          case "Admissions":
            sortedFreqList[i].countAd = complaints[item]
            break;

          case "Athletics":
            sortedFreqList[i].countA= complaints[item]
            break;

          case "Others":
            sortedFreqList[i].countO = complaints[item]
            break;

          case "Procedural Requirements":
            sortedFreqList[i].countP = complaints[item]
            break;

          case "Retaliation":
            sortedFreqList[i].countR = complaints[item]
            break;

          case "Denial of Benefits":
            sortedFreqList[i].countB = complaints[item]
            break;
        }
        // if (item == "Sexual Harassment"){
        //   sortedFreqList[i].countH = complaints[item]
        // }
        // console.log(item, complaints[item])
      })
    }
  }
  console.log(sortedFreqList)

  /////MAKE HARASSMENT LIST
  for (let i=0; i<sortedFreqList.length; i++){
    // console.log(sortedFreqList[i])

    delete sortedFreqList[i].type;
    delete sortedFreqList[i].totalNum;
    delete sortedFreqList[i].tuition;

    // console.log(bug)
    for(let l=0; l<354; l++){
      if(sortedFreqList[i].name == bug[l].name){
        // console.log(sortedFreqList[i].name, bug[l].name)
        sortedFreqList[i].tuition = bug[l].tuition
      }
    }

    sortedFreqList[i].harassment=[];
    sortedFreqList[i].violence=[];
    sortedFreqList[i].gender=[];
    sortedFreqList[i].dissemination=[];
    sortedFreqList[i].admissions=[];
    sortedFreqList[i].athletics=[];
    sortedFreqList[i].others=[];
    sortedFreqList[i].procedural=[];
    sortedFreqList[i].retaliation=[];
    sortedFreqList[i].benefits=[];

    for (let j=0; j<sortedFreqList[i].incidents.length; j++){
      // console.log(sortedFreqList[i].incidents[j].complaint)
      //
      // if(sortedFreqList[i].incidents[j].complaint == "Sexual Harassment"){
      //   let oneCase = sortedFreqList[i].incidents[j]; //returns sexual harassss
      //   sortedFreqList[i].harassment.push(oneCase)
      // }
        let oneCase = sortedFreqList[i].incidents[j]; //returns sexual harassss

        switch(sortedFreqList[i].incidents[j].complaint){
          case "Sexual Harassment":
            sortedFreqList[i].harassment.push(oneCase)
            break;

          case "Sexual Violence":
            sortedFreqList[i].violence.push(oneCase)
            break;

          case "Gender Harassment":
            sortedFreqList[i].gender.push(oneCase)
            break;

          case "Dissemination of Policy":
            sortedFreqList[i].dissemination.push(oneCase)
            break;

          case "Admissions":
            sortedFreqList[i].admissions.push(oneCase)
            break;

          case "Athletics":
            sortedFreqList[i].athletics.push(oneCase)
            break;

          case "Others":
            sortedFreqList[i].others.push(oneCase)
            break;

          case "Procedural Requirements":
            sortedFreqList[i].procedural.push(oneCase)
            break;

          case "Retaliation":
            sortedFreqList[i].retaliation.push(oneCase)
            break;

          case "Denial of Benefits":
            sortedFreqList[i].benefits.push(oneCase)
            break;
        }
    }
    //If the array is empty, delete it
    if(sortedFreqList[i].harassment.length == 0){
      delete sortedFreqList[i].harassment;
    }

    if(sortedFreqList[i].gender.length == 0){
      delete sortedFreqList[i].gender;
    }

    if(sortedFreqList[i].violence.length == 0){
      delete sortedFreqList[i].violence;
    }

    if(sortedFreqList[i].dissemination.length == 0){
      delete sortedFreqList[i].dissemination;
    }

    if(sortedFreqList[i].admissions.length == 0){
      delete sortedFreqList[i].admissions;
    }

    if(sortedFreqList[i].athletics.length == 0){
      delete sortedFreqList[i].athletics;
    }

    if(sortedFreqList[i].others.length == 0){
      delete sortedFreqList[i].others;
    }

    if(sortedFreqList[i].procedural.length == 0){
      delete sortedFreqList[i].procedural;
    }

    if(sortedFreqList[i].retaliation.length == 0){
      delete sortedFreqList[i].retaliation;
    }

    if(sortedFreqList[i].benefits.length == 0){
      delete sortedFreqList[i].benefits;
    }
    delete sortedFreqList[i].incidents;
  }
  // console.log("2", sortedFreqList)
  }


  function draw() {}

  function mousePressed() {
    // saveJSON(sortedFreqList, 'sorted_all.json');
    // saveJSON(sorted_schools, 'list_of_schools.json');
    // saveJSON(sortedFreqList, 'sorted_byType.json');
  }
