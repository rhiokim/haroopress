#!/bin/sh
OUTPUT_DIR=$(pwd)
SITE_DIR=$1
TEMPRORY_FILE=/tmp/haroopress.tar.gz

# node install nvm

# git

# haroopress
echo "========================="
echo "= haroopress installing ="
echo "========================="

if [ ! -d "$SITE_DIR" ]; then
    export SITE_DIR='haroopress'
fi

if [ "$prefix" ]; then
    export SITE_DIR=$prefix
fi

git clone git@github.com:rhiokim/haroopress.git $SITE_DIR

# auto install
if [ "$auto" = "yes" ]; then
    cd $SITE_DIR
    make init
fi
