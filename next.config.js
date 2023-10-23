const { hostname } = require('os')
const { port } = require('pg/lib/defaults')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
