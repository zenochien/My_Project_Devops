module.exports = {
  apps: [
    {
      name: 'hairlie-server',
      script: './src/index.js',
      cwd: '/home/ec2-user/hairlie-server/current',
      // instances: 'max',
      // exec_mode: 'cluster',
      watch: false,
      ignore_watch: ['deploy', 'node_modules', 'logs'],
      merge_logs: false,
      env: {
        NODE_ENV: 'dev',
      },
      env_dev: {
        NODE_ENV: 'dev',
      },
      env_stg: {
        NODE_ENV: 'stg',
      },
    },
  ],

  deploy: {
    develop: {
      user: 'ec2-user',
      host: '54.150.11.34',
      ref: 'origin/develop',
      repo: 'git@bitbucket.org:hidesignsJP/hairlie-server.git',
      path: '/home/ec2-user/hairlie-server',
      'pre-setup': 'rm -rf ~/hairlie-server/source',
      'post-deploy':
        'npm i && npm run apidoc && npm run changelog && cp .env.dev .env && pm2 startOrRestart ecosystem.config.js --env dev',
    },
    'local-dev': {
      user: 'ec2-user',
      host: 'localhost',
      ref: 'origin/develop',
      repo: 'git@bitbucket.org:hidesignsJP/hairlie-server.git',
      path: '/home/ec2-user/hairlie-server',
      'pre-setup': 'rm -rf ~/hairlie-server/source',
      'post-deploy':
        'npm i && npm run apidoc && npm run changelog && cp .env.dev .env && pm2 startOrRestart ecosystem.config.js --env dev',
    },
    'deploy-dev': {
      user: 'ec2-user',
      host: '54.150.11.34',
      ref: 'origin/deploy-dev',
      repo: 'git@bitbucket.org:hidesignsJP/hairlie-server.git',
      path: '/home/ec2-user/hairlie-server',
      'pre-setup': 'rm -rf ~/hairlie-server/source',
      'post-deploy':
        'npm i && npm run apidoc && npm run changelog && cp .env.dev .env && pm2 startOrRestart ecosystem.config.js --env dev',
    },
    'deploy-stg': {
      user: 'ec2-user',
      host: '54.168.101.152',
      ref: 'origin/deploy-stg',
      repo: 'git@bitbucket.org:hidesignsJP/hairlie-server.git',
      path: '/home/ec2-user/hairlie-server',
      'pre-setup': 'rm -rf ~/hairlie-server/source',
      'post-deploy':
        'npm i && npm run apidoc && npm run changelog && cp .env.stg .env && pm2 startOrRestart ecosystem.config.js --env stg',
    },
  },
};
