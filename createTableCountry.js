$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://coronavirus-19-api.herokuapp.com/countries',
        success: function (data) {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("c");
            console.log("USA");

            // Create rest of the table
            $.each(data, function (i, row) {
                if(row["country"] != c){
                    return;
                }
                var line = "<tr>";
                $.each(row, function (i, cell) {
                    console.log(i);
                    if (cell == null) {
                        cell = 0;
                    }
                    line += "<th>" + i + "</th>";
                    line += "<td>" + cell + "</td>";
                    line += "</tr>";
                })
                $("#table").append(line);
            })
        }
    });
})



