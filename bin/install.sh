#!/bin/sh
OUTPUT_DIR=$(pwd)
SITE_DIR=$1
TEMPRORY_FILE=/tmp/haroopress.tar.gz

# node install nvm

# git

# haroopress
echo "========================="
echo "= haroopress installing =\n"
echo "========================="

if [ ! -d "$SITE_DIR" ]; then
    export SITE_DIR='haroopress'
fi

curl -Lk https://github.com/rhiokim/haroopress/zipball/master -o $TEMPRORY_FILE

unzip /tmp/haroopress.tar.gz -d "$OUTPUT_DIR"
mv ./rhiokim-haroopress* $SITE_DIR
