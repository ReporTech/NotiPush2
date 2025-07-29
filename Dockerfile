# Usa una imagen base de PHP (ajusta la versión según tu necesidad, ej. php:8.2-apache)
FROM php:8.2-apache

# Instala las dependencias necesarias para pdo_pgsql
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-enable pdo_pgsql

# Copia tu código de la aplicación
COPY . /var/www/html/

# Configura el DocumentRoot si es necesario
# ENV APACHE_DOCUMENT_ROOT /var/www/html/public
# RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
# RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Expone el puerto (generalmente 80 para Apache)
EXPOSE 80
