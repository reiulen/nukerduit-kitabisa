<?php
namespace App\Repository\CurrencyRepository;

use Illuminate\Http\Request;

Interface CurrencyRepositoryInterface {
    public function Currency(Request $request);
    public function listRateCurrency(Request $request);
    public function exchangeRate($fromCurrency, $toCurrency);
}
