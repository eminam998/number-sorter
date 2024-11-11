<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NumberRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // You can set this to false if you need authorization logic
    }

    public function rules()
    {
        return [
            'numbers' => 'required|array|min:10|max:10', // Expecting exactly 10 numbers
            'numbers.*' => 'numeric',  // Each number must be numeric
            'filterSymbol' => 'nullable|string|in:<,>,=',  // Optional filter symbol
            'filterValue' => 'nullable|numeric',  // Optional filter value must be a number
        ];
    }

    public function messages()
    {
        return [
            'numbers.required' => 'Numbers are required.',
            'numbers.array' => 'Numbers must be an array.',
            'numbers.*.numeric' => 'Each number must be numeric.',
            'filterSymbol.in' => 'Invalid filter symbol. Use <, >, or =.',
            'filterValue.numeric' => 'Filter value must be numeric.',
        ];
    }
}
