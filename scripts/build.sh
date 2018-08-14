#!/usr/bin/env bash
NODE_ENV=production
BUILD_FILE_NAME="builds/react_redux_chrome_extension_$(date +%Y%m%d_%H%M%S).zip"
echo "🏗 Starting build process..."
(webpack --mode production && mkdir -p builds && zip -r -X ${BUILD_FILE_NAME} build && rm -rf build) >/dev/null
echo "✅  Build completed and stored in file: ${BUILD_FILE_NAME}"
