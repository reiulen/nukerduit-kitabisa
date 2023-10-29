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
        Schema::create('transaction_buy_sells', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('code_currency');
            $table->decimal('rate_exchange', 32, 2);
            $table->decimal('amount', 32, 2);
            $table->decimal('total', 32, 2);
            $table->enum('type', [1, 2])->comment('1: buy, 2: sell');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_buy_sells');
    }
};
