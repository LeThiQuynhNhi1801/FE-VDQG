document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number = parts[parts.length - 2];
    const number1 = parts[parts.length - 1];
    var team = window.localStorage.getItem("team")
    var urlR = 'http://127.0.0.1:8081/Api/V1/gamecoming/'+team;

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const matches = JSON.parse(xhr.responseText);
            console.log(matches)
            var matchList = document.getElementById('list_match');
            var match = "";
            for(var i=0;i<matches.length;i++){
                match+="<div class=\"match\">\n" +
                    "            <div class=\"teams\">\n" +
                    "                <span class=\"home-team\">"+matches[i].hometeam.name+"</span> vs <span class=\"away-team\">"+matches[i].awayteam.name+"</span>\n" +
                    "            </div>\n" +
                    "            <div class=\"details\">\n" +
                    "                <p>Sân Vận Động: "+matches[i].hometeam.stadium+"</p>\n" +
                    "                <p>Thời Gian: "+matches[i].timeMatch+"</p>\n" +
                    "            </div>\n" +
                    "            <div class=\"actions\">\n" +
                    "                <button onclick=\"viewLineup("+matches[i].idMatch+")\">Xem Đội Hình</button>\n" +
                    "                <button onclick=\"registerLineup("+matches[i].idMatch+")\">Đăng Kí Đội Hình</button>\n" +
                    "            </div>\n" +
                    "        </div>"
            }
            console.log(match)
            matchList.innerHTML = match;

        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();
});

function viewLineup(a){
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number = parts[parts.length - 2];
    const number1 = parts[parts.length - 1];
    window.location = "/lineup/"+number1+"/"+a;
}
function registerLineup(a){
    const url = window.location.href;

// Phân tích URL và trích xuất phần số
    const parts = url.split('/');
    const number = parts[parts.length - 2];
    const number1 = parts[parts.length - 1];
    window.location = "/signlineup/"+number1+"/"+a;
}
