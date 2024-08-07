// Lấy ra button theo id

getPlayerNotInMainlineup();
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
    const number2 = parts[parts.length -2];
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
    var url = 'http://127.0.0.1:8081/Api/V1/ReserveLineUp/'+number;

    // Mở kết nối với API
    xhr.open('POST', url, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {
        if (xhr.status==201) {
            // Xử lý khi request thành công
            alert("dang ki doi du bi thuc thanh cong")
            window.location = "/lineup/"+number2+"/"+number;
        } else {
            // Xử lý khi request không thành công
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    // Xử lý sự kiện khi request gặp lỗi
    xhr.onerror = function () {
        console.error('Có lỗi xảy ra khi gửi request');
    };

    // Gửi request đi với dữ liệu JSON
    xhr.send(jsonData);
}
function getPlayerNotInMainlineup() {
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number = parts[parts.length - 2];
    const number1 = parts[parts.length - 1];
    // Gọi API để lấy danh sách cầu thủ từ đội bóng có id là teamId
    fetch('http://127.0.0.1:8081/Api/V1/playernotinmainlineup/' + number+"?idMatch="+number1)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Tạo một biến để lưu trữ HTML của bảng
            let tableHtml = '<table>';
            // Thêm header của bảng
            tableHtml += '<tr><th>STT</th><th>Tên cầu thủ</th><th>Số áo</th><th>Vị trí</th><th>Action</th></tr>';

            // Lặp qua danh sách cầu thủ và thêm từng hàng vào bảng
            data.forEach((player, index) => {
                // Tạo một hàng mới trong bảng
                tableHtml += '<tr>';
                // Thêm số thứ tự
                tableHtml += '<td>' + (index + 1) + '</td>';
                // Thêm tên cầu thủ
                tableHtml += '<td>' + player.name + '</td>';
                // Thêm số áo
                tableHtml += '<td>' + player.number + '</td>';
                // Thêm vị trí
                tableHtml += '<td>' + player.position + '</td>';
                // Thêm checkbox với class "player" và giá trị là id của cầu thủ
                tableHtml += '<td><input type="checkbox" class="player" value="' + player.id + '"></td>';
                // Đóng hàng
                tableHtml += '</tr>';
            });

            // Đóng bảng
            tableHtml += '</table>';

            // Inner HTML vào một phần tử có id là "playerTable"
            document.getElementById('playerTable').innerHTML = tableHtml;
        })
        .catch(error => console.error('Error fetching players:', error));
}

// function getPlayerByIdTeam() {
//
//     // Tạo một XMLHttpRequest object
//     var xhr = new XMLHttpRequest();
//
//     // Khai báo phương thức và endpoint của API
//     var url = 'http://127.0.0.1:8081/Api/V1/playerListByTeamID/' + window.location.href.substring(window.location.href.lastIndexOf("/")+1);
//
//     // Mở kết nối với API
//     xhr.open('GET', url, true);
//
//     // Thiết lập header cho request
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     // Xử lý sự kiện khi request hoàn thành
//     xhr.onload = function () {
//         if (xhr.status==200) {
//             // Xử lý khi request thành công
//
//             window.location = "/signReserve"
//         } else {
//             // Xử lý khi request không thành công
//             console.error('Có lỗi xảy ra');
//             console.error(xhr.statusText);
//         }
//     };
//
//     // Xử lý sự kiện khi request gặp lỗi
//     xhr.onerror = function () {
//         console.error('Có lỗi xảy ra khi gửi request');
//     };
//
//     // Gửi request đi với dữ liệu JSON
//     xhr.send();
// }




