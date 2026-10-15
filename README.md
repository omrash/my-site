# my-site

Personal site. Currently a static placeholder served by nginx.

Pushes to `main` build `ghcr.io/omrash/my-site:latest`; Watchtower on the VPS
(see `docker-compose.vps.yml`) pulls the new image.

Local preview:

    docker build -t my-site . && docker run --rm -p 3000:3000 my-site

The previous Next.js version lives at the `legacy-ralph` tag.
