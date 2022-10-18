<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMobileNumberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'mobile_number' => 'required|string|min:12|max:12',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * Adding random noise to the point to increase privacy.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'mobile_number' => '+61'.substr($this->mobile_number, 1),
        ]);
    }
}
