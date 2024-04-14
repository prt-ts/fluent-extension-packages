@echo off

REM # Build all the package and projects
call npx nx run-many --target=build --all=true