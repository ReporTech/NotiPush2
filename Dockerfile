# Dockerfile
FROM php:8.2-apache 

WORKDIR /var/www/html

# Copia TODOS tus archivos de proyecto desde la raíz de tu repositorio
COPY . .

# Exponer el puerto
EXPOSE 80
