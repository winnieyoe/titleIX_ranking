total = $("#total_table").DataTable({
  "sAjaxDataProp":"",
  "ajaxSource":"assets/sorted_list.json",
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "order": [[2, "desc"]],
  // "dom":"lrtip",
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Total Count", "data": "totalNum", "class": "all", "data-priority": "2"},
      {"title": "Tuition", "data": "tuition"},
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
    totalR.columns(0).search(this.value).draw();
    tableAd.columns(0).search(this.value).draw();
    tableA.columns(0).search(this.value).draw();
    tableB.columns(0).search(this.value).draw();
    tableD.columns(0).search(this.value).draw();
    tableP.columns(0).search(this.value).draw();
    tableO.columns(0).search(this.value).draw();
});

$("#resetBtn").click(function(){
  $("#total").show()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////HARASSMENT TABLE
tableH = $("#harassment_table").DataTable({
  // "sAjaxDataProp":"",
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];

             for (var i=0; i<json.length; i++){
                if(json[i].harassment.length > 0){

                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "harassment": json[i].harassment,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  // "ajaxSource":"assets/sorted_byType_test.json",
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
      {"title": "Type Count", "data": "harassment",
                "render": function (data, type, row){
                  // var count;
                  //   $.each(data, function(key, value){
                  //     count = data.length;
                  //   });
                  //   return "<div>" + count + "</div>"
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
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
      // {"title": "Type Count", "data": "countH",
      //           "render": function (data, type, row){
      //             if(data != undefined){
      //               div = data
      //             }
      //             return div + "</div>";
      //           }, "class": "all", "data-priority": "2"},
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
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

//// NODES: This part was added because previous data structure, where length is count includes those with 0 and we need to remove those items
  // var nodes = [];
  // tableH.rows().every(function() {
  //   if (this.data().harassment == undefined) nodes.push(this.node())
  //   })
  //   nodes.forEach(function(node) {
  //     tableH.row(node).remove().draw()
  // })
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
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];

             for (var i=0; i<json.length; i++){
                if(json[i].violence.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "violence": json[i].violence,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
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
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

  // var nodes = [];
  // tableV.rows().every(function() {
  //   if (this.data().violence == undefined) nodes.push(this.node())
  //   })
  //   nodes.forEach(function(node) {
  //     tableV.row(node).remove().draw()
  // })
})

//////GENDER TABLE
tableG = $("#gender_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].gender.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "gender": json[i].gender,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
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
      {"title": "Type Count", "data": "gender",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
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
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()
  // $("#resetBtn").removeClass("focus")
  // $(this).addClass("focus")
  $(this).toggleClass('focus').siblings().removeClass('focus');

  // var nodes = [];
  // tableV.rows().every(function() {
  //   if (this.data().violence == undefined) nodes.push(this.node())
  //   })
  //   nodes.forEach(function(node) {
  //     tableV.row(node).remove().draw()
  // })
})

//////RETALIATION TABLE
tableR = $("#retaliation_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].retaliation.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "retaliation": json[i].retaliation,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "retaliation",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "retaliation",
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


$("#btnR").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").show()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////ADMISSIONS TABLE
tableAd = $("#admissions_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].admissions.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "admissions": json[i].admissions,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "admissions",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "admissions",
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


$("#btnAd").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").show()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})


//////Athletics TABLE
tableA = $("#athletics_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].athletics.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "athletics": json[i].athletics,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "athletics",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "athletics",
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


$("#btnA").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").show()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////BENEFITS TABLE
tableB = $("#benefits_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].benefits.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "benefits": json[i].benefits,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "benefits",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "benefits",
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


$("#btnB").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").show()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////DISSEMINATION TABLE
tableD = $("#dissemination_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].dissemination.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "dissemination": json[i].dissemination,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "dissemination",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "dissemination",
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


$("#btnD").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").show()
  $("#procedural").hide()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////PROCEDURAL TABLE
tableP = $("#procedural_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].procedural.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "procedural": json[i].procedural,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "procedural",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "procedural",
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


$("#btnP").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").show()
  $("#others").hide()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})

//////OTHERS TABLE
tableO = $("#others_table").DataTable({
  "ajax": {"url": "assets/sorted_byType_test.json",
           "dataSrc": function(json){
             var return_data = [];
             for (var i=0; i<json.length; i++){
                if(json[i].others.length > 0){
                 return_data.push({
                   "name": json[i].name,
                   "state": json[i].state,
                   "others": json[i].others,
                   "tuition":json[i].tuition
                 })
               }
             }
             return return_data
           }
  },
  "responsive": true,
  "pageLength": 50,
  "dom": '<"table_filter"fl>t<"table_bottom"ip>',
  "columns":[
      {"title": "School", "data": "name", "class": "all", "data-priority": "1"},
      {"title": "State", "data": "state"},
      {"title": "Type Count", "data": "others",
                "render": function (data, type, row){
                  var div = "<div>";
                  $.each(data, function(key, value){
                      div = data.length;
                  });
                  return div + "</div>";
                }, "class": "all", "data-priority": "2"
      },
      {"title": "Tuition", "data": "tuition"},
      {"title": "Case Info", "data": "others",
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


$("#btnO").click(function(){
  $("#total").hide()
  $("#violence").hide()
  $("#gender").hide()
  $("#harass").hide()
  $("#retaliation").hide()
  $("#admissions").hide()
  $("#athletics").hide()
  $("#benefits").hide()
  $("#dissemination").hide()
  $("#procedural").hide()
  $("#others").show()

  $(this).toggleClass('focus').siblings().removeClass('focus');
})
