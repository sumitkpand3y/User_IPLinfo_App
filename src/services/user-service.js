import { UserRepository } from '../repository/index.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch(error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email})
            return user;
        } catch(error) {
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw new Error('no user found');
            }
            if(!user.comparePassword(data.password)) {
                throw new Error('Incorrect password');
            }
            const token = user.genJWT();
            return token;
        } catch(error) {
            throw error;
        }
    }   

    async updateTeam(userId, data) {
        try {
            const user = await this.userRepository.findOneAndUpdate(userId, data);
            return user
        } catch(error) {
            console.log("Failed to update User Team")
            throw error;
        }
    } 

    async get(userId) {
        try {
            const user = await this.userRepository.getUserWithTeam(userId);
            return user
        } catch(error) {
            console.log("Failed to update User Team")
            throw error;
        }
    }    

    async getAll() {
        try {
            const user = await this.userRepository.getAllUserWithTeam();
            return user
        } catch(error) {
            console.log("Failed to update User Team")
            throw error;
        }
    }    

    async updateUserDetails(data) {
        try {
            const user = await this.userRepository.updateUserDetails(data);
            return user
        } catch(error) {
            console.log("Failed to update User Team")
            throw error;
        }
    }    

}

export default UserService;