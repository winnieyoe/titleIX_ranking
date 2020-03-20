$("#total_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_list.json",
  "responsive": true,
  "pageLength": 50,
  "order": [[3, "desc"]],
  // "dom":"lrtip",
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Tuition", "data": "tuition"},
      {"title": "Total Cases", "data": "totalNum", "class": "all", "data-priority": "2"},
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
      {"title": "Case Info", "data": "incidents",
                "render": function(data, type, row){
                  var div = "<div>";
                    $.each(data, function(key, value){
                        div += value.date + " " + value.complaint + "<br>";
                    });
                    return div + "</div>";
                }, "className": "none"
      }
  ],
  "columnDefs": [{
    "targets": [4, 2],
    "orderable": false,
  }]
})

// $('#customSearch').keyup(function(){
//       dTable.search($(this).val()).draw();   // this  is for customized searchbox with datatable search feature.
//  })
