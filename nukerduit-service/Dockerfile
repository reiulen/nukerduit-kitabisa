FROM php:8.1-fpm

WORKDIR /app/nukerduit-service

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd

RUN curl -sS https://getcomposer.org/installer | php -- --version=2.4.3 --install-dir=/usr/local/bin --filename=composer

COPY . .
# RUN composer update --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist
# RUN composer dump-autoload
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
