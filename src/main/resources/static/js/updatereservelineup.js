getPlayerResponse()
function getPlayerResponse() {
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number = parts[parts.length - 2];
    // Gọi API để lấy danh sách cầu thủ từ đội bóng có id là teamId
    fetch('http://127.0.0.1:8081/Api/V1/playerListByTeamID/' + number)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Tạo một biến để lưu trữ HTML của bảng
            listPlayer = []
            // Lặp qua danh sách cầu thủ và thêm từng hàng vào bảng
            data.forEach((player, index) => {
                // Tạo một hàng mới trong bảng
                a = new Player(player.id,player.name,player.dob,player.number,player.position,player.team)
                listPlayer.push(a);
            });

            getPlayerByIdTeam(listPlayer);

        })
        .catch(error => console.error('Error fetching players:', error));
}

function getPlayerByIdTeam(playerList){
    var reserve = JSON.parse("["+localStorage.getItem("reserve")+"]");

    var main = JSON.parse("["+localStorage.getItem("main")+"]");

    console.log("main",main.includes(1));
    console.log("list player",playerList[0].id);
    let tableHtml = '<table>';

    tableHtml += '<tr><th>STT</th><th>Tên cầu thủ</th><th>Số áo</th><th>Vị trí</th><th>Action</th></tr>';
    for(var i= 0 ;i<playerList.length;i++){
        if(!main.includes(playerList[i].id)){
            tableHtml += '<tr>';

            tableHtml += '<td>' + (i + 1) + '</td>';

            tableHtml += '<td>' + playerList[i].name + '</td>';
            // Thêm số áo
            tableHtml += '<td>' + playerList[i].number + '</td>';
            // Thêm vị trí
            tableHtml += '<td>' + playerList[i].position + '</td>';
            if(reserve.includes(playerList[i].id)){
                tableHtml += '<td><input type="checkbox" class="player" value="' + playerList[i].id + '" checked="true"></td>';
            }else{
                tableHtml += '<td><input type="checkbox" class="player" value="' + playerList[i].id + '"></td>';
            }
            // Thêm checkbox với class "player" và giá trị là id của cầu thủ

            // Đóng hàn
            tableHtml += '</tr>';

            tableHtml += '</table>';
        }

    }


    // Inner HTML vào một phần tử có id là "playerTable"
    document.getElementById('playerTable').innerHTML = tableHtml;
}
var button = document.getElementById("register-button");

// Gán sự kiện click cho button
button.addEventListener("click", function() {
    // Lấy danh sách tất cả các checkbox có class là "player"
    var checkboxes = document.querySelectorAll('.player');

    // Khởi tạo biến đếm
    var count = 0;

    var list = []

    // Duyệt qua danh sách checkbox để đếm số lượng checkbox đã được kiểm tra (checked)
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            count++;
            list.push(parseInt(checkbox.value));
        }
    });

    // Hiển thị kết quả đếm
    if(count!=8){
        alert("Đội hình phải là 8 người, vui lòng chọn lại")
    }else {
        console.log(list);
        postReserveLineup(list);

    }

});
// Định nghĩa function để gọi API
function postReserveLineup(lineupList) {
    const urls = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = urls.split('/');
    const number = parts[parts.length - 1];
    const number2 = parts[parts.length - 2];
    // Tạo một object chứa dữ liệu cần gửi đi
    var data = {
        listUser: lineupList
    };

    // Chuyển object thành JSON

    var jsonData = JSON.stringify(data);
    console.log(jsonData)
    // Tạo một XMLHttpRequest object
    var xhr = new XMLHttpRequest();


    // Khai báo phương thức và endpoint của API
    var url = 'http://127.0.0.1:8081/Api/V1/ReserveLineUp/' + number;

    // Mở kết nối với API
    xhr.open('POST', url, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {
        if (xhr.status == 201) {
            // Xử lý khi request thành công
            alert("dang ki doi du bi thuc thanh cong")
            localStorage.clear()
            window.location = "/lineup/" + number2 + "/" + number;
        } else {
            // Xử lý khi request không thành công
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };
    xhr.send(jsonData);
}