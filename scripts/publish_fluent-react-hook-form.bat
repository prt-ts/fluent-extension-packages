@echo off

REM # ./scripts/publish_fluent-react-hook-form.bat
REM # go to dist folder
call cd %~dp0\..\dist\packages\fluent-react-hook-form

REM # publish the package
call npm publish --access public
