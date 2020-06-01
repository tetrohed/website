#!/usr/bin/env bash

babel src --out-dir ./lib/src --extensions ".ts,.tsx"
babel index.ts --out-dir ./lib --extensions ".ts,.tsx"
cp package.json ./lib