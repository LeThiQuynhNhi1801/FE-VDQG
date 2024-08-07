getDetail()
function getDetail(){
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number1 = parts[parts.length - 1];
    // Gọi API để lấy danh sách cầu thủ từ đội bóng có id là teamId
    fetch('http://127.0.0.1:8081/Api/V1/detailmatch/' + number1 )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Tạo một biến để lưu trữ HTML của bảng
            var s = document.getElementById("detail");
            var s1 = "";
            s1+= "<thead><tr><th>Nội dung</th><th>"+data[0].name+"</th><th>"+data[1].name+"</th></tr></thead>"
            s1+="<tbody>\n" +
                "    <tr>\n" +
                "        <td>Tỉ số</td>\n" +
                "        <td>"+ (data[0].ghiban.length+data[1].phanluoinha.length)+"</td>\n" +
                "        <td>"+(data[1].ghiban.length+data[0].phanluoinha.length)+"</td>\n" +
                "    </tr>\n"
            var s2 = "";
            for(var i=0;i<data[0].ghiban.length;i++){
                s2+=data[0].ghiban[i] +"<br>"
            }
            for(var i= 0;i<data[0].phanluoinha.length;i++){
                s2+=data[0].phanluoinha[i] +"(**)"+"<br>"
            }
            var s3 = "";
            for(var i=0;i<data[1].ghiban.length;i++){
                s3+=data[1].ghiban[i] +"<br>"
            }
            for(var i= 0;i<data[1].phanluoinha.length;i++){
                s3+=data[1].phanluoinha[i] +"(**)"+"<br>"
            }
               s1+= "    <tr>\n" +
                "        <td>Ghi bàn</td>\n" +
                "        <td>"+s2+"</td>\n" +
                "        <td>"+s3+"</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Lỗi</td>\n" +
                "        <td>"+data[0].loi+"</td>\n" +
                "        <td>"+data[1].loi+"</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Phạt góc</td>\n" +
                "        <td>"+data[0].phatgoc+"</td>\n" +
                "        <td>"+data[0].phatgoc+"</td>\n" +
                "    </tr>\n"
            var s4 = "";
            for(var i=0;i<data[0].thevang.length;i++){
                s4+=data[0].thevang[i] +"<br>"
            }
            var s5 = "";
            for(var i=0;i<data[1].thevang.length;i++){
                s5+=data[1].thevang[i] +"<br>"
            }
            var s6 = "";
            for(var i=0;i<data[0].thedo.length;i++){
                s6+=data[0].thedo[i] +"<br>"
            }
            var s7 = "";
            for(var i=0;i<data[1].thedo.length;i++){
                s5+=data[1].thedo[i] +"<br>"
            }
            s1+=    "    <tr>\n" +
                "        <td>Thẻ vàng</td>\n" +
                "        <td>"+s4+"</td>\n" +
                "        <td>"+s5+"</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Thẻ đỏ</td>\n" +
                "        <td>"+s6+"</td>\n" +
                "        <td>"+s7+"</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Thay người</td>\n" +
                "        <td>"+data[0].vaosan.length+"</td>\n" +
                "        <td>"+data[1].vaosan.length+"</td>\n" +
                "    </tr>\n" +
                "    </tbody>"
            s.innerHTML = s1;
        })
        .catch(error => console.error('Error fetching players:', error));
}