<?php

namespace App\Http\Controllers;

use DB;
use Closure;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function atomic(Closure $callback)
    {
        return DB::transaction($callback);
    }

    public function sendResponse($status = true, $message, $code = 200)
    {
        $response = [
            'status' => $status,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }

    public function sendResponseWithDatas($datas, $message, $wrapper = false, $code = 200)
    {
        $response = [
            'status' => true,
            'message' => $message,
            'data' => $wrapper ? $this->dataWrapper($datas) : $datas,
        ];

        return response()->json($response, $code);
    }

    protected function dataWrapper($data)
    {
        $results = [];
        if (isset($data['data'])) {
            $results['data'] = $data['data'];

            unset($data['data']);

            $results['meta'] = $data;
        } else
            $results['data'] = $data;

        return $results;
    }
}
