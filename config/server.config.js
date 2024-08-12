import dotenv from "dotenv";

dotenv.config();


const serverConfig={
    port:process.env.SERVER_PORT,
    cloudName : process.env.SERVER_CLOUD_NAME,
    cloudSecretKey:process.env.SERVER_SECRET_KEY,
    cloudApiKey : process.env.SERVER_CLOUD_API_KEY,
    awsRegion:process.env.SERVER_AWS_REGION,
    awsAccessKey:process.env.SERVER_AWS_ACCESSKEY,
    awsSecrectAccesskey:process.env.SERVER_AWS_SECRETACCESSKEY,
}


export default serverConfig