# backend

---

## Hints

Session:

- If req came without cookie - req.session gets fresh .id
- If req came with cookie, but no ID found in storage - req.session gets fresh .id (before first controller)
- If req came with cookie and ID found in storage - req.session populated with data from storage

Cookie and ID example:

- Cookie: s%3A**OLlpedfafn96MNR2mH_2OmVvKRWYwK2q**.G0jIieIbAlOW8ktoqObkQAn7snUoW54LtfhYUS5JfVg
- req.session.id: **OLlpedfafn96MNR2mH_2OmVvKRWYwK2q**

## Usage <a name = "usage"></a>


For local dev:
```
docker run --detach --rm -v "api-assignment-backend-assets-volume:/assets_to" -v "/$(pwd)/assets:/assets_from" busybox sh -c "cp -rf /assets_from/* /assets_to"

CORS_URL='https://localhost' \
API_VERSION='v1' \
COOKIE_SECRET='12345' \
CACHE_PASSWORD='redis' \
VIRTUAL_HOST='localhost' \
LETSENCRYPT_HOST='localhost' \
docker-compose -f ./docker-compose.dev.yaml up --build --always-recreate-deps --force-recreate

// docker-compose build --no-cache
// ARG CACHEBUST=1
```