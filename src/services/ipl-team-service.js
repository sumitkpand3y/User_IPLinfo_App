import { IplTeamRepository } from "../repository/index.js";

class IplTeamService {
    constructor() {
        this.iplTeamRepository = new IplTeamRepository();
    }

    async insertMany(data){
        let response = await this.iplTeamRepository.insertManyTeams(data)
        return response
    }
    // async create(modelId, modelType, userId, content) {
    //     if(modelType == 'Tweet') {
    //         console.log("inside model type")
    //         var commentable = await this.tweetRepository.get(modelId);
    //     } else if(modelType == 'Comment') {
    //         var commentable = await this.commentRepository.get(modelId);
    //     } else {
    //         throw new Error('unknown model type');
    //     }
    //     const comment = await this.commentRepository.create({
    //         content: content,
    //         userId: userId,
    //         onModel: modelType,
    //         commentable: modelId,
    //         comments: []
    //     });
    //     commentable.comments.push(comment);
    //     await commentable.save();

    //     return comment;
    // }

    async findAll(){
        let response = await this.iplTeamRepository.getAll()
        return response
    }
}

export default IplTeamService;
