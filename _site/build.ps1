# Set Directory Location
$env:BUILD_PATH="$(Get-Location)"
Set-Location $env:BUILD_PATH;

# Source Env
. $env:BUILD_PATH/.env.ps1

# Copy Environment Variables
Copy-Item .env $env:BUILD_PATH/../_calliope/.env
Set-Location $env:BUILD_PATH/../_calliope/app

# Copy Content to Storage For Build
Remove-Item $env:BUILD_PATH/../_calliope/app/storage/* -Force -Recurse
Copy-Item $env:BUILD_PATH/content/* $env:BUILD_PATH/../_calliope/app/storage -Recurse -Force

yarn --production=false     # Install
yarn deploy                 # Build Site
yarn export                 # Export

# Move Site Export
Remove-Item $env:BUILD_PATH/output/* -Force -Recurse
Set-Location $env:BUILD_PATH/../_calliope
Copy-Item output/site/* $env:BUILD_PATH/output -Recurse

# Return to Start
Set-Location $env:BUILD_PATH;
