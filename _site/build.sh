#!/bin/bash
# Set Directory Location
declare -x BUILD_PATH=$(pwd)
cd $BUILD_PATH;

# Source Env
source $BUILD_PATH/.env

# Copy Environment Variables
cp .env $BUILD_PATH/../_calliope/.env
cd $BUILD_PATH/../_calliope/app

# Copy Content to Storage For Build
rm -rf $BUILD_PATH/../_calliope/app/storage/*
cp $BUILD_PATH/content/* $BUILD_PATH/../_calliope/app/storage -r

#yarn --production=false    # Install (W/ Dev Dependencies)
yarn                        # Install
yarn deploy                 # Build Site
yarn export                 # Export

# Move Site Export
rm -rf $BUILD_PATH/output/*
cd $BUILD_PATH/../_calliope
cp output/site/* $BUILD_PATH/output -r

# Return to Start
cd $BUILD_PATH;
