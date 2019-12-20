1.  [Home](/docs/core/contents)
2.	[Common service patterns](/docs/core/common-service-patterns/overview)
3.  [Book something](/docs/core/common-service-patterns/service-patterns/book-something/overview)
4.  [Book onto an event that already exists](/docs/core/common-service-patterns/service-patterns/book-something/book-onto-an-event-that-already-exists/overview)
5.  Next steps

# Next steps
This phase describes what happens once the user has received a booking confirmation.

## User needs

The user needs are:

* I want to manage my own bookings and account details
* I need to know the status of my booking
* I need to know how to access the event
* I need to know what to bring with me on the day of the event

## User flow

Once the user receives a booking confirmation, the booking system will give them information about any requirements on the day. 

Users who’ve booked as a guest (and did not previously have accounts for booking events) will be asked to save their details and register at this point.

This means they can book events more easily in the future using the same details. 

Depending on how far the event is from the time of booking, there should be a reminder prompting the user to remember to attend the event (or cancel or amend if they wish to do so).

Although the booking element is complete, for the user the end of the service is when attending an event. The service might consider having a feedback form for attendees. 

## Service considerations

Things to consider include:

* if users without an account are aware of the benefits of an account - for example, to book multiple or recurring events
* if there’s a benefit for the service to store personal data
* the preferred method for users to receive notifications, the confirmation and any changes to the booking
* whether the user can amend or cancel the booking and if there’s a cost in doing so
* if users are clear about the refund and cancellation policy
* if users leave knowing what to expect from the event and any conditions for the booking
* if there’s an opportunity for service users to provide feedback after an event

## Data considerations

Consider what data usage exists about how users currently amend or cancel bookings. If this data exists, think about how users are told how to make changes or cancel the booking.

## Tech-enabled considerations

Things to consider include:

* whether notifications can be automated - the booking system needs to know that an event has taken place and automatically send a feedback form after the event
* the booking system making the event unavailable for further bookings after the event has taken place
* a reference number being generated to allow queries or changes and to confirm booking on the day of the event

## Research considerations

Things to consider include:

* the best way to receive notifications and the best number of notifications to receive before the booking
* if users would rather have a registration with the benefits of an account, or enter their details each time
