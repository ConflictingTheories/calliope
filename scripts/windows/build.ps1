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
$env:BUILD_PATH="$(Get-Location)"
Set-Location $env:BUILD_PATH;

foreach( $line in $(Get-Content ".env.ps1")){$line}

# Deploy
docker-compose build

Set-Location $env:BUILD_PATH;
