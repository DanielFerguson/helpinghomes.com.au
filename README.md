# helpinghomes.com.au

An open service to connect those that need emergency housing, with the people who can provide it. 

![Banner](https://github.com/DanielFerguson/helpinghomes.com.au/blob/main/.github/assets/banner.jpg?raw=true)

[![Test & Deploy](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml/badge.svg)](https://github.com/DanielFerguson/helpinghomes.com.au/actions/workflows/run-tests.yml)

## ✨ Features

- Quickly find relief centers near you.
- Ability to register offers of assistance.
- Ability to register offers of livestock accommodation.
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

- [ ] ✨ Ability to create alternative offer types (livestock transport, livestock housing).
- [ ] 🐛 If a user requests tries to verify a pin, leaves the site and then comes back, there's no way for them to request a new code.

### Future Items
- [ ] ✨ Setup fathom events tracking
- [ ] ✨ Create /help page.
- [ ] ✨ Add more information about Helping Homes to the LHS section.
- [ ] ✨ If a user requests an offers details and clicks the call button, queue up a job to message the offerer 10 minutes later asking whether the offer has been taken and if we should remove the offer.
- [ ] ✨ Add optional notes section to accommodation offer.
- [ ] ♻️ Refactor modals to reduce copied code - wrap content in a reusable modal container component.
- [ ] ✨ If you click on a map key item, it will toggle it's visibility on the map.
- [ ] ✨ Add ability to edit/update the user profile (specifically mobile_number).
- [ ] ✨ Create private conversation option for offers through [Vonage](https://developer.vonage.com/use-cases/private-sms-communication#in-this-tutorial).

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