/* eslint-disable */
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'vue-koa-todos',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'breezymelon',
      host : '47.95.111.133',
      ref  : 'origin/master',
      repo : 'git@github.com:MrElvin/vue-koa-demo.git',
      path : '/home/breezymelon/vue-koa-demo',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'breezymelon',
      host : '47.95.111.133',
      ref  : 'origin/master',
      repo : 'git@github.com:MrElvin/vue-koa-demo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
