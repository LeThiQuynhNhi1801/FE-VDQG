function MatchComing(){
    const url = window.location.href.split("/")
    const idTeam = url[url.length - 1]
    window.location = "/matchcoming/"+ idTeam;
}
