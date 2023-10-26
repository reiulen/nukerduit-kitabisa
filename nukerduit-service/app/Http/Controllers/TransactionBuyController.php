<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionBuyRequest;
use App\Models\TransactionBuy;
use App\Repository\TransactionBuyRepository\TransactionBuyRepository;
use Illuminate\Http\Request;

class TransactionBuyController extends Controller
{
    private $transactionBuyRepository;
    public function __construct(
        TransactionBuyRepository $transactionBuyRepository
    ) {
        $this->transactionBuyRepository = $transactionBuyRepository;
    }

    public function store(TransactionBuyRequest $request)
    {
        try {
            $this->transactionBuyRepository->updateOrCreate($request, null);
            return $this->sendResponse(true, 'Transaction Buy Success', 200);
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }

    public function update(Request $request, TransactionBuy $transactionBuy)
    {
        try {
            if(!$transactionBuy)
                return $this->sendResponse(false, 'Transaction Buy Not Found', 404);

            $this->transactionBuyRepository->updateOrCreate($request, $transactionBuy->id);
            return $this->sendResponse(true, 'Transaction Buy Success', 200);
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }
}
