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
        return $data->values();
    }

    public function listRateCurrency(Request $request)
    {
        $detailCurrency = $this->detailCurrency('idr');
        if($detailCurrency->isEmpty())
            return collect();
        $currencyIdr = $detailCurrency['idr'];

        //4 list currency
        if($request->list4Currency)
            $currencyIdr = collect($currencyIdr)->only($this->list4Currency);

        $converCurrencyIdr = collect();
        foreach($currencyIdr as $key => $value){
            $converCurrencyIdr[] = [
                'currency' => $key,
                'rate' => round(1 / $value, 2)
            ];
        }

        //sort by
        if($request->sort_type && $request->sort_by) {
            if($request->sort_type == 'asc')
                $converCurrencyIdr = $converCurrencyIdr->sortBy($request->sort_by);
            else if($request->sort_type == 'desc')
                $converCurrencyIdr = $converCurrencyIdr->sortByDesc($request->sort_by);
        }

        if($request->take)
            $converCurrencyIdr = $converCurrencyIdr->take($request->take);

        return $converCurrencyIdr->values();
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
