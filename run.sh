rm -rf ./server/public && mkdir ./server/public && mv ./dist/index.html ./server/public/index.html && mv ./dist/static/ ./server/public/static/ && rm -f ./dist && pm2 start pm2.json
