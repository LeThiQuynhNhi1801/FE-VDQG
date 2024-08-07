function login(){

    var xhr = new XMLHttpRequest();

    var urlR = 'http://127.0.0.1:8081/Api/V1/login';

    // Mở kết nối với API
    xhr.open('POST', urlR, true);

    // Thiết lập header cho request
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Xử lý sự kiện khi request hoàn thành
    xhr.onload = function () {

        if (xhr.status==200) {
            const data = JSON.parse(xhr.responseText);
            // Dữ liệu được chuyển đổi thành JSON và lưu trong biến data
            console.log(data);
            window.localStorage.setItem("token" , data.token)// Hiển thị dữ liệu trong console
            if(data.role=="[ROLE_ADMIN]"){
                window.location = "/home"
            }else if (data.role == "[ROLE_MANAGER]"){
                window.localStorage.setItem("team" , data.idTeam)// Hiển thị dữ liệu trong console
                window.location="/homemanager"
            }
        }
        else {
            // Xử lý khi request không thành công
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };
    const loginRequest={
        userName : document.getElementById("username").value,
        passWord : document.getElementById("password").value
    }

    xhr.send(JSON.stringify(loginRequest));
}