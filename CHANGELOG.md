# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2022-10-18
### Added
- Added `Created xxx ago.` subtitle to road damage report modals
- Added the ability to report offers.
- Added the ability to report reports.
- Added toast UI feedback on successful reporting.
- Added the ability to fly-to a report and offer.
- Added map icon key to sidebar.

### Changed
- Set laravel to strict mode in local environments.
- Refactored `web` routes to use condensed `apiResources`.

### Fixed
- Fixed call to capacity in offer controller; attribute no longer exists.
- Renamed `PointsOfInterestController` to uniform singular `PointOfInterestController`.

### Removed
- Removed ReportController; implementing on reportable controllers (offer, pois).

## [1.0.0] - 2022-10-17
### Added
- Point of interest model and API.
- Added laravel nova for basic cms capabilities.
- Added custom map pin icons.
- Added dynamic map pin styling for icons.
- Added spatie/x-ray check to ci pipeline.
- Added point of interest pins and danger/warning pins to the map.
- Added deploy step to pipeline.
- Added site favicons.
- Shared authentication state to the frontend.
- Added logout route.
- Added fathom analytics site tracking.
- Added static analysis check to ci pipeline.
- Added linting check to ci pipeline.
- Added license to project.
- Added point clustering.
- Added ability to create an offer of accomodation.
- Added slight location fuzzing to increase privacy of offers of accomodation.
- Added a resource controller and form requests for point of interests.
- Added ability to create a hazard report.
- Added list of offers.
- Added list of reports.
- Added soft deletes to offers and point of interests.
- Registered policies for offers and point of interests.
- Added ability to edit offer.
- Added ability to delete offer.
- Added ability to delete report.
- Added the ability to report offers or point of interest(s).
- Added basic SEO meta tags.

### Changed
- Implemented logic for the StoreOfferFormRequest.
- Updated map icon images to have small border.
- Updated POIs to have optional user_id for reports.
- Fixed icon matching for offers.

### Removed
- Removed js and css from public git history, added to gitignore.
- Removed `duration` column from offers.
- Removed list of completed items from `README`.
- Removed apple laravel socialite drivers.

## [1.0.0] - 2022-10-16
### Added
- Initial laravel application.
- Installed inertiajs with react.
- Setup react-map-gl and mapbox.
- Created basic default view with sidebar.
- Added basic ci pipeline to run tests on main branch.
- Created model, migration for locations, offers.
- Created policy for offers.
- Added contact detail fields to users.
- Added laravel/socialite authentication package.
- Added socialite setups for...
    - Github (auth testing)
    - Twitter
    - Google
    - Facebook

### Changed
- Moved back to webpack (vite was being tricky)
- Setup react 18 necessities