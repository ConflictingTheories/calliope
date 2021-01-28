#!/bin/bash
# /*                                            *\
# ** ------------------------------------------ **
# **         Calliope - Site Generator   	      **
# ** ------------------------------------------ **
# **           Copyright (c) 2017-2020          **
# **             Kyle Derby MacInnis            **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

# Read .ENV Variables
declare -x BUILD_PATH=$(pwd)

cd $BUILD_PATH

source $BUILD_PATH/.env

cd $BUILD_PATH/server

yarn migrate $1
