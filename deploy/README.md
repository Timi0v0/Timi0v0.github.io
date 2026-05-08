# 阿里云服务器部署指南（静态文件方式）

## 前提条件

- 阿里云轻量服务器（Ubuntu/Debian）
- 服务器已开放 80 端口（安全组配置）
- 本地已配置 SSH 密钥或知道 root 密码

## 步骤 1：服务器环境配置

SSH 登录服务器后，执行：

```bash
curl -fsSL https://raw.githubusercontent.com/Timi0v0/Timi0v0.github.io/main/deploy/setup-server.sh | bash
```

或者手动复制 `deploy/setup-server.sh` 到服务器执行：

```bash
chmod +x setup-server.sh
./setup-server.sh
```

这会自动安装 Nginx 并配置好站点。

## 步骤 2：上传网站文件

在**本地项目根目录**执行：

```bash
npm run build
```

然后上传 `out/` 目录到服务器：

```bash
# 用 rsync（推荐，支持增量同步和删除旧文件）
rsync -avz --delete out/ root@你的服务器IP:/var/www/personal-site/

# 或者用 scp
scp -r out/* root@你的服务器IP:/var/www/personal-site/
```

## 步骤 3：访问网站

浏览器打开 `http://你的服务器IP` 即可看到网站。

## 后续更新

每次内容更新后，只需重复步骤 2：

```bash
npm run build
rsync -avz --delete out/ root@你的服务器IP:/var/www/personal-site/
```

## 可选：配置 HTTPS

如果有域名，可以用 Certbot 免费申请 SSL 证书：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `setup-server.sh` | 服务器端一键配置脚本 |
| `nginx.conf` | Nginx 站点配置文件参考 |
