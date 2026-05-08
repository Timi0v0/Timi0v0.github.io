#!/bin/bash
set -e

echo "=== 开始构建 ==="
npm run build

echo "=== 压缩文件 ==="
tar -czf deploy.tar.gz -C out .

echo "=== 上传到服务器 ==="
scp deploy.tar.gz admin@47.254.24.152:/home/admin/

echo "=== 服务器部署 ==="
ssh admin@47.254.24.152 "sudo tar -xzf /home/admin/deploy.tar.gz -C /var/www/personal-site/ && sudo systemctl restart nginx"

echo "=== 清理本地临时文件 ==="
rm deploy.tar.gz

echo "=== 部署成功: http://47.254.24.152/ ==="
