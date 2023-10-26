<?php
namespace App\Repository\TransactionBuySellRepository;

use Illuminate\Http\Request;

Interface TransactionBuySellRepositoryInterface {
    public function updateOrCreate(Request $request, $id = null);
}
