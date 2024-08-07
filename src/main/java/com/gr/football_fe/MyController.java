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

    @GetMapping("listmatch/{idTeam}")
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
    public String BXHTeam(){ return "BXHTeam";}

    @GetMapping("bxhfairplay")
    public String BXHFairplay(){ return "BXHFairplay";}

    @GetMapping("bxhgoals")
    public String BXHGoal(){ return "BXHGoals";}

    @GetMapping("historyteam/{id}")
    public String historyteam(){ return "HistoryTeam";}

    @GetMapping("detailmatch/{id}")
    public String detailmatch(){ return "DetailMatch";}

    @GetMapping("lineup/{idTeam}/{idMatch}")
    public String lineup(){ return "/Manager/Lineup";}
}

