$(function (){
    $.ajax({
        type: 'GET',
        url: 'https://coronavirus-19-api.herokuapp.com/countries',
        success: function(data) {  
            var allowed = ["country", "cases", "deaths", "recovered", "active"];

            var line = "<tr>";
            $.each(data[0], function(i, row){
                if(allowed.includes(i)){
                    line += "<th>" + i + "</th>";
                }
            })
            line += "</tr>";
            $("#tbelka").append(line);
            $.each(data, function(i, row) {
                var line = "<tr>";
                $.each(row, function(i, cell){
                    if(allowed.includes(i)){
                        line += "<td>" + cell + "</td>";
                    }
                })
                line += "</tr>";
                $("#tbelka").append(line);
            })

        }
    });
})