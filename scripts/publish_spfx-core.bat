@echo off

REM # go to dist folder
call cd %~dp0\..\dist\packages\spfx-core

REM # publish the package
call npm publish --access public
