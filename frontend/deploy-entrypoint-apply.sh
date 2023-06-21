#!/bin/bash

PROJECT_NAME=api-assignment;

### build transfer
docker run --detach --rm \
-v "${PROJECT_NAME}-front-build-volume:/old-build" \
busybox sh -c "rm -rf /old-build/*";

docker run --detach --rm \
-v "$(pwd)/build-volume:/from-local-folder" \
-v "${PROJECT_NAME}-front-build-staging-volume:/to-inside-volume" \
busybox sh -c "cp -rf /from-local-folder/* /to-inside-volume";

docker run --detach --rm \
-v "${PROJECT_NAME}-front-build-staging-volume:/from-inside-staging-volume" \
-v "${PROJECT_NAME}-front-build-volume:/to-inside-prod-volume" \
busybox sh -c "cp -rf /from-inside-staging-volume/* /to-inside-prod-volume";

# chmod not working (?), but no negitive effect happens
# ls output from nginx folder is | -rwxr-xr-x 1 nginx nginx
docker run --detach --rm \
-v "${PROJECT_NAME}-front-build-volume:/current-build" \
busybox sh -c "chown -R 101:101 /current-build && chmod -R u=rwx,g=rx,o=rx /current-build";
### build transfer

exit;