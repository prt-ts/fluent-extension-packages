@echo off

REM # go to dist folder
call cd %~dp0\..\dist\packages\react-control-flow

REM # publish the package
call npm publish --access public
