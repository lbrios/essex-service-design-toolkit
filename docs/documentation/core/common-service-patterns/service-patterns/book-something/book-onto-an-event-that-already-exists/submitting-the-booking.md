1.  [Home](/docs/core/contents)
2.	[Common service patterns](/docs/documentation/core/common-service-patterns/overview)
3.  [Book something](/docs/documentation/core/common-service-patterns/service-patterns/book-something/overview.md)
4.  [Book onto an event that already exists](/docs/documentation/core/common-service-patterns/service-patterns/book-something/book-onto-an-event-that-already-exists/overview)
5.  Submitting the booking

# Submitting the booking
This phase describes the submission of the booking after details have been checked or reviewed. If payment is required, the user is then prompted to pay for the event. 

Depending on whether or not their payment is successful, they will be notified that they have a place at the event.

## User needs

The user needs are:

* I need to submit the booking to the service
* I need to know that my payment has been received

## User flow

The complexity of this phase depends on:

* whether or not users need to pay for the event
* how many attempts it takes for the user to make a successful payment

If the user has reviewed their personal or booking details and they are correct, they will confirm the event they want to book and move onto payment (if required).

Payment success is based on a number of factors including payment card type, payment system functionality and others.

If the user’s payment hasn’t been successful, they will be asked to reattempt payment. The service should consider explaining what has gone wrong and what the user can do to make their payment successful. 

## Service considerations

Things to consider include:

* if a deposit has been paid or the user chooses to pay at a later date, create a reminder prompting for payment before the event
* how the service will check whether an event or service has been paid for
* how users should prove their booking - through a physical ticket or a ticket shown on a device
* if payment has been unsuccessful, notify the user as soon as possible so that they can fix the issue - give guidance on how to pay and what may have gone wrong

## Tech-enabled considerations

Things to consider include:

* the booking platform calculating discounts for payments for specific groups
* the booking platform integrating with the payment platform
* the paying platform allowing flexible payment options - for example, vouchers, staged payments, Paypal, credit and debit cards
* an efficient and timely ‘handshake’ between the booking and payment platform to provide confirmation to users. When there is a delay in the ‘handshake’, users should be informed immediately
* the booking platform presenting the user with ATP (security measure where user puts in their security code)

## Research considerations

Things to consider include:

* the user making a declaration in order to confirm their booking
* payment methods users prefer to use for this event
* how the user wants to be told about the service receiving their payment
