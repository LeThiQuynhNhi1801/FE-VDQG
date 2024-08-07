package com.gr.football_fe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {
    @GetMapping("login")
    public String Login(){ return "Login";}

    @GetMapping("home")
    public String Home(){ return "/Admin/Home";}

    @GetMapping("homemanager")
    public String HomeManager(){ return "/Manager/Home";}

    @GetMapping("teamleague")
    public String TeamLeague(){ return "/Admin/TeamLeague";}

    @GetMapping("schedulematch")
    public String schedulematch(){ return "/Admin/ScheduleMatch";}

    @GetMapping("listmatch")
    public String schedule(){ return "/Manager/ScheduleMatch";}

    @GetMapping("chooseopenteam")
    public String chooseopenteam(){ return "/Admin/ChooseOpenTeam";}

    @GetMapping("ManagerTeam/{idTeam}")
    public String ManagerTeam(){ return "ManagerTeam";}

//    @GetMapping("matchcoming/{idTeam}")
//    public String matchcoming(){ return "matchcoming";}

    @GetMapping("signlineup/{idTeam}/{idMatch}")
    public String signlineup(){ return "/Manager/signlineup";}

    @GetMapping("updatemainlineup/{idTeam}/{idMatch}")
    public String updatemainlineup(){ return "/Manager/updatemainlineup";}

    @GetMapping("signReserve/{idTeam}/{idMatch}")
    public String signReserve(){ return "/Manager/signReserve";}

    @GetMapping("updatereservelineup/{idTeam}/{idMatch}")
    public String updatereservelineup(){ return "/Manager/updatereservelineup";}

    @GetMapping("bxhteam")
    public String BXHTeam(){ return "/Admin/BXHTeam";}

    @GetMapping("bxhfairplay")
    public String BXHFairplay(){ return "/Admin/BXHFairplay";}

    @GetMapping("bxhgoals")
    public String BXHGoal(){ return "/Admin/BXHGoals";}
    @GetMapping("bxhteammanager")
    public String BXHTeamManager(){ return "/Manager/BXHTeam";}

    @GetMapping("bxhfairplaymanager")
    public String BXHFairplayManager(){ return "/Manager/BXHFairplay";}

    @GetMapping("bxhgoalsmanager")
    public String BXHGoalManager(){ return "/Manager/BXHGoals";}

    @GetMapping("historyteam/{id}")
    public String historyteam(){ return "HistoryTeam";}

    @GetMapping("detailmatch/{id}")
    public String detailmatch(){ return "DetailMatch";}

    @GetMapping("lineup/{idMatch}")
    public String lineup(){ return "/Manager/Lineup";}

    @GetMapping("addplayer")
    public String addPlayer(){ return "/Manager/AddPlayer";}

    @GetMapping("playerteam")
    public String PlayerTeam(){ return "/Manager/PlayerTeam";}
}

