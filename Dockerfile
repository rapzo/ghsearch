FROM nginx:stable

COPY dist/ /srv/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
