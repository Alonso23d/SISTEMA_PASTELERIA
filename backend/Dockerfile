# Usamos una imagen oficial de PHP con Apache preconfigurado
FROM php:8.2-apache

# Instalamos las dependencias del sistema y extensiones de PHP necesarias para Laravel y MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# Apuntamos el servidor Apache a la carpeta /public de Laravel (Requisito de seguridad de Laravel)
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /var/www/html

# Copiamos los archivos del backend al contenedor
COPY . .

# Instalamos Composer (Manejador de dependencias de PHP) de forma empaquetada
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Otorgamos permisos correctos a las carpetas de almacenamiento de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80