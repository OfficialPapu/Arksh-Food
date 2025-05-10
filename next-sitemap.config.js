module.exports = {
  siteUrl: 'https://www.food.arkshfood.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/account/*',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      'https://www.food.arkshfood.com/sitemap.xml',
    ],
  },
};
