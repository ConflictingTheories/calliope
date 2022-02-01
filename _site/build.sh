# Set Directory Location
declare -x BUILD_PATH=$(pwd)
cd $BUILD_PATH;

# Source Env
. $BUILD_PATH/env

# Copy Environment Variables
cp env $BUILD_PATH/../_calliope/.env
cd $BUILD_PATH/../_calliope/app

# Copy Content to Storage For Build
rm -rf $BUILD_PATH/../_calliope/app/storage/* 
cp -R $BUILD_PATH/content/* $BUILD_PATH/../_calliope/app/storage

yarn --production=false     # Install
yarn deploy                 # Build Site
yarn export                 # Export

# Move Site Export
mkdir -p $BUILD_PATH/output
rm -rf $BUILD_PATH/output/*
cd $BUILD_PATH/../_calliope
cp -R output/site/* $BUILD_PATH/output
cp $BUILD_PATH/favicon.ico $BUILD_PATH/output
echo "/*    /index.html   200" > $BUILD_PATH/output/_redirects
# Return to Start
cd $BUILD_PATH;
