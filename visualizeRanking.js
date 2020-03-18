// var table = new Tabulator("#ranking_table", {
//     height: "311px",
//     ajaxURL:"assets/sorted_data.json",
//     columns:[
//         {title:"Name", field:"name"},
//         {title:"State", field:"state"},
//         {title:"Tuition", field:"tuition"},
//         {title:"Total", field:"incidents"}
//     ],
// })



$("#ranking_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_list.json",
  "atuoWidth": false,
  "pageLength": 50,
  "order": [[3, "desc"]],
  "columns":[
      {"title": "School", "data": "name"},
      {"title": "State", "data": "state"},
      {"title": "Tuition", "data": "tuition"},
      {"title": "Total Cases", "data": "totalNum"},
      // {"title": "Case", "data": "incidents[, ]",
      //           "render": function(data, type, row){
      //
      //           let cArr=[]
      //           data.split(", ").forEach((datum)=>{
      //             let c = datum.split(",")[0] + " " + datum.split(",")[1]
      //             cArr.push(c)
      //           })
      //
      //           return cArr.join("<br/>");
      //           }
      // }
      {"title": "Detail", "data": "incidents",
                "render": function(data, type, row){
                  var div = "<div>";
                    $.each(data, function(key, value){
                        div += value.date + " " + value.complaint + "<br>";
                    });
                    return div + "</div>";
                }
      }
  ],
  "columnDefs": [{
    "targets": [4, 2],
    "orderable": false,
  }]
})
