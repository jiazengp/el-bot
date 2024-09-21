# Napcat

## Start

```bash
# curl -o napcat.sh https://nclatest.znin.net/NapNeko/NapCat-Installer/main/script/install.sh && sudo bash napcat.sh

sudo docker run -d -e ACCOUNT=996955042 -e WS_ENABLE=true -e NAPCAT_GID=0 -e NAPCAT_UID=0 -p 3001:3001 -p 6099:6099 --name napcat --restart=always docker.1panel.dev/mlikiowa/napcat-docker:latest
```

## 升级 Docker

```bash
# see https://github.com/NapNeko/NapCat-Docker
docker pull docker.1panel.dev/mlikiowa/napcat-docker:latest
```
