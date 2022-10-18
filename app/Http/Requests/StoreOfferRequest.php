<?php

namespace App\Http\Requests;

use App\Models\Offer;
use Illuminate\Foundation\Http\FormRequest;

class StoreOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create', Offer::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id' => 'required|uuid',
            'type' => 'required|in:HOUSING,TRANSPORT_ASSISTANCE',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'canTakePets' => 'required|boolean',
            'canTakeSingles' => 'required|boolean',
            'canTakeCouples' => 'required|boolean',
            'canTakeFamilies' => 'required|boolean',
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
            'lat' => $this->lat + (0.00001 * rand(0, 30)),
            'lng' => $this->lng + (0.00001 * rand(0, 30)),
            'canTakePets' => $this->canTakePets === 'true' ? true : false,
        ]);
    }
}
