total = $("#total_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_list.json",
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "order": [[3, "desc"]],
  // "dom":"lrtip",
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Tuition", "data": "tuition"},
      {"title": "Total Count", "data": "totalNum", "class": "all", "data-priority": "2"},
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

$('#search_school').on('keyup', function () {
    total.columns(0).search(this.value).draw();
    tableH.columns(0).search(this.value).draw();
    tableG.columns(0).search(this.value).draw();
    tableV.columns(0).search(this.value).draw();
});

$("#resetBtn").click(function(){
  $("#total").show()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////HARASSMENT TABLE
tableH = $("#harassment_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_byType.json",
  "responsive": true,
  "pageLength": 50,
  // "rowCallback": function(row,data,index) {
  //   if(data.harassment == undefined){
  //     $(row).hide();
  //   }
  // },
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      // {"title": "Type Count", "data": "harassment",
      //           "render": function (data, type, row){
      //             // var count;
      //             //   $.each(data, function(key, value){
      //             //     count = data.length;
      //             //   });
      //             //   return "<div>" + count + "</div>"
      //             var div = "<div>";
      //             $.each(data, function(key, value){
      //                 div = data.length;
      //             });
      //             return div + "</div>";
      //           }, "class": "all", "data-priority": "2"
      // },
      // {"title": "Type Count 2", "data": "count",
      //           "render": function(data, type, row){
      //             var div = "<div>";
      //             // if (data["Sexual Harassment"] != undefined){
      //             //
      //             // }
      //               $.each(data, function(key, value){
      //                 if(data["Sexual Harassment"] != undefined){
      //                   div = data["Sexual Harassment"]
      //                 }
      //               })
      //               // $.each(data, function(key, value){
      //               //   if (key = "Sexual")
      //               //     // div += value["Sexual Harassment"];
      //               // });
      //               return div + "</div>";
      //           }
      // },
      {"title": "Type Count", "data": "countH",
                "render": function (data, type, row){
                  if(data != undefined){
                    div = data
                  }
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"},
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "harassment",
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
    "targets": [3, 4],
    "orderable": false,
  }],
    "order": [[2, "desc"]]
})


$("#btnH").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").show()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

  var nodes = [];
  tableH.rows().every(function() {
    if (this.data().harassment == undefined) nodes.push(this.node())
    })
    nodes.forEach(function(node) {
      tableH.row(node).remove().draw()
  })
  // $.fn.dataTable.ext.search.push(
  //       function(settings, data, dataIndex) {
  //         console.log(settings)
  //         // if(sTableId == "harassment_table"){
  //         //
  //         // }
  //         return(data[3] != "")
  //           ? true
  //           : false
  //       });
  //   tableH.draw();
    // $.fn.dataTable.ext.search.pop();
})

//////VIOLENCE TABLE
tableV = $("#violence_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_byType.json",
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "violence",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "violence",
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
    "targets": [3,4],
    "orderable": false,
  }],
    "order": [[2, "desc"]]
})


$("#btnV").click(function(){
  $("#total").hide()
  $("#violence").show()
  $("#gender").hide()
  $("#harass").hide()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

  var nodes = [];
  tableV.rows().every(function() {
    if (this.data().violence == undefined) nodes.push(this.node())
    })
    nodes.forEach(function(node) {
      tableV.row(node).remove().draw()
  })
})

//////GENDER TABLE
tableG = $("#gender_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_byType.json",
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      // {"title": "Case Type", "data": "gender",
      //           "render": function (data, type, row){
      //             var div = "<div>";
      //             $.each(data, function(key, value){
      //                 div = data.length;
      //             });
      //             return div + "</div>";
      //           }, "class": "all", "data-priority": "2"
      // },
      {"title": "Type Count", "data": "countG",
                "render": function (data, type, row){
                  if(data != undefined){
                    div = data
                  }
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"},
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "gender",
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
    "targets": [3,4],
    "orderable": false,
  }],
    "order": [[2, "desc"]]
})


$("#btnG").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").show()
  $("#harass").hide()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

  var nodes = [];
  tableV.rows().every(function() {
    if (this.data().violence == undefined) nodes.push(this.node())
    })
    nodes.forEach(function(node) {
      tableV.row(node).remove().draw()
  })
})
