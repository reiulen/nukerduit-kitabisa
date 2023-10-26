<?php

namespace App\Http\Controllers;

use App\Repository\CurrencyRepository\CurrencyRepository;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    private $currencyRepository;
    public function __construct(
        CurrencyRepository $currencyRepository
    )
    {
        $this->currencyRepository = $currencyRepository;
    }

    public function index(Request $request)
    {
        try {
            $currency = $this->currencyRepository->Currency($request);
            return $this->sendResponseWithDatas($currency, 'Success get currency', false, 200);
        }catch (\Exception $e){
            return $this->sendResponse(false, $e->getMessage(), 500);
        }
    }

    public function bigCurrency(Request $request)
    {
        try {
            $currency = $this->currencyRepository->bigCurrency($request);
            return $this->sendResponseWithDatas($currency, 'Success get big currency', false, 200);
        }catch (\Exception $e){
            return $this->sendResponse(false, $e->getMessage(), 500);
        }
    }

    public function exchangeRate($currency)
    {
        try {
            $currency = $this->currencyRepository->exchangeRate($currency, 'idr');
            if($currency->isEmpty())
                return $this->sendResponse(false, 'Currency not found', 404);
            return $this->sendResponseWithDatas($currency, 'Success get exchange currency', false, 200);
        }catch (\Exception $e){
            return $this->sendResponse(false, $e->getMessage(), 500);
        }
    }
}
