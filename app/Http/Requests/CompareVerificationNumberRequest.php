<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompareVerificationNumberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // TODO:
        // Check...
        // - if the user hasn't verified their contact number
        // - if the user verify code isn't older than 5 minutes
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'verification_code' => 'required|string|min:4|max:4',
        ];
    }
}
