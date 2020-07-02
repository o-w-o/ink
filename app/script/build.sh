echo install dependencies
npm ci

echo build source
npm run build:client && npm run build:server