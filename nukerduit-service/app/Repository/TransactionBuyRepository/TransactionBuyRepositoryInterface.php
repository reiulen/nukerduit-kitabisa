<?php
namespace App\Repository\TransactionBuyRepository;

use Illuminate\Http\Request;

Interface TransactionBuyRepositoryInterface {
    public function updateOrCreate(Request $request, $id = null);
}
