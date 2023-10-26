<?php

namespace App\Repository\CurrencyRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CurrencyRepository implements CurrencyRepositoryInterface
{

    protected $apiUrl;
    public function __construct()
    {
        $this->apiUrl = env('API_CURRENCY');
    }

    public function Currency(Request $request)
    {
        $response = Http::get("{$this->apiUrl}/currencies.min.json");
        $data = collect();
        if ($response->successful())
            $data = collect($response->json());
        return $data;
    }

    public function bigCurrency(Request $request)
    {
        $detailCurrency = $this->detailCurrency('idr');
        if($detailCurrency->isEmpty())
            return collect();
        $currencyIdr = $detailCurrency['idr'];
        if($request->list4Currency)
            $currencyIdr = collect($currencyIdr)->only($this->list4Currency);
        $converCurrencyIdr = collect();
        foreach($currencyIdr as $key => $value){
            $converCurrencyIdr[$key] = round(1 / $value, 2);
        }

        $sortBigCurrency = $converCurrencyIdr->sortByDesc(function ($value, $key) {
            return $value;
        });
        if($request->take)
            $sortBigCurrency = $sortBigCurrency->take($request->take);
        return $sortBigCurrency;
    }

    private function detailCurrency($currency)
    {
        $response = Http::get("{$this->apiUrl}/currencies/{$currency}.min.json");
        $data = collect();
        if ($response->successful())
            $data = collect($response->json());
        return $data;
    }

    public function exchangeRate($fromCurrency, $toCurrency)
    {
        $response = Http::get("{$this->apiUrl}/currencies/{$fromCurrency}/{$toCurrency}.min.json");
        $data = collect();
        if ($response->successful())
            $data = collect($response->json());
        return $data;
    }

    private $list4Currency = [
        'jpy',
        'usd',
        'eur',
        'sgd'
    ];
}
