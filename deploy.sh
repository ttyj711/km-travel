#!/bin/bash

# KM Travel 部署脚本

set -e

echo "🚀 开始部署 KM Travel 应用..."

# 1. 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 2. 检查环境变量文件
if [ ! -f .env.local ]; then
    echo "⚠️  警告: 未找到 .env.local 文件，将使用 .env.example 中的默认值"
    if [ -f .env.example ]; then
        cp .env.example .env.local
    fi
fi

# 3. 拉取最新代码（可选）
# git pull origin main

# 4. 构建并启动容器
echo "📦 构建 Docker 镜像..."
docker-compose build --no-cache

echo "🟢 启动容器..."
docker-compose up -d

# 5. 等待服务启动
sleep 3

# 6. 检查健康状态
echo "🏥 检查服务健康状态..."
if curl -s http://localhost:8080/health | grep -q "healthy"; then
    echo "✅ 服务部署成功！"
    echo ""
    echo "📱 访问地址:"
    echo "   - 本地: http://localhost:8080"
else
    echo "⚠️  服务可能未完全启动，请稍后再检查"
    echo "   查看日志: docker-compose logs -f"
fi

echo ""
echo "📋 常用命令:"
echo "   查看日志: docker-compose logs -f"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"
echo "   更新部署: ./deploy.sh"
