// Just for testing admins 

require('dotenv').config();
const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const Driver = require('./models/Driver');



async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);


        const adminPhone = '9999990000';
        const existing = await Driver.findOne({phone: adminPhone});
        if (existing) { 
            console.log('Admin Already exists: ',existing._id.toString());
            await mongoose.disconnect();
            return;
        }

        const password = 'Sen@1234'; 
        const passwordHash = await bcrypt.hash(password, 10);

        const admin = new Driver({
            name: 'Project Admin',
            phone: adminPhone,
            passwordHash,
            lisenceNo: 'ADMIN-0000',
            role: 'admin' //As Admin Role 
        });

        await admin.save();
        console.log('Admin user Created: ');
        console.log('Phone: ', adminPhone);
        console.log('Password: ',password);
        console.log('id: ', admin._id.toString());

        await mongoose.disconnect();          
    } catch (err) {
        console.error('SeedAdmin error: ', err);
        process.exit(1);
    }
};

seedAdmin();