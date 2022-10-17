# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

### Removed
- Removed js and css from public git history, added to gitignore.

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