#!/bin/sh
OUTPUT_DIR=$1
TEMPRORY_FILE=/tmp/haroopress.tar.gz

# node install nvm

# git

# haroopress
echo "========================="
echo "= haroopress installing =\n"
echo "========================="

if [ ! -d "$OUTPUT_DIR" ]; then
    export OUTPUT_DIR=$(pwd)
fi

curl -Lk https://github.com/rhiokim/haroopress/zipball/master -o $TEMPRORY_FILE

mkdir -p $OUTPUT_DIR

unzip /tmp/haroopress.tar.gz -d "$OUTPUT_DIR"
