import IplTeamService from '../services/ipl-team-service.js';

let iplTeamService = new IplTeamService()

export const getAllTeams = async (req, res) => {
    try {
        const response = await iplTeamService.findAll();
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched IPL teams',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}