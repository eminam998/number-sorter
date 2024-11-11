<?php

namespace App\Http\Controllers;

use App\Http\Requests\NumberRequest;
use App\Models\Number;
use Carbon\Carbon;

class NumbersController extends Controller
{
    public function index()
    {
        return view('numbers.index');
    }

    public function sortNumbers(NumberRequest $request)
    {
        $data = $request->validated()['numbers'];

        $sortedNumbers = $this->quickSort($data);

        foreach ($sortedNumbers as $number) {
            Number::create(['value' => $number]);
        }

        return response()->json(['sortedNumbers' => $sortedNumbers]);
    }

    public function frequentNumbers()
    {
        $fiveMinutesAgo = Carbon::now()->subMinutes(5);

        $numbers = Number::where('created_at', '>=', $fiveMinutesAgo)
            ->orderBy('created_at', 'desc')
            ->pluck('value')
            ->toArray();

        $numberCounts = collect($numbers)->countBy();

        $frequentNumbers = $numberCounts->filter(function ($count) {
            return $count > 1;
        })->keys()->toArray();

        if (empty($frequentNumbers)) {
            return response()->json($numbers);
        }

        return response()->json($frequentNumbers);
    }

    private function quickSort(array $arr)
    {
        if (count($arr) < 2) {
            return $arr;
        }

        $left = $right = [];
        reset($arr);
        $pivotKey = key($arr);
        $pivot = array_shift($arr);

        foreach ($arr as $k => $v) {
            if ($v < $pivot) {
                $left[$k] = $v;
            } else {
                $right[$k] = $v;
            }
        }

        return array_merge($this->quickSort($left), [$pivotKey => $pivot], $this->quickSort($right));
    }
}
