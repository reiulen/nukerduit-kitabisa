<?php
namespace App\Repository\CurrencyRepository;

use Illuminate\Http\Request;

Interface CurrencyRepositoryInterface {
    public function Currency(Request $request);
    public function bigCurrency(Request $request);
    public function exchangeRate($fromCurrency, $toCurrency);
}
