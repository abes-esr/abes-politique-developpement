#!/bin/bash

# initialize default values for parameters
export POLINFO_BASEURL=${POLINFO_BASEURL:='https://politique-informatique.abes.fr'}

# patch sitemap because it needs to have the absolute url
if [ ! -f /usr/share/nginx/html/sitemap.xml.orig ]; then
  cp -f /usr/share/nginx/html/sitemap.xml /usr/share/nginx/html/sitemap.xml.orig
fi
sed "s#https://politique_developpement_abes_baseurl_placeholder#${POLINFO_BASEURL}#g" \
  /usr/share/nginx/html/sitemap.xml.orig \
  > /usr/share/nginx/html/sitemap.xml

# Pass control to the main process
exec "$@"