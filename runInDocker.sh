#!/usr/bin/env bash

TASK="start"

if [ ! -z "$1" ]; then
    TASK="$1"
fi

docker run -it --rm --name ods-webclient \
-v "$(pwd)":/usr/src/ods-weblclient \
-w /usr/src/ods-webclient \
--network=host \
-p 4200:4200 \
node:10 \
npm "$TASK"
