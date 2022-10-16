# helpinghomes.com.au

An open service to connect those that need emergency housing, with the people who can provide it. 

![Banner](https://github.com/DanielFerguson/helpinghomes.com.au/blob/main/.github/assets/banner.jpg?raw=true)

[![Test & Deploy](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml/badge.svg)](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml)

## ✨ Features

- Ability to register offers of assistance.
- Ability to register offers of livestock accomodation.
- Facebook and Google OAuth support.
- Improved viewing of offers through modal popups (single and multi-offer view).
- Improved privacy with location fuzzing and rate-limiting of contact detail requests.


## 🛣️ Roadmap

- [x] Setup react and typescript
- [x] Setup inertia
- [x] Setup webpack over vite
- [x] Setup default view
- [x] Create deploy script to run tests before deployment.
- [x] Create offer migration.
- [x] Create offer policy.
- [x] Create location model.
- [x] Create location migration.
- [x] Create offer model.
- [x] Create offer database seeder.
- [x] Create offer controller.
- [x] Create base inertiajs-powered map view.
- [x] Change user id to use uuid, rather than autoincrement id.
- [x] Move from location relationship to straight lat, lng.
- [x] Setup laravel socialite.
- [x] Setup laravel socialite google driver.
- [x] Setup laravel socialite facebook driver.
- [x] Setup laravel socialite twitter driver.
- [ ] Setup laravel socialite apple driver.
- [ ] Test logging into each of the drivers.
- [ ] Look into offer clustering.
- [ ] Update offer pins to custom images.
- [ ] Show modal when the user clicks an offer on the map, where the user can 'request details'.
- [ ] Record this click against the users id under a new table called `offer_detail_requests` with `user_id`, `requested_at`, and `offer_id`.
- [ ] Create offer form requests.
- [ ] Fuzz the lat lng of requests on creation, for privacy reasons.
- [ ] Add authenticated state to inertia shared state.
- [ ] Add spatie/x-ray to build pipeline
- [ ] Setup deployment to Forge server.
- [ ] Add appropriate license to project (MIT?).
- [ ] Create /help page.
- [ ] Create /about page.
- [ ] Create observer for offers
- [ ] Create custom 404 page
- [ ] Create custom 500 page
- [ ] Add linting check to CI job through Pint
- [ ] Add static analysis through larastan
- [ ] On offer creation, trigger a job to send the offerer a message after 3 days asking whether their offer has been taken. If it has been, soft delete the offer. If not, delay the job a week to run again.


### 🐛 Known Bugs

- [ ] When you come back to login again once you've registered, it throws a duplicate error because it's trying to create another account rather than validate.
- [ ] When you register with one service (ie. facebook) and then try and login with a different service (ie. Google), it will break.


### ⚗️ Tests to write...

- [ ] User can view offers, but not their details.
- [ ] User needs to be authenticated to view offer details.
- [ ] User needs to be authenticated to create an offer.
- [ ] User cannot create offer without adding contact details and verifying them.
- [ ] User cannot add a phone number that isnt the correct format.
- [ ] User cannot create more than 3 offers at a time.
- [ ] User needs to be authenticated to update one of their offers.
- [ ] User needs to be authenticated to delete one of their offers.
- [ ] User cannot delete someone elses offer.
- [ ] User can logout.
- [ ] User can login.
- [ ] User can navigate to /help page.
- [ ] User can search for locations by postcode.
- [ ] User can search for locations by city name.
- [ ] User can filter locations by state.
- [ ] Can populate the database with static location seeder file.
- [ ] Test relationships between models.
- [ ] When creating an offer, it fuzzes the location slightly.
- [ ] It rate limits the number of offers you can get contact details.
- [ ] When an offer is created, a job is queued to ask the offerer whether it's taken, and is delayed for 3 days.
- [ ] User can login through Facebook.
- [ ] User can login through Apple.
- [ ] User can login through Google.
- [ ] User can login through Twitter.
- [ ] User can login through one provider and then another with a conflicting email and it will append to their account.


## 💻 Technologies

- Laravel
- React w/ TypeScript
- MapBox


## Contributing

- [Dan Ferguson](https://linkedin.com/in/danferg) [🐦](https://twitter.com/thedannyferg) <gday@danferg.com>


### How to contribute

- TODO