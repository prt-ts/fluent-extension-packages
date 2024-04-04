@echo off

REM # Build the debounce library
call npx nx run debounce:build

REM # Build the types library
call npx nx run types:build

REM # Build the export-helper library
call npx nx run export-helpers:build

REM # Build the fluent-common-features library
call npx nx run fluent-common-features:build

REM # Build the fluent-formik library
call npx nx run fluent-formik:build

REM # Build the fluent-input-extensions library
call npx nx run fluent-input-extensions:build

REM # Build the fluent-react-hook-form library
call npx nx run fluent-react-hook-form:build

REM # Build the fluent-react-table-v2 library
call npx nx run fluent-react-table-v2:build

REM # Build the fluent-theme library
call npx nx run fluent-theme:build

REM # Build the pdf-json-helper library
call npx nx run pdf-json-helper:build

REM # Build the react-control-flow library
call npx nx run react-control-flow:build

REM # Build the spfx-core library
call npx nx run spfx-core:build




