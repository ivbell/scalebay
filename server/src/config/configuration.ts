export default () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    front_url: process.env.FRONT_URI,
    mail: {
        name: process.env.M_NAME,
        transport: process.env.M_TRANSPORT,
        from: process.env.M_FROM_ADDRESS,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
})
