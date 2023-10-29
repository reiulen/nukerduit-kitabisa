<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionBuySellRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code_currency' => 'required|string',
            'rate_exchange' => 'required|numeric',
            'amount' => 'required|numeric',
            'total' => 'required|numeric',
            'type' => 'required|numeric|in:1,2',
        ];
    }
}
