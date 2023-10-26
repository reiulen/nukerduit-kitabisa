<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionBuySellRequest;
use App\Repository\TransactionBuySellRepository\TransactionBuySellRepository;

class TransactionBuySellController extends Controller
{
    private $transactionBuySellRepository;
    public function __construct(
        TransactionBuySellRepository $transactionBuySellRepository
    ) {
        $this->transactionBuySellRepository = $transactionBuySellRepository;
    }

    public function store(TransactionBuySellRequest $request)
    {
        try {
            $this->transactionBuySellRepository->updateOrCreate($request, null);
            $type = $request->type == 1 ? 'Buy' : 'Sell';
            return $this->sendResponse(true, "Transaction $type Success", 200);
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }
}
