getLineup();
function getLineup(){
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    var team = window.localStorage.getItem("team")
    const number1 = parts[parts.length - 1];
    var xhr = new XMLHttpRequest();

    var urlR = 'http://127.0.0.1:8081/Api/V1/lineup/'+team+"?idMatch="+number1;

    // Mở kết nối với API
    xhr.open('GET', urlR, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {

        if (xhr.status==200) {
            const data = JSON.parse(xhr.responseText);
            // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
            console.log(data); // Hiển thị dữ liệu trong console
            var s = document.getElementById("playerTableBody")
            var s1 = ""
            for(var i = 0;i<data.length;i++){
                if(data[i].status == "main"){
                    s1+="<tr>\n" +
                        "    <th>"+(i+1)+"</th>\n" +
                        "    <th>"+data[i].player.name+"</th>\n" +
                        "    <th>"+data[i].player.number+"</th>\n" +
                        "    <th>"+data[i].player.position+"</th>\n" +
                        "    <th>Chính thức</th>\n" +
                        "  </tr>"
                }
            }
            for(var i = 0;i<data.length;i++){
                if(data[i].status != "main"){
                    s1+="<tr>\n" +
                        "    <th>"+(i+1)+"</th>\n" +
                        "    <th>"+data[i].player.name+"</th>\n" +
                        "    <th>"+data[i].player.number+"</th>\n" +
                        "    <th>"+data[i].player.position+"</th>\n" +
                        "    <th>Dự bị</th>\n" +
                        "  </tr>"
                }
            }
            s.innerHTML = s1;
        }
        else {
            // Xử lý khi request không thành công
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };
    xhr.send();
}
function updateLineup(){
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    var number = window.localStorage.getItem("team")
    const number1 = parts[parts.length - 1];
    window.location='/updatemainlineup/'+number+'/'+number1;
}
