#!/bin/bash

EXECUTION_POLICY=$(powershell Get-ExecutionPolicy -Scope CurrentUser)

if [ $EXECUTION_POLICY != "RemoteSigned" ]; then
  powershell Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
fi
