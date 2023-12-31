<?php

namespace App\Repository\TransactionBuySellRepository;

use Illuminate\Support\Str;
use App\Models\TransactionBuySell;
use App\Http\Controllers\Controller;
use App\Repository\TransactionBuySellRepository\TransactionBuySellRepositoryInterface;
use Illuminate\Http\Request;

class TransactionBuySellRepository implements TransactionBuySellRepositoryInterface
{
    protected $controller;
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    public function Summary(Request $request)
    {
        $transactionBuySell = TransactionBuySell::filter($request)
                                                ->get()
                                                ->groupBy('code_currency');
        $transactionBuySell = $transactionBuySell->map(function ($item, $key) {
            $total_buy = $item->where('type', 1)->sum('total');
            $total_sell = $item->where('type', 2)->sum('total');
            $amount = $total_buy - $total_sell;
            return [
                'currency' => $key,
                'total_buy' => $total_buy,
                'total_sell' => $total_sell,
                'total' => $amount
            ];
        })->values();
        return $transactionBuySell;
    }

    public function updateOrCreate(Request $request, $id = null)
    {
        $transactionBuy = $this->controller->atomic(function () use ($request, $id) {
            $transactionBuy = TransactionBuySell::updateOrCreate([
                'id' => $id  ?? Str::uuid(),
            ], [
                'code_currency' => $request->code_currency,
                'rate_exchange' => $request->rate_exchange,
                'amount' => $request->amount,
                'total' => $request->total,
                'type' => $request->type // 1 Buy or 2 Sell
            ]);
            return $transactionBuy;
        });

        return $transactionBuy;
    }
}
