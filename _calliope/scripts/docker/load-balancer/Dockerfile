# /*                                            *\
# ** ------------------------------------------ **
# **         Calliope - Site Generator   	    **
# ** ------------------------------------------ **
# **  Copyright (c) 2020 - Kyle Derby MacInnis  **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

FROM nginx:alpine
# Add Setup Configuration for nginx
RUN mkdir /opt/archi-lb
WORKDIR /opt/archi-lb
ADD ./scripts/nginx-setup.sh .
RUN sh /opt/archi-lb/nginx-setup.sh
# Expose Ports
EXPOSE 80 443
# RUN
# CMD nginx
CMD tail -f /var/log/nginx/access.log

# Install SSL (Cert - Only do this Once - to Avoid Issues Mount Directory)
# # Install LetsEncrypt (SSL)
# RUN apk add python3 python3-dev build-base libressl-dev musl-dev libffi-dev
# RUN pip3 install pip --upgrade
# RUN pip3 install certbot-nginx
# RUN mkdir /etc/letsencrypt
# ADD ./certs /etc/letsencrypt
# # Renewal
# RUN mkdir /etc/cron.d/ -p
# RUN echo "0 12 * * * /usr/bin/certbot renew --quiet" > /etc/cron.d/renew.cron
# # Run & Generate SSL
# CMD certbot --nginx \
#   --non-interactive \
#   --agree-tos \
#   --email kyle@kderbyma.com \
#   --domains arch.kderbyma.com \
#   --domains calliope.kderbyma.com \
#   ; tail -f /var/log/nginx/access.log
