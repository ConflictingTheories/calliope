# Set Directory Location
declare -x BUILD_PATH=$(pwd)
cd $BUILD_PATH;

# Source Env
. $BUILD_PATH/.env

# Copy Environment Variables
cp .env $BUILD_PATH/../_calliope/.env
cd $BUILD_PATH/../_calliope/app

# Copy Content to Storage For Build
rm -rf $BUILD_PATH/../_calliope/app/storage/* 
cp -R $BUILD_PATH/content/* $BUILD_PATH/../_calliope/app/storage

yarn --production=false     # Install
yarn start                  # start Site

