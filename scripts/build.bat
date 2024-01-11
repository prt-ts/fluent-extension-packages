@echo off

REM # Build the debounce library
call npx nx run debounce:build --compiler=tsc

REM # Build the export-helper library
call npx nx run export-helpers:build --compiler=tsc

REM # Build the fluent-common-features library
call npx nx run fluent-common-features:build --compiler=tsc

REM # Build the fluent-formik library
call npx nx run fluent-formik:build --compiler=tsc

REM # Build the fluent-react-hook-form library
call npx nx run fluent-react-hook-form:build --compiler=tsc

REM # Build the fluent-react-table-v2 library
call npx nx run fluent-react-table-v2:build --compiler=tsc

REM # Build the fluent-theme library
call npx nx run fluent-theme:build --compiler=tsc

REM # Build the pdf-json-helper library
call npx nx run pdf-json-helper:build --compiler=tsc

REM # Build the react-control-flow library
call npx nx run react-control-flow:build --compiler=tsc



