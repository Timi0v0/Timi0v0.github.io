#!/bin/bash
set -e

echo "=== 开始配置服务器 ==="

# 更新系统
sudo apt update

# 安装 Nginx
if ! command -v nginx &> /dev/null; then
    echo "安装 Nginx..."
    sudo apt install -y nginx
else
    echo "Nginx 已安装"
fi

# 创建网站目录
sudo mkdir -p /var/www/personal-site
sudo chown -R $USER:$USER /var/www/personal-site

# 写入 Nginx 配置
sudo tee /etc/nginx/sites-available/personal-site > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    root /var/www/personal-site;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /404.html;
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/personal-site /etc/nginx/sites-enabled/

# 删除默认站点（可选）
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

# 检查配置并重启
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "=== 服务器配置完成 ==="
echo "网站目录: /var/www/personal-site"
echo "请运行以下命令上传文件:"
echo "  rsync -avz --delete out/ root@你的服务器IP:/var/www/personal-site/"
