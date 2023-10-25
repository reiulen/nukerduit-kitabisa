FROM php:8.1-fpm

WORKDIR /app/nukerduit-service

RUN apt-get update && apt-get install -y wget git unzip \
    && pecl install xdebug-3.1.5 \
    && docker-php-ext-enable  xdebug\
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
        && echo "xdebug.remote_host = host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN curl -sS https://getcomposer.org/installer | php -- --version=2.4.3 --install-dir=/usr/local/bin --filename=composer

COPY . .
RUN composer update --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist
RUN composer dump-autoload
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
