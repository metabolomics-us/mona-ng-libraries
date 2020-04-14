#!/bin/bash
# downloads relevant ChemDoodle Web Components to avoid redistributing
# https://web.chemdoodle.com/installation/download

# ChemDoodle Web Components version
version="9.1.0"

# download and extract library
wget "https://web.chemdoodle.com/downloads/ChemDoodleWeb-${version}.zip"
unzip "ChemDoodleWeb-${version}.zip"

# keep bundled scripts and styles
mkdir -p ChemDoodle
mv "ChemDoodleWeb-${version}"/*.txt "ChemDoodleWeb-${version}"/install/* ChemDoodle

# clean up
rm "ChemDoodleWeb-${version}.zip"
rm -rf "ChemDoodleWeb-${version}"
