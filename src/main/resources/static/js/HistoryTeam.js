document.addEventListener('DOMContentLoaded', getHistory);
function getHistory() {
    fetch('http://127.0.0.1:8081/Api/V1/historyteam/'+window.location.href.substring(window.location.href.lastIndexOf("/")+1))
        .then(response => response.json())
        .then(data => {
            let roundCount = 1; // Biến đếm cho trường "round"

            const matchResultsTable = document.getElementById('matchResults').getElementsByTagName('tbody')[0];
            data.forEach(match => {
                const newRow = matchResultsTable.insertRow();
                newRow.insertCell(0).innerText = roundCount; // Gán giá trị của biến đếm vào cột "round"
                roundCount++; // Tăng biến đếm lên 1 sau mỗi lần sử dụng

                newRow.insertCell(1).innerText = match.nameHomeTeam;
                newRow.insertCell(2).innerText = match.scoreHomeTeam;
                newRow.insertCell(3).innerText = match.scoreAwayTeam;
                newRow.insertCell(4).innerText = match.nameAwayTeam;
                newRow.setAttribute('data-id', match.idMatch); // Lưu idMatch vào thuộc tính data-id

                // Thêm sự kiện click vào từng hàng
                newRow.addEventListener('click', () => {
                    const idMatch = newRow.getAttribute('data-id');
                    window.location.href = '/detailmatch/' + idMatch; // Chuyển sang trang chi tiết trận đấu
                });
            });
        })
        .catch(error => console.error('Error fetching match results:', error));
}
