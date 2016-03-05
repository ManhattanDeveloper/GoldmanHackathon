echo 'installing modules...'
npm install

cd public

echo 'compiling app...'
gulp

echo 'building sass...'
gulp sass

cd ..
echo 'running app...'
node server.js