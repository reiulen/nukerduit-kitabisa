<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auth_histories', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('user_id');
            $table->string('ip_address');
            $table->string('user_agent');
            $table->longText('payload_user');
            $table->enum('type', ['login', 'logout']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auth_histories');
    }
};
