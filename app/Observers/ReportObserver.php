<?php

namespace App\Observers;

use App\Mail\ReportableNeedsAttention;
use App\Models\Report;
use Illuminate\Support\Facades\Mail;

class ReportObserver
{
    /**
     * Handle the Report "created" event.
     *
     * @param  \App\Models\Report  $report
     * @return void
     */
    public function created(Report $report): void
    {
        // If the reported model has more than 1 report, notify Dan Ferguson
        if (count($report->reportable->reports) > 1) {
            Mail::to('gday@danferg.com')->send(new ReportableNeedsAttention($report));
        }
    }
}
