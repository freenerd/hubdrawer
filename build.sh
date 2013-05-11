#!/bin/bash
# Script to bundle the chrome extension for chrome store upload

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )"

pushd "$BASE_DIR"
	rm bundle.zip
	zip -r bundle background.js contentscript.js Assets/icon-128.png Assets/icon-48.png manifest.json 3rdParty/jQuery/jquery.min.js
popd
