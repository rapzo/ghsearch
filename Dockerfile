FROM nginx:stable

COPY dist/ghsearch /srv/ghsearch
COPY nginx.conf /etc/nginx/conf.d/default.conf

