import cron from 'node-cron';
import UserService from '../services/user-service.js';
import {io} from '../index.js'

let previousUsers = [];
let userService = new UserService

// Define a function to schedule the cron job
export const scheduleCronJob = () => {
    // Schedule the cron job to run every second
    cron.schedule('* * * * *', async () => {
        try {
            // Query the user collection for changes
            const users = await userService.getAll()

            // Compare the current users with the previous users
            users.forEach((user, index) => {
                // Check if previous user exists and if the current user is different
                if (previousUsers && previousUsers.length>0) {
                    if (!previousUsers[index] || JSON.stringify(user) !== JSON.stringify(previousUsers[index])) {
                        console.log('User updated:', user);
                        // Perform actions for updated user
                        io.emit('notify', user._id);
                        // Update the previous user to the current user
                        previousUsers[index] = user;
                    }
                }
            });

            // Update the previous users with the current users for the next iteration
            previousUsers = users;
        } catch (error) {
            console.error('Error occurred while checking for changes:', error);
        }
        // Call the function recursively to schedule the cron job for the next iteration
    });
};

// Call the function to schedule the cron job initially
scheduleCronJob()
