module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '/api' : ''
                },
                headers: {
                    Connection: 'keep-alive',
                },
            }
        }
    }
};