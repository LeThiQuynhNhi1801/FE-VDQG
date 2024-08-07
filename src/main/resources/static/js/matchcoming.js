
matchcoming();
function matchcoming(){

    const urls = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = urls.split('/');
    const number = parts[parts.length - 1];
    alert(number);
    var xhr = new XMLHttpRequest();

    var url = 'http://127.0.0.1:8081/Api/V1/gamecoming/'+number;

    // Mở kết nối với API
    xhr.open('GET', url, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {

        if (xhr.status==200) {
            const data = JSON.parse(xhr.responseText);
                // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
                console.log(data);
            var s = '';
                for(var i=0;i<data.length;i++){
                    var localDateTime = moment(data[i].timeMatch);
                    var formattedDateTime = localDateTime.format('HH:mm [ngày] DD/MM/YYYY');

                    s+= '<div className="match-info">'+
                        '<div className="team-names">'+
                        '<h2>'+data[i].idHometeam.name + " - " +  data[i].idAwayteam.name +'</h2>'+
                        '</div>'+
                        '<div className="stadium">'+
                        '<p>Sân vận động : '+data[i].idHometeam.stadium+'</p>'+
                        '</div>'+
                        '<div className="time">'+
                        '<p>'+formattedDateTime+'</p>'+
                        '</div>'+
                        '</div>'+
                        '<div className="register-button">'+
                        '<a href="/signlineup/'+number+'/'+data[i].idMatch+'">Đăng kí đội hình ra sân</a>'+
                        '</div>'+
                        '<div className="view-button">'+
                        '<a href="/lineup/'+number+'/'+data[i].idMatch+'">Xem đội hình ra sân</a>'+
                        '</div>'

                }// Hiển thị dữ liệu trong console
            var s1 = document.getElementById("match");
               s1.innerHTML = s;
            }
         else {
            // Xử lý khi request không thành công
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };
    xhr.send();
}