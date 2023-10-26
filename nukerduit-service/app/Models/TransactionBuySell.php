<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionBuySell extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = ['id'];

    public function scopeFilter($query, $filters)
    {
        $query->when($filters->show_in ?? false, function ($query, $type) {
            switch ($type) {
                case 'today':
                    $query->whereDate('created_at', now());
                    break;
                case '1week':
                    $query->whereDate('created_at', '>=', now()->subWeek())
                           ->whereDate('created_at', '<=', now());
                    break;
                case '1month':
                    $query->whereDate('created_at', '>=', now()->subMonth())
                           ->whereDate('created_at', '<=', now());
                    break;
            }
        });
    }
}
