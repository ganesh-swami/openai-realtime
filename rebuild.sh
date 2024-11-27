#!/bin/sh
cd web
pnpm install
pnpm build
pm2 restart nextjs-app


cd ../backend
pnpm install
pm2 restart nodejs-app


## uncomment these below if want to restart realtime-ai-agent as well
# cd ../agent
#set -a; . .env; set +a
#pm2 restart ai-agent
