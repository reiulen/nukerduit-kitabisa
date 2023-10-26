<?php

namespace App\Repository\TransactionBuyRepository;

use Illuminate\Support\Str;
use App\Models\TransactionBuy;
use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionBuyRequest;
use App\Repository\TransactionBuyRepository\TransactionBuyRepositoryInterface;
use Illuminate\Http\Request;

class TransactionBuyRepository implements TransactionBuyRepositoryInterface
{
    protected $controller;
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    public function updateOrCreate(Request $request, $id = null)
    {
        $transactionBuy = $this->controller->atomic(function () use ($request, $id) {
            $transactionBuy = TransactionBuy::updateOrCreate([
                'id' => $id  ?? Str::uuid(),
            ], [
                'code_currency' => $request->code_currency,
                'rate_exchange' => $request->rate_exchange,
                'amount' => $request->amount,
                'total' => $request->total,
                'status' => $request->status
            ]);
            return $transactionBuy;
        });

        return $transactionBuy;
    }
}
