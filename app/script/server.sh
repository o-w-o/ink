echo clear node_modules dir
npm run clear

echo install server dependencies
npm ci --no-optional

echo bootstrap server
npm run start:server