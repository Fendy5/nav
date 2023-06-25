module.exports = {
  distDir: 'build',
  images: {
    domains: ['thirdwx.qlogo.cn'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.fendy5.cn',
        port: '',
        pathname: '/s/**'
      }
    ]
  }
}
