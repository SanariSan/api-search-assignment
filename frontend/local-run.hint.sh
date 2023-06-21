#!/bin/bash

### not maintened for this project

PROJECT_NAME=api-assignment;

docker run --rm \
-v "${PROJECT_NAME}-front-build-volume:/old-build" \
busybox sh -c "rm -rf /old-build/*";

docker build \
--build-arg "REACT_APP_API_URL=http://localhost" \
--build-arg "REACT_APP_API_VERSION=v1" \
-t "${PROJECT_NAME}-front-build-img" \
-f ./docker/build.Dockerfile .;

docker run -it --rm \
--name "${PROJECT_NAME}-front-build-container" \
-v "${PROJECT_NAME}-front-build-volume:/home/node/proj/build" \
"${PROJECT_NAME}-front-build-img";

exit;