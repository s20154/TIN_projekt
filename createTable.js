$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://coronavirus-19-api.herokuapp.com/countries',
        success: function (data) {
            var allowed = ["country", "cases", "deaths", "recovered", "active"];

            $("#content").remove("#mini-table-cases-loader");

            // Create mini-table-cases
            var line = "<tr>";
            $.each(data[0], function (i, row) {
                if (allowed.includes(i)) {
                    line += "<th>" + i + "</th>";
                }
            })
            line += "</tr>";
            $("#mini-table-cases").append(line);
            $.each(data, function (i, row) {
                if(row["country"] == "World" || i > 10){
                    return;
                }
                var line = "<tr>";
                $.each(row, function (i, cell) {
                    if (allowed.includes(i)) {
                        if(cell == null){
                            cell = 0;
                        }
                        if (i === "country") {
                            line += "<td>";
                            //line += "<a href='index.html'>" + cell + "</a>";
                            line += "<a href='index.html?country=" + cell + "'>" + cell + "</a>";
                            line += "</td>";
                            console.log(line);
                        } else {
                            line += "<td>" + cell + "</td>";
                        }
                    }
                })
                line += "</tr>";
                $("#mini-table-cases").append(line);
            })

            // Create big table
            // Create headers
            var line = "<tr>";
            $.each(data[0], function (i, row) {
                if (allowed.includes(i)) {
                    line += "<th>" + i + "</th>";
                }
            })
            line += "</tr>";
            $("#table").append(line);

            // Create rest of the table
            $.each(data, function (i, row) {
                if(row["country"] == "World"){
                    return;
                }
                var line = "<tr>";
                $.each(row, function (i, cell) {
                    if (allowed.includes(i)) {
                        if(cell == null){
                            cell = 0;
                        }
                        if (i === "country") {
                            line += "<td>";
                            line += "<a href='index.html'>" + cell + "</a>";
                            //line += "<a href='index.html?c=" + cell + "'>" + cell + "</a>";
                            line += "</td>";
                        } else {
                            line += "<td>" + cell + "</td>";
                        }
                    }
                })
                line += "</tr>";
                $("#table").append(line);
            })
            sortTableString("table", 0);

            $("#table tr th:nth-child(1)").on("click", function () {
                sortTableString("table", 0);
            });
            $("#table tr th:nth-child(2)").on("click", function () {
                sortTableNumber("table", 1);
            });
            $("#table tr th:nth-child(3)").on("click", function () {
                sortTableNumber("table", 2);
            });
            $("#table tr th:nth-child(4)").on("click", function () {
                sortTableNumber("table", 3);
            });
            $("#table tr th:nth-child(5)").on("click", function () {
                sortTableNumber("table", 4);
            });
            function sortTableString(name, column) {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById(name);
                switching = true;
                while (switching) {
                    switching = false;
                    rows = table.rows;
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i].getElementsByTagName("td")[column];
                        y = rows[i + 1].getElementsByTagName("td")[column];
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }

            function sortTableNumber(name, column) {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById(name);
                switching = true;
                while (switching) {
                    switching = false;
                    rows = table.rows;
                    for (i = 1; i < (rows.length - 1); i++) {
                        shouldSwitch = false;
                        x = rows[i + 1].getElementsByTagName("td")[column];
                        y = rows[i].getElementsByTagName("td")[column];
                        if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }


        }
    });
})

