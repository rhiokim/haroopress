#!/bin/sh
SITE_NAME=$1
OUTPUT_DIR=$2
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

if [ ! -d "$SITE_NAME" ]; then
    export SITE_NAME="haroopress"
fi

curl -Lk https://github.com/rhiokim/haroopress/zipball/master -o $TEMPRORY_FILE

mkdir "$OUTPUT_DIR/$SITE_NAME"

unzip /tmp/haroopress.tar.gz -d "$OUTPUT_DIR/$SITE_NAME"
