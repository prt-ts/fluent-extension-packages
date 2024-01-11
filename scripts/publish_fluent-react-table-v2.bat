@echo off

REM # go to dist folder
call cd %~dp0\..\dist\packages\fluent-react-table-v2

REM # publish the package
call npm publish --access public
