# GCE O-Level English Visual Text Website

## Deployment

**Development:**
```bash
docker-compose build
docker-compose up
```

**Production:**
```bash
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```