echo copy package.json
cp ./package.json ../dist
cp ./package-lock.json ../dist

echo enter dist dir
cd ../dist || exit
ls || dir

echo install server dependencies
npm ci --no-optional

echo bootstrap server
nodemon ./server.js