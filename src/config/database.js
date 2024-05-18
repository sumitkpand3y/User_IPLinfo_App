import mongoose from 'mongoose';

let changeStream;

export const connect = async () => {
    await mongoose.connect('mongodb://localhost/user_ipl_notifier');

    // const db = mongoose.connection;
    // const collection = db.collection('users'); // Assuming the collection name is 'users'
    
    // // Watch for changes on the user collection
    // changeStream = collection.watch();
    
    // // Log changes to the console
    // changeStream.on('change', (change) => {
    //     console.log('Change:', change);
    // });
}
