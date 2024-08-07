TeamLeague();
var teamRequestList = [];
function TeamLeague() {
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/teamleague';

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            teamRequestList = data;
            console.log(data);
            var ops = document.getElementById("team-list");
            var op = "";
            for (var i = 0; i < data.length; i++) {
                op += "<label> <input type='checkbox' class='team' value='"+data[i].idTeam+"'> "+data[i].name+" </label>";
            }
            ops.innerHTML = op;
            chooopenteam()
        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();
}

function chooopenteam(){
    // Lấy tất cả các checkbox có class 'team'
    const checkboxes = document.querySelectorAll('.team');
    console.log("a",checkboxes)
    // Thêm sự kiện 'click' cho mỗi checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            // const check = document.querySelectorAll('.team:checked')[0];
            // console.log(check)
            // check.checked = false;
            // if(checkbox.checked){
            //     checkbox.
            // }
            if (this.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
};

function ScheduleMatch() {
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/schedulematch';

    xhr.open('POST', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 201) {
            window.location = "/schedulematch";

        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };
    const checkedCheckboxes = document.querySelectorAll('.team:checked')[0].value;
    const objectIndex = teamRequestList.findIndex(obj => obj.id === checkedCheckboxes);

    if (objectIndex !== -1) {
        // Lấy đối tượng ra khỏi danh sách
        const [objectToMove] = teamRequestList.splice(objectIndex, 1);

        // Chèn đối tượng vào vị trí index 1
        teamRequestList.splice(0, 0, objectToMove);
    }
    xhr.send(JSON.stringify(teamRequestList));
}