import User from '../models/user.js';
import CrudRepository from './crud-repository.js';
import { ObjectId } from "bson";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch(error) {
            throw error;
        }
    }

    async findOneAndUpdate(userId, data) {
        try {
            let query = {
                _id: userId
            }
            const response = await User.findOneAndUpdate(
                query,
                data
            );
            return response;
        } catch(error) {
            throw error;
        }
    }

    async getUserWithTeam(id) {
        try {
            const userDetails = await User.findById(id).populate({
                path: 'selectTeam'
            }).select({ name: 1, selectTeam: 1, email:1, })
            return userDetails;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllUserWithTeam() {
        try {   
            const userDetails = await User.find()
              .populate({
                path: "selectTeam",
              })
              .select({ name: 1, selectTeam: 1, email: 1 });
            return userDetails;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserDetails(data) {
        try {  
            for (let i = 0; i < data.length; i++) {
                const user = data[i];
                const updatedUser = await User.findByIdAndUpdate(user._id, user)
            }
            return true;;
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default UserRepository;