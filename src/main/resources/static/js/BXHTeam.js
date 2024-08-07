document.addEventListener('DOMContentLoaded', function() {
    // Call allleague() when the document is fully loaded
    allleague();

    // Add event listener to the select element
    document.getElementById('league-select').addEventListener('change', function() {
        const selectedLeagueId = this.value;
        if (selectedLeagueId) {
            BXHTeam(selectedLeagueId);
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

function BXHTeam(idLeague){
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/bxhteam/'+idLeague;

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);

            var ops = document.getElementById("bxh");
            var op = ""; // Default option
            for (var i = 0; i < data.length; i++) {
                op += "<tr>\n" +
                    "      <td>"+(i+1)+"</td>\n" +
                    "      <td>"+data[i].nameTeam+"</td>\n" +
                    "      <td>"+(data[i].win+data[i].loss+data[i].drawn)+"</td>\n" +
                    "      <td>"+data[i].win+"</td>\n" +
                    "      <td>"+data[i].drawn+"</td>\n" +
                    "      <td>"+data[i].loss+"</td>\n" +
                    "      <td>"+data[i].hieuso+"</td>\n" +
                    "      <td>"+(data[i].win*3+data[i].drawn)+"</td>\n" +
                    "    </tr>";
            }
            ops.innerHTML = op;
        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();}