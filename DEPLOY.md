# Personal Website CI/CD Setup

This repository uses GitHub Actions for building and pushing Docker images to GitHub Container Registry, with an auto-pulling service on your VPS.

## Architecture

**GitHub Actions Workflow**
- Builds Docker image from Dockerfile
- Pushes to `ghcr.io/omrash/my-site:latest`
- No SSH or deployment steps (cleaner, faster)

**VPS Auto-Pulling**
- `watchtower` service monitors ghcr.io for new images
- Auto-pulls and upgrades your app when new images appear
- Runs via docker-compose on VPS

## Setup Instructions

### 1. GitHub Secrets (One-time)

In your GitHub repository, go to Settings → Secrets and variables → Actions and add these secrets:

- `GITHUB_TOKEN`: Automatically provided by GitHub Actions
- No VPS secrets needed (removed for cleaner architecture)

### 2. VPS Setup (One-time)

SSH into your VPS and run these commands:

```bash
# Create directory
sudo mkdir -p /var/www/my-site
sudo chown -R omar:www-data /var/www/my-site
sudo chmod -R 755 /var/www/my-site

# Create docker-compose configuration
cd /var/www/my-site
nano docker-compose.vps.yml

# Paste the content from your repository's docker-compose.vps.yml file

# Start watchtower and your app
docker-compose -f docker-compose.vps.yml pull
docker-compose -f docker-compose.vps.yml up -d
```

### 3. Verify Deployment

Check if your app is running:

```bash
ssh your-vps-hostname
docker ps
curl http://localhost:3000
```

## Workflow

Every push to `main` triggers:
1. GitHub Actions builds Docker image
2. Pushes to GitHub Container Registry
3. Watchtower on VPS detects new image
4. Auto-pulls and upgrades your app

## Manual Updates

If you need to manually pull updates on VPS:

```bash
ssh your-vps-hostname
cd /var/www/my-site
docker-compose -f docker-compose.vps.yml pull
docker-compose -f docker-compose.vps.yml up -d
```

## Benefits

- **No SSH keys** in GitHub Actions
- **Faster deployments** (no SSH timeout)
- **Automatic updates** (watchtower auto-detects)
- **Clean architecture** (single source of truth)

## Trade-offs

- First deployment requires manual SSH access
- No manual deployment triggers from GitHub
- Relies on container label detection for auto-updates

## Monitoring

Check watchtower logs:

```bash
ssh your-vps-hostname
docker logs -f (docker ps -q --filter label=enabled=true)
```

Check app logs:

```bash
docker logs -f (docker ps -q --filter name=my-site)
```