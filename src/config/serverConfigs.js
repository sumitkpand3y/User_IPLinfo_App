import { config } from "dotenv";
config();

export class Config {
     port = process.env.PORT || '3000';
     adminEmail = process.env.ADMIN_EMAIL
     adminEmailPass = process.env.ADMIN_EMAIL_PASS
}

export default Config