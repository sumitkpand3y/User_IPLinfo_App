// import {IplTeamService} from "../services/ipl-team-service"
import { IplTeamRepository } from "../repository/index.js";

let iplTeamRepository = new IplTeamRepository()
let defaultIplTeams = [
        {
            "name": "Royal Challengers Bangalore",
            "id": "RCB",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png"
        },
        {
            "name": "Kolkata Knight Riders",
            "id": "KKR",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/kkr-logo-img.png"
        },
        {
            "name": "Kings XI Punjab",
            "id": "KXP",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/kxp-logo-img.png"
        },
        {
            "name": "Chennai Super Kings",
            "id": "CSK",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/csk-logo-img.png"
        },
        {
            "name": "Rajasthan Royals",
            "id": "RR",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/rr-logo-img.png"
        },
        {
            "name": "Mumbai Indians",
            "id": "MI",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/mi-logo-img.png"
        },
        {
            "name": "Sunrisers Hyderabad",
            "id": "SH",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/srh-logo-img.png"
        },
        {
            "name": "Delhi Capitals",
            "id": "DC",
            "team_image_url": "https://assets.ccbp.in/frontend/react-js/dc-logo-img.png"
        }
    ]

export async function addDefaultIplTeams() {
    let count = await iplTeamRepository.getCountTeams()
    if ( count === 0 ) {
        try {
            const response = iplTeamRepository.insertManyTeams(defaultIplTeams)
            return response;
        } catch (error) {
            console.log("Error while adding default ipl teams", error?.message);
            throw {error};
        }
    } 
    
}