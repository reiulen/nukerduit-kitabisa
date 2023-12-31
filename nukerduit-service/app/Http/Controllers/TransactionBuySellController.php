<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionBuySellRequest;
use App\Repository\TransactionBuySellRepository\TransactionBuySellRepository;
use Illuminate\Http\Request;

class TransactionBuySellController extends Controller
{
    private $transactionBuySellRepository;
    public function __construct(
        TransactionBuySellRepository $transactionBuySellRepository
    ) {
        $this->transactionBuySellRepository = $transactionBuySellRepository;
    }

    public function summary(Request $request)
    {
        try {
            $transactionBuySell = $this->transactionBuySellRepository->Summary($request);
            return $this->sendResponseWithDatas($transactionBuySell, "Transaction Summary Success", false, 200);
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }

    public function store(TransactionBuySellRequest $request)
    {
        try {
            $transactionBuySellRepository = $this->transactionBuySellRepository->updateOrCreate($request, null);
            $type = $request->type == 1 ? 'Buy' : 'Sell';
            return $this->sendResponse(true, "Transaction $type Success {$transactionBuySellRepository->code_currency} to IDR with amount {$transactionBuySellRepository->amount}", 200);
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }

}
