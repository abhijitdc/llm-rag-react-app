#!/bin/sh
cat /etc/nginx/conf.d/custom-nginx.template > /etc/nginx/conf.d/default.conf;
exec nginx -g "daemon off;";