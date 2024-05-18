import IplTeam from '../models/iplTeam.js';
import CrudRepository from './crud-repository.js';

class IplTeamRepository extends CrudRepository {
    constructor() {
        super(IplTeam);
    }
    
    // async findByUserAndLikeable(data) {
    //     try {
    //         const like = await Like.findOne(data);
    //         return like;
    //     } catch(error) {
    //         throw error;
    //     }
    // }
    async insertManyTeams(teamsData) {
        try {
            const result = await IplTeam.insertMany(teamsData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCountTeams() {
        try {
            const count = await IplTeam.countDocuments();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

export default IplTeamRepository;