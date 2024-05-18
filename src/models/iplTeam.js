import mongoose from "mongoose";

const iplTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    team_image_url: {
        type: String,
        required: false,
    }
    // userId: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ]
    
}, {timestamps: true});

const IplTeam = mongoose.model('IplTeam', iplTeamSchema);
export default IplTeam;