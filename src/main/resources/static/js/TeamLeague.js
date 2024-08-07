// allleague()
// function allleague(){
//
//     var xhr = new XMLHttpRequest();
//
//     var urlR = 'http://127.0.0.1:8081/Api/V1/allleague';
//
//     // Mở kết nối với API
//     xhr.open('GET', urlR, true);
//
//     // Thiết lập header cho request
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     // Xử lý sự kiện khi request hoàn thành
//     xhr.onload = function () {
//
//         if (xhr.status==200) {
//             const data = JSON.parse(xhr.responseText);
//             // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
//
//
//             var ops = document.getElementById("league-select")
//             var op = ""
//             for(var i=0; i<data.length;i++){
//                 op+= "<option onclick='TeamLeague("+data[i].idLeague+")' value="+data[i].idLeague+">"+data[i].nameLeague+"</option>"
//             }
//             ops.innerHTML = op;
//         }
//         else {
//             // Xử lý khi request không thành công
//             console.error('Có lỗi xảy ra');
//             console.error(xhr.statusText);
//         }
//     };
//
//
//     xhr.send();
// }
//
// function TeamLeague(idLeague){
//     var xhr = new XMLHttpRequest();
//
//     var urlR = 'http://127.0.0.1:8081/Api/V1/teamleague/'+idLeague;
//
//     // Mở kết nối với API
//     xhr.open('GET', urlR, true);
//
//     // Thiết lập header cho request
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     // Xử lý sự kiện khi request hoàn thành
//     xhr.onload = function () {
//
//         if (xhr.status==200) {
//             const data = JSON.parse(xhr.responseText);
//             // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
//             console.log(data);
//             var ops = document.getElementById("teams")
//             var op = ""
//             for(var i; i<data.length;i++){
//                 op+= "<th><img src='/"+data[i].logo+"'>"+data[i].nameTeam+"</th>"
//             }
//             ops.innerHTML = op;
//         }
//         else {
//             // Xử lý khi request không thành công
//             console.error('Có lỗi xảy ra');
//             console.error(xhr.statusText);
//         }
//     };
//
//
//     xhr.send();
// }
document.addEventListener('DOMContentLoaded', function() {
    // Call allleague() when the document is fully loaded
    allleague();

    // Add event listener to the select element
    document.getElementById('league-select').addEventListener('change', function() {
        const selectedLeagueId = this.value;
        if (selectedLeagueId) {
            TeamLeague(selectedLeagueId);
        } else {
            document.getElementById('teams').innerHTML = ''; // Clear teams if no league is selected
        }
    });
});

function allleague() {
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/allleague';

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            var ops = document.getElementById("league-select");
            var op = "<option value=''>Chọn mùa giải</option>"; // Default option
            for (var i = 0; i < data.length; i++) {
                op += "<option value='" + data[i].idLeague + "'>" + data[i].nameLeague + "</option>";
            }
            ops.innerHTML = op;
        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();
}

function TeamLeague(idLeague) {
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/teamleague/' + idLeague;

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            var ops = document.getElementById("teams");
            var op = "";
            for (var i = 0; i < data.length; i++) {
                op += "<tr><td>" + data[i].name+ "</td><td></tr>";
            }
            ops.innerHTML = op;
        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();
}
