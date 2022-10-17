# helpinghomes.com.au

An open service to connect those that need emergency housing, with the people who can provide it. 

![Banner](https://github.com/DanielFerguson/helpinghomes.com.au/blob/main/.github/assets/banner.jpg?raw=true)

[![Test & Deploy](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml/badge.svg)](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml)

## ✨ Features

- Quickly find relief centers near you.
- Ability to register offers of assistance.
- Ability to register offers of livestock accomodation.
- Facebook and Google OAuth support.
- Improved viewing of offers through modal popups (single and multi-offer view).
- Improved privacy with location fuzzing and rate-limiting of contact detail requests.
- Navigate to a point of interest option when clicked on one w/ Google Maps.
- Add road repairs needed POI.


## Questions

- How can we outline places of danger, evacuations, etc?
- How can we allow businesses to add support offers as well? Another page of business offers, with a map of locations so users can get relevant offers? It would be cool if we could scrape branding details (logo/favicon/color) from a businesses website.
- How can we allow users to report offers, and how do we mediate those?


## 🛣️ Roadmap

- [ ] Show modal when the user clicks an offer on the map, where the user can 'request details'.
- [ ] Record this click against the users id under a new table called `offer_detail_requests` with `user_id`, `requested_at`, and `offer_id`.
- [ ] Add ability to report an offer or report.
- [ ] If an offer gets a report, send Dan Ferguson an email.
- [ ] If a hazard gets more than 2 reports, send Dan Ferguson an email.

- [ ] Add key/legend to the map to toggle layers.
- [ ] Setup laravel socialite drivers for production site URLs.
- [ ] Test logging into each of the drivers.
- [ ] Create /help page.
- [ ] Create /about page.
- [ ] Setup fathom events tracking
- [ ] Add site SEO tags
- [ ] Create custom 404 page
- [ ] Create custom 500 page
- [ ] If a user requests an offers details and clicks the call button, queue up a job to message the offerer 10 minutes later asking whether the offer has been taken and if we should remove the offer.
- [ ] Add ability to 'fly-to' when select map icon next to offer or report.

### 🐛 Known Bugs

- [ ] When deleting resources, it comes back with a weird error...
- [ ] User can create more than 3 offers at a time.
- [ ] When you create an offer of accomodation, you need to select at least one type
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
- [ ] Add tests for creating, editing, updating and deleting offers
- [ ] Add tests for creating, editing, updating and deleting points of interest


## 💻 Technologies

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/) w/ [TypeScript](https://www.typescriptlang.org/) and [webpack](https://webpack.js.org/)
- [Mapbox](https://www.mapbox.com/) through [React Map GL](https://visgl.github.io/react-map-gl/)


## Contributing

### Contributors

- [Dan Ferguson](https://linkedin.com/in/danferg) [🐦](https://twitter.com/thedannyferg) <gday@danferg.com>


### How to contribute

- TODO