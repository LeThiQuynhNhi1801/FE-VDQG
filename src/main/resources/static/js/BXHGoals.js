bxhgoals()
function bxhgoals(){

    var xhr = new XMLHttpRequest();

    var urlR = 'http://127.0.0.1:8081/Api/V1/bxhgoals';

    // Mở kết nối với API
    xhr.open('GET', urlR, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {

        if (xhr.status==200) {
            const data = JSON.parse(xhr.responseText);
            // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
            console.log(data);
            s = document.getElementById("goals");
            s1 = "";
            var k = 0;
            if(data.length<10) k=data.length
            else k=10;
            for(var i=0;i<k;i++){
                s1+="<tr>\n" +
                    "      <td>"+(i+1)+"</td>\n" +
                    "      <td>"+data[i].namePlayer+"</td>\n" +
                    "      <td>"+data[i].nameTeam+"</td>\n" +
                    "      <td>"+data[i].goals+"</td>\n" +
                    "    </tr>"
            }
            console.log(s1);
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