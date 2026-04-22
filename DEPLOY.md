# Docker 部署指南

## 快速开始

### 1. 准备环境

确保服务器已安装：
- Docker
- Docker Compose

```bash
# 安装 Docker（Ubuntu/Debian）
curl -fsSL https://get.docker.com | sh

# 安装 Docker Compose
sudo apt-get install docker-compose-plugin
```

### 2. 配置环境变量

```bash
# 复制示例文件
cp .env.example .env.local

# 编辑 .env.local，填入你的高德地图 Key
vim .env.local
```

### 3. 部署

#### 方式一：使用部署脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

#### 方式二：手动部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 4. 访问

- **本地访问**: http://localhost:8080
- **服务器访问**: http://<服务器IP>:8080

---

## 详细配置

### 端口映射

默认映射 `8080:80`，可在 `docker-compose.yml` 中修改：

```yaml
ports:
  - "80:80"      # 使用标准 HTTP 端口
  - "8080:80"    # 使用 8080 端口
```

### 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `VITE_AMAP_KEY` | 高德地图 API Key | 是 |
| `VITE_AMAP_WEB_KEY` | 高德地图 Web Key（同 VITE_AMAP_KEY）| 可选 |

**注意**: Vue 应用是静态构建的，环境变量需要在**构建时**注入，而不是运行时。

### HTTPS 配置（推荐）

取消 `docker-compose.yml` 中的 Caddy 部分注释，并创建 `Caddyfile`：

```caddyfile
your-domain.com {
    reverse_proxy km-travel:80
}
```

---

## 常用命令

```bash
# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 重建（更新代码后）
docker-compose up -d --build

# 进入容器
docker-compose exec km-travel sh
```

---

## 生产环境优化

### 1. 使用 CDN 加速

修改 `vite.config.js` 添加 CDN：

```javascript
export default defineConfig({
  base: 'https://your-cdn.com/km-travel/',
  // ...
})
```

### 2. 启用 Gzip

已在 `nginx.conf` 中启用，无需额外配置。

### 3. 配置反向代理

使用 Nginx/Caddy 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 故障排查

### 容器无法启动

```bash
# 查看详细日志
docker-compose logs

# 检查端口占用
netstat -tlnp | grep 8080
```

### 地图不显示

1. 检查 `.env.local` 中是否配置了正确的 `VITE_AMAP_KEY`
2. 确认高德地图 Key 的域名白名单包含你的服务器域名
3. 重新构建容器：`docker-compose up -d --build`

### 静态资源 404

确保 `nginx.conf` 中的 `try_files` 配置正确：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 文件说明

| 文件 | 说明 |
|------|------|
| `Dockerfile` | Docker 镜像构建配置 |
| `docker-compose.yml` | 容器编排配置 |
| `nginx.conf` | Nginx 服务器配置 |
| `.dockerignore` | Docker 构建忽略文件 |
| `deploy.sh` | 一键部署脚本 |
| `.env.local` | 环境变量（不提交到 Git）|
| `.env.example` | 环境变量示例 |
