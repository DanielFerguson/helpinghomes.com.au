# helpinghomes.com.au

An open service to connect those that need emergency housing, with the people who can provide it. 


## Features

- Ability to register offers of assistance.
- Ability to register offers of livestock accomodation.
- Facebook and Google OAuth support.
- Improved viewing of offers through modal popups (single and multi-offer view).
- Improved privacy with location fuzzing and rate-limiting of contact detail requests.


### Improvements over v2

- TODO


## Roadmap

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
- [ ] Change user id to use uuid, rather than autoincrement id.
- [ ] Move from location relationship to straight lat, lng.
- [ ] Fuzz the lat lng of requests on creation, for privacy reasons.
- [ ] Create offer form requests.
- [ ] Setup laravel socialite with google, facebook and email providers.
- [ ] Add authenticated state to inertia shared state.
- [ ] Add spatie/x-ray to build pipeline
- [ ] Setup deployment to Forge server.
- [ ] Create /help page.
- [ ] Create /about page.
- [ ] Add appropriate license to project.

### Tests to write...

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
- [ ] Can populate the database with static location seeder file
- [ ] Test relationships between models
- [ ] When creating an offer, it fuzzes the location slightly
- [ ] It rate limits the number of offers you can get contact details

## Technologies

- Laravel
- React w/ TypeScript
- MapBox


## Contributing

- [Dan Ferguson](https://linkedin.com/in/danferg) [🐦](https://twitter.com/thedannyferg) <gday@danferg.com>

### How to contribute

- TODO