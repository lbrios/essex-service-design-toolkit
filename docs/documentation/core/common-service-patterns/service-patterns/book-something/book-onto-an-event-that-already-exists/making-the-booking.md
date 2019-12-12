1.  [Home](/docs/core/contents)
2.	[Common service patterns](/docs/core/common-service-patterns/overview)
3.  [Book something](/docs/core/common-service-patterns/service-patterns/book-something/overview.md)
4.  [Book onto an event that already exists](/docs/core/common-service-patterns/service-patterns/book-something/book-onto-an-event-that-already-exists/overview)
4.  Making a booking

# Making a booking
The user has decided to book. They can sign into an existing account or sign in as a guest to book.

If there’s no account to pull personal information from, the user will need to input and then confirm personal information and booking details. 

## User needs

The user needs are:

* I need to know why my personal information is needed
* I want to book recurring events, or multiple unlinked events in one session

## User flow

The user opens the booking platform. 

Users who book regularly can [sign into their account](/docs/core/common-service-patterns/service-patterns/register-something/overview). Their personal data is stored and retrieved in this booking process. The user will only need to enter any extra details about their booking and then confirm the information before going onto the next stage. 

If users don’t have an account, then they can sign in as a guest. They can input their personal details, additional booking details and confirm the information before going onto the next stage.

If details are incorrect at the confirmation stage, allow the user to go back and edit the information.  

## Service considerations

Things to consider with the booking account include making sure:

* the user’s personal information can be easily retrieved and confirmed if users already have an account with the booking platform
* users can complete their booking as a guest if they don’t have an account, so as not to disrupt their journey. They should be given an option to register an account at the end of booking
* the user understands why we’re asking for personal information
* users can easily identify where they are in the booking journey
* users can make multiple or recurring bookings at this stage
* user’s can book on behalf of others -  think about if they need to provide any details about the other person

## Data considerations

Find out how popular previous sessions or services have been and whether it needs a waiting list to meet demand.

## Tech-enabled considerations

Things to consider include:

* if user details are stored on another database, pull the data to minimise data entry
* allowing users to edit their personal information when they sign in – think about whether to do this at the point of signing into an account, rather than at the end of the booking session
* allowing users to save changes to their account
* using waiting lists if there’s no availability for an event
* the booking platform having a consistent experience with the previous pages that the user has come from
* allowing the user to make group bookings
* the system being flexible enough to handle large volumes of traffic in periods of high demands - bookings could be made for a limited period or users could be put in a queue
* how the booking platform meets accessibility standards

## Research considerations

Consider whether users are booking through a means tested route, think about the best way to prove their identity without creating a longer journey.
