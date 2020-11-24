#!/bin/bash
cat <<EOF > /etc/nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {

	upstream cms {
		server calliope_portal:${WEBSITE_PORT};
	}

    upstream admin {
		server calliope_portal:${ADMIN_PORT};
	}

	server {

        listen 80;

        server_name localhost, calliope.kderbyma.com;

        location / {
            proxy_pass http://cms/;
        }

        location /admin {
            proxy_pass http://admin/;
        }

    }

}
EOF