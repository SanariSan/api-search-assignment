#!/bin/bash

PROJECT_NAME=api-assignment;

cp ./prod.env ./.env;

docker-compose -f ./docker-compose.yaml -p $PROJECT_NAME --compatibility down;

### assets transfer
docker run --detach --rm \
-v "${PROJECT_NAME}-backend-assets-volume:/old-assets" \
busybox sh -c "rm -rf /old-assets/*";

docker run --detach --rm \
-v "$(pwd)/assets:/assets-from-local-folder" \
-v "${PROJECT_NAME}-backend-assets-staging-volume:/to-inside-volume" \
busybox sh -c "cp -rf /assets-from-local-folder/* /to-inside-volume";

docker run --detach --rm \
-v "${PROJECT_NAME}-backend-assets-staging-volume:/from-inside-staging-volume" \
-v "${PROJECT_NAME}-backend-assets-volume:/to-inside-prod-volume" \
busybox sh -c "cp -rf /from-inside-staging-volume/* /to-inside-prod-volume";

# chmod not working (?), but no negitive effect happens
# ls output from nginx folder is | -rwxr-xr-x 1 nginx nginx
docker run --detach --rm \
-v "${PROJECT_NAME}-backend-assets-volume:/current-assets" \
busybox sh -c "chown -R 101:101 /current-assets && chmod -R u=rwx,g=rx,o=rx /current-assets";
### assets transfer

docker run --detach --rm \
-v "vhost:/vhost-mounted" \
busybox sh -c "{ echo 'client_max_body_size 25m;'; } > /vhost-mounted/${VIRTUAL_HOST}";

docker-compose -f ./docker-compose.yaml -p $PROJECT_NAME build;

docker-compose -f ./docker-compose.yaml -p $PROJECT_NAME --compatibility up \
--detach --always-recreate-deps --force-recreate --remove-orphans;

exit;