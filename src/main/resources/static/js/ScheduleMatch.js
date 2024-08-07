function showMatches(roundNumber) {
    var xhr = new XMLHttpRequest();
    var urlR = 'http://127.0.0.1:8081/Api/V1/schedulematch';

    xhr.open('GET', urlR, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            const matchesContainer = document.getElementById('matches-container');
            const matchesList = document.getElementById('matches-list');

            // Clear previous matches
            matchesList.innerHTML = '';

            // Generate 7 matches for the selected round
            for (let i = 0; i < 7; i++) {
                const match = document.createElement('li');
                match.textContent =  data[roundNumber-1].gameResponseList[i].hometeam.name + " - " +data[roundNumber-1].gameResponseList[i].awayteam.name;
                matchesList.appendChild(match);
            }

            // Show the matches container
            matchesContainer.style.display = 'block';
        } else {
            console.error('Có lỗi xảy ra');
            console.error(xhr.statusText);
        }
    };

    xhr.send();
}
