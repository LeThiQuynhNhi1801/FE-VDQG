// Hàm để lấy dữ liệu từ API và hiển thị trên bảng

function getBXHTeam() {
    fetch('http://127.0.0.1:8081/Api/V1/bxhteam')
        .then(response => response.json())
        .then(data => {
            var list=[];

            data.forEach((team, index) => {
                ranking = new RankingResponse(team.nameTeam,team.idteam,team.win,team.loss,team.drawn,team.win*3+team.drawn,team.hieuso);
                list.push(ranking)

            });
            BXHTeam(list);
            console.log(data);
        })
        .catch(error => console.error('Error fetching standings:', error));
}
function getBXHFairplay() {
    fetch('http://127.0.0.1:8081/Api/V1/bxhfairplay')
        .then(response => response.json())
        .then(data => {
            var list=[];

            data.forEach((team, index) => {
                ranking = new RankingFairplayResponse(team.nameTeam,team.idteam,team.thevang,team.thedo);
                list.push(ranking)

            });
            BXHFairplay(list);
            console.log(data);
        })
        .catch(error => console.error('Error fetching standings:', error));
}
function getTotalPenaltyPoints(team) {
    return team.thevang + team.thedo * 3;
}
function BXHTeam(list){
    list.sort((team1, team2) => {
        if (team1.point !== team2.point) {
            return team2.point - team1.point; // Sort by points descending
        } else if (team1.hieuso !== team2.hieuso) {
            return team2.hieuso - team1.hieuso; // Sort by hieuso descending
        } else {
            return getTotalPenaltyPoints(team1) - getTotalPenaltyPoints(team2); // Sort by total penalty points ascending
        }
    });
    const h2 = document.getElementById("title");
    h2.innerHTML="Bảng Xếp Hạng Đội Bóng";
    const thead = document.getElementById('BXH').getElementsByTagName('thead')[0];
    thead.innerHTML='';
    const headerRow = thead.insertRow();

    const cell1 = headerRow.insertCell();
    cell1.textContent = 'STT';
    const cell2 = headerRow.insertCell();
    cell2.textContent = 'Tên Đội';
    const cell3 = headerRow.insertCell();
    cell3.textContent = 'Số Trận Đấu';
    const cell4 = headerRow.insertCell();
    cell4.textContent = 'Thắng';
    const cell5 = headerRow.insertCell();
    cell5.textContent = 'Hòa';
    const cell6 = headerRow.insertCell();
    cell6.textContent = 'Thua';
    const cell7 = headerRow.insertCell();
    cell7.textContent = 'Hiệu số';
    const cell8 = headerRow.insertCell();
    cell8.textContent = 'Điểm';

    var tbody = document.getElementById('BXH').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for(var i = 0;i<list.length;i++){
        var row = tbody.insertRow();

        // Thêm số thứ tự vào cột đầu tiên
        var cellIndex = row.insertCell();
        cellIndex.innerHTML = i + 1;

        // Thêm tên đội vào cột thứ hai, với sự kiện onclick để chuyển hướng sang trang historyteam/idteam khi được click
        var cellTeamName = row.insertCell();
        var teamLink = document.createElement('a');
        teamLink.href = '/historyteam/'+list[i].idteam ;
        teamLink.textContent = list[i].nameTeam;
        cellTeamName.appendChild(teamLink);

        // Thêm số trận thắng, số trận hòa, số trận thua, hiệu số, và điểm vào các cột tiếp theo
        var cellWins = row.insertCell();
        cellWins.innerHTML = list[i].win + list[i].loss + list[i].drawn;
        var cellWins = row.insertCell();
        cellWins.innerHTML = list[i].win;

        var cellDraws = row.insertCell();
        cellDraws.innerHTML = list[i].drawn;

        var cellLosses = row.insertCell();
        cellLosses.innerHTML = list[i].loss;

        var cellGoalDifference = row.insertCell();
        cellGoalDifference.innerHTML = list[i].hieuso;

        var cellPoints = row.insertCell();
        cellPoints.innerHTML = list[i].point;
    }
}
function getScore(team) {
    return team.thevang  + team.thedo*3;
}
function BXHFairplay(list){
    list.sort((team1, team2) => {
        const score1 = getScore(team1);
        const score2 = getScore(team2);
        return score1 - score2;
    });
    console.log(list);
    const h2 = document.getElementById("title");
    h2.innerHTML="Bảng Xếp Hạng Fairplay";

    // Lấy đối tượng `<thead>`
    const thead = document.getElementById('BXH').getElementsByTagName('thead')[0];
    thead.innerHTML='';

// Tạo một hàng mới cho tiêu đề
    const headerRow = thead.insertRow();

// Thêm các ô (`<th>`) vào hàng tiêu đề và thêm nội dung
    const cell1 = headerRow.insertCell();
    cell1.textContent = 'STT';
    const cell2 = headerRow.insertCell();
    cell2.textContent = 'Tên Đội';
    const cell4 = headerRow.insertCell();
    cell4.textContent = 'Số thẻ vàng';
    const cell5 = headerRow.insertCell();
    cell5.textContent = 'Số thẻ đỏ';

    var tbody = document.getElementById('BXH').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for(var i = 0;i<list.length;i++){
        var row = tbody.insertRow();

        // Thêm số thứ tự vào cột đầu tiên
        var cellIndex = row.insertCell();
        cellIndex.innerHTML = i + 1;

        var cellTeamName = row.insertCell();
        cellTeamName.innerHTML = list[i].nameTeam;


        var cellthevang = row.insertCell();
        cellthevang.innerHTML = list[i].thevang;

        var cellthedo = row.insertCell();
        cellthedo.innerHTML = list[i].thedo;

    }
}

