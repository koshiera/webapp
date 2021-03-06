#!/bin/bash
printenv
BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
NUMBER=$(git log $BRANCH --pretty=oneline | wc -l)
DATE=$(date +%Y%m%d)
TAG=$(git describe --tags `git rev-list --tags --max-count=1`)
HASH=$(git rev-parse --short HEAD)
echo "name $TAG-$BRANCH-$HASH-$DATE-$NUMBER"
echo "export const APP_VERSION = '$TAG-$BRANCH-$HASH-$DATE-$NUMBER'" > src/_utils/version.js
echo "Removing debug logs..."
# find ./src -type f | xargs sed -i -E 's/^\s*console.(log|debug|info|)\((.*)\);?//gm'
echo "Building app..."
# npm run-script build-beta
echo "Done."